/**
 * Native companion view for Expo Go (iOS / Android).
 * React Native components here; Material UI lives in AppPlatform.web.tsx.
 * The web implementation is the primary deliverable.
 */
import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Pressable, Image, TextInput, Linking, Alert, StyleSheet, StatusBar } from 'react-native';
import { BUSINESS, MENU, CATERING, money, Page, MenuCategory } from './data';
const blue='#0069C9',navy='#092C52',cream='#FCF9F2',muted='#617181';
const photos: Record<string,any>={
 'street-tacos.jpg':require('../assets/street-tacos.jpg'),
 'taco-station.jpg':require('../assets/taco-station.jpg'),
 'quesadilla.jpg':require('../assets/quesadilla.jpg'),
 'burrito.jpg':require('../assets/burrito.jpg'),
 'nachos.jpg':require('../assets/nachos.jpg'),
 'enchiladas.jpg':require('../assets/enchiladas.jpg'),
 'bowl.jpg':require('../assets/bowl.jpg'),
 'jalapenos.jpg':require('../assets/jalapenos.jpg'),
 'guacamole.jpg':require('../assets/guacamole.jpg'),
 'queso.jpg':require('../assets/queso.jpg'),
 'flautas.jpg':require('../assets/flautas.jpg'),
 'taco-bar.jpg':require('../assets/taco-bar.jpg'),
 'pollo-poblano.jpg':require('../assets/pollo-poblano.jpg'),
 'chicken-mole.jpg':require('../assets/chicken-mole.jpg'),
 'chicken-alfredo.jpg':require('../assets/chicken-alfredo.jpg'),
 'flan.jpg':require('../assets/flan.jpg'),
 'sopapillas.jpg':require('../assets/sopapillas.jpg'),
 'torta.jpg':require('../assets/torta.jpg'),
 'crispy-tacos.jpg':require('../assets/crispy-tacos.jpg'),
 'chimichanga.jpg':require('../assets/chimichanga.jpg'),
 'sopes.jpg':require('../assets/sopes.jpg'),
 'aguas-frescas.jpg':require('../assets/aguas-frescas.jpg'),
 'huevos-chorizo.jpg':require('../assets/huevos-chorizo.jpg'),
 'huevos-rancheros.jpg':require('../assets/huevos-rancheros.jpg'),
 'hero-tacos.jpg':require('../assets/hero-tacos.jpg'),
};
const routes:[Page,string][]=[['home','Home'],['menu','Menu'],['catering','Catering'],['rewards','Rewards'],['locations','Location'],['about','About']];
function Pill({text,onPress,active=false}:{text:string;onPress:()=>void;active?:boolean}) {return <Pressable onPress={onPress} style={[s.pill,active&&{backgroundColor:blue,borderColor:blue}]}><Text style={[s.pillText,active&&{color:'#fff'}]}>{text}</Text></Pressable>}
function PrimaryButton({title,onPress}:{title:string;onPress:()=>void}) {return <Pressable onPress={onPress} style={s.button}><Text style={s.buttonText}>{title}</Text></Pressable>}
export default function NativeApp(){
 const [page,setPage]=useState<Page>('home');
 const [filter,setFilter]=useState<'All'|MenuCategory>('All');
 const [search,setSearch]=useState('');
 const [bag,setBag]=useState<Record<string,number>>({});
 const [guests,setGuests]=useState('30');
 const [selected,setSelected]=useState(CATERING[0].id);
 const quantity=Object.values(bag).reduce((a,b)=>a+b,0);
 const pack=CATERING.find(p=>p.id===selected)!;
 const matching=useMemo(()=>MENU.filter(i=>(filter==='All'||filter===i.category)&&i.name.toLowerCase().includes(search.toLowerCase())),[filter,search]);
 const goto=(p:Page)=>{setPage(p)};
 const add=(id:string)=>setBag(b=>({...b,[id]:(b[id]||0)+1}));
 const openBag=()=>{const entries=Object.entries(bag).filter(([,n])=>n>0);const total=entries.reduce((n,[id,qty])=>n+(MENU.find(i=>i.id===id)?.price||0)*qty,0);Alert.alert(`Demo bag · ${quantity} items`,entries.map(([id,qty])=>`${qty} × ${MENU.find(i=>i.id===id)?.name}`).join('\n')+`\n\nSubtotal: ${money(total)}\n\nNo purchase is sent.`,[{text:'Clear',onPress:()=>setBag({})},{text:'Close'}])};
 return <SafeAreaView style={s.root}><StatusBar barStyle="dark-content"/><View style={s.status}><Text style={s.statusText}>ARLINGTON OPENING SOON · CATERING AVAILABLE</Text></View>
 <View style={s.header}><Pressable onPress={()=>goto('home')}><Image source={require('../assets/mateos-wordmark.png')} resizeMode="contain" style={{width:154,height:61}}/></Pressable><Pressable onPress={openBag} style={s.bag}><Text style={s.bagText}>Bag ({quantity})</Text></Pressable></View>
 <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.tabs} contentContainerStyle={{paddingHorizontal:14,alignItems:'center',gap:7}}>{routes.map(([id,label])=><Pill key={id} text={label} active={page===id} onPress={()=>goto(id)}/>)}</ScrollView>
 <ScrollView style={{flex:1}} contentContainerStyle={{paddingBottom:65}}>
 {page==='home'&&<><View style={s.hero}><Text style={s.kicker}>A LITTLE TASTE OF HOME</Text><Text style={s.h1}>HECHO EN CASA,{'\n'}HECHO CON ORGULLO</Text><Text style={s.description}>Authentic Mexican food, prepared with quality ingredients, family recipes and a whole lot of love.</Text><PrimaryButton title="Explore our menu →" onPress={()=>goto('menu')}/></View><Image source={photos['hero-tacos.jpg']} style={s.heroImg}/><View style={s.section}><Text style={s.sectionTitle}>POPULAR PICKS</Text>{MENU.filter(i=>['street-tacos','quesadilla','burrito','jalapenos'].includes(i.id)).map(i=><View key={i.id} style={s.menuRow}><Image source={photos[i.photo]} style={s.rowPhoto}/><View style={{flex:1}}><Text style={s.itemTitle}>{i.name}</Text><Text style={s.sub}>{i.description}</Text><Text style={s.price}>{money(i.price)}</Text></View><Pressable onPress={()=>add(i.id)} style={s.plus}><Text style={{color:blue,fontSize:25}}>+</Text></Pressable></View>)}</View></>}
 {page==='menu'&&<View style={s.section}><Text style={s.kicker}>MADE FRESH WITH LOVE</Text><Text style={s.h1}>OUR MENU</Text><TextInput value={search} onChangeText={setSearch} placeholder="Search the menu..." style={s.input}/><ScrollView horizontal contentContainerStyle={{gap:8,paddingVertical:10}} showsHorizontalScrollIndicator={false}>{(['All','Tacos','Favorites','Appetizers','Breakfast','Drinks','Desserts'] as const).map(f=><Pill key={f} text={f} active={filter===f} onPress={()=>setFilter(f)}/>)}</ScrollView>{matching.map(i=><View key={i.id} style={s.menuRow}><Image source={photos[i.photo]} style={s.rowPhoto}/><View style={{flex:1}}><Text style={s.itemTitle}>{i.name}</Text><Text style={s.sub}>{i.description}</Text><Text style={s.price}>{money(i.price)}</Text></View><Pressable onPress={()=>add(i.id)} style={s.plus}><Text style={{color:blue,fontSize:25}}>+</Text></Pressable></View>)}<Text style={s.note}>Sample prices from owner-supplied design references. No live online orders.</Text></View>}
 {page==='catering'&&<View style={s.section}><Text style={s.kicker}>BIG FLAVOR FOR EVERY GATHERING</Text><Text style={s.h1}>CATERING</Text><Text style={s.description}>Make your next celebration something delicious.</Text>{CATERING.map(p=><Pressable key={p.id} onPress={()=>setSelected(p.id)} style={[s.pack,selected===p.id&&{borderColor:blue,borderWidth:2}]}><Image source={photos[p.photo]} style={s.packPhoto}/><Text style={s.itemTitle}>{p.name}</Text><Text style={s.sub}>{p.description}</Text><Text style={s.price}>{money(p.price)} / person</Text><Text style={[s.sub,{color:blue,marginTop:8}]}>{selected===p.id?'✓ Selected':'Tap to select'}</Text></Pressable>)}<View style={s.quote}><Text style={s.sectionTitle}>QUICK ESTIMATE</Text><Text style={s.itemTitle}>{pack.name}</Text><Text style={s.sub}>Number of guests</Text><TextInput value={guests} onChangeText={setGuests} keyboardType="numeric" style={s.input}/><Text style={s.h1}>{money(pack.price*(Math.max(1,Number(guests)||1)))}</Text><PrimaryButton title="Text catering request" onPress={()=>{const body=`Hi Mateo's! I'd like catering for ${guests} guests: ${pack.name}. Estimate ${money(pack.price*(Number(guests)||1))}. Please provide availability and final pricing.`;Linking.openURL('sms:'+BUSINESS.phone+'?body='+encodeURIComponent(body))}}/><Text style={s.note}>Estimate only, not a confirmed booking.</Text></View></View>}
 {page==='rewards'&&<View style={s.section}><Text style={s.kicker}>GOOD THINGS ARE COMING</Text><Text style={s.h1}>MATEO'S REWARDS</Text><Image source={photos['hero-tacos.jpg']} style={s.heroImg}/><Text style={s.description}>Special offers and loyalty experiences are a visual preview. No accounts are live.</Text><PrimaryButton title="Explore the menu" onPress={()=>goto('menu')}/></View>}
 {page==='locations'&&<View style={s.section}><Text style={s.kicker}>COMING SOON TO ARLINGTON</Text><Text style={s.h1}>FIND MATEO'S</Text><Text style={s.description}>{BUSINESS.address}</Text><Text style={[s.description,{marginBottom:20}]}>Catering is available. Opening hours have not been announced.</Text><PrimaryButton title="Get directions" onPress={()=>Linking.openURL(BUSINESS.maps)}/><Pressable onPress={()=>Linking.openURL('tel:'+BUSINESS.phone)}><Text style={[s.price,{marginTop:22}]}>Catering contact: (214) 799-7852</Text></Pressable></View>}
 {page==='about'&&<View style={s.section}><Text style={s.kicker}>HOLA, FROM OUR FAMILY</Text><Text style={s.h1}>THIS IS MATEO'S</Text><Image source={photos['hero-tacos.jpg']} style={s.heroImg}/><Text style={s.description}>Our taqueria concept celebrates fresh ingredients, homemade recipes and Mexican flavors worth sharing.</Text><Text style={s.description}>“The food was fresh, delicious, and a huge hit with all of our guests.” — Heidi, customer review, May 2026.</Text><PrimaryButton title="Explore catering" onPress={()=>goto('catering')}/></View>}
 </ScrollView>
 <View style={s.bottom}>{([['home','Home'],['menu','Menu'],['catering','Catering'],['locations','More']] as [Page,string][]).map(([p,t])=><Pressable key={p} onPress={()=>goto(p)} style={{flex:1,alignItems:'center',paddingVertical:12}}><Text style={{fontSize:12,fontWeight:'800',color:page===p?blue:muted}}>{t}</Text></Pressable>)}</View>
 </SafeAreaView>;
}
const s=StyleSheet.create({
 root:{flex:1,backgroundColor:'#fffefa'},status:{backgroundColor:navy,alignItems:'center',padding:6},statusText:{color:'#fff',fontWeight:'800',letterSpacing:1,fontSize:10},header:{height:76,flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:18,borderBottomWidth:1,borderBottomColor:'#eee'},bag:{padding:10,borderWidth:1,borderColor:'#d8e4e8',borderRadius:30},bagText:{fontSize:12,fontWeight:'800',color:navy},tabs:{flexGrow:0,maxHeight:57,borderBottomColor:'#eee',borderBottomWidth:1},pill:{borderWidth:1,borderColor:'#dfebef',backgroundColor:'#fff',borderRadius:30,paddingHorizontal:15,paddingVertical:9},pillText:{fontSize:12,fontWeight:'800',color:navy},section:{padding:20},hero:{padding:25,backgroundColor:cream},kicker:{fontWeight:'800',fontSize:11,letterSpacing:2,color:blue,marginBottom:12},h1:{fontSize:37,fontWeight:'900',lineHeight:43,color:navy,letterSpacing:-1,marginBottom:14},description:{fontSize:15,color:muted,lineHeight:25,marginBottom:23},button:{backgroundColor:blue,padding:16,borderRadius:40,alignItems:'center',alignSelf:'flex-start',minWidth:178},buttonText:{color:'#fff',fontWeight:'800',fontSize:14},heroImg:{height:235,width:'100%',resizeMode:'cover'},sectionTitle:{fontSize:28,fontWeight:'900',color:navy,marginBottom:20},menuRow:{borderBottomWidth:1,borderBottomColor:'#e6e9ed',paddingVertical:14,flexDirection:'row',alignItems:'center',gap:13},rowPhoto:{width:100,height:100,borderRadius:14},itemTitle:{fontWeight:'800',fontSize:16,color:navy,marginBottom:5},sub:{fontSize:11.7,lineHeight:17,color:muted},price:{fontSize:17,color:blue,fontWeight:'900',marginTop:7},plus:{width:35,height:35,borderRadius:40,alignItems:'center',justifyContent:'center',backgroundColor:'#f2f8fc'},input:{borderWidth:1,borderColor:'#cedcde',padding:13,borderRadius:12,backgroundColor:'#fff',marginVertical:8},note:{fontSize:12,color:muted,marginVertical:14},pack:{borderWidth:1,borderColor:'#e3e6e9',borderRadius:18,padding:14,marginVertical:12,overflow:'hidden'},packPhoto:{width:'100%',height:170,borderRadius:12,marginBottom:14},quote:{padding:20,backgroundColor:cream,borderRadius:17,marginTop:25},bottom:{flexDirection:'row',backgroundColor:'#fff',borderTopWidth:1,borderTopColor:'#e2e7eb'}
});
