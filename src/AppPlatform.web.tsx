import React, { useEffect, useMemo, useState } from 'react';
import {
  ThemeProvider, CssBaseline, AppBar, Toolbar, Box, Container, Stack, Typography, Button,
  IconButton, Badge, Drawer, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Card, CardContent, Chip, Grid, Paper, Divider, Snackbar, Alert, InputAdornment,
  BottomNavigation, BottomNavigationAction, List, ListItemButton, ListItemText, Tooltip,
  Select, MenuItem as MuiMenuItem, FormControl, InputLabel, useMediaQuery
} from '@mui/material';
import {
  ShoppingBagOutlined, MenuRounded, CloseRounded, SearchRounded, AddRounded, RemoveRounded,
  HomeOutlined, RestaurantMenuOutlined, CardGiftcardOutlined, MoreHorizRounded,
  LocationOnOutlined, ArrowForwardRounded, ArrowBackRounded, EcoOutlined, FavoriteBorderRounded,
  HouseOutlined, LocalOfferOutlined, GroupsOutlined, LocalDiningOutlined, PhoneOutlined,
  ContentCopyOutlined, CalendarMonthOutlined, CheckCircleOutlineRounded, InfoOutlined,
  AccessTimeRounded, StarBorderRounded, DeleteOutlineRounded, MapOutlined,
  ChevronRightRounded, LocalFloristOutlined, CheckRounded
} from '@mui/icons-material';
import { BUSINESS, CATERING, MENU, MenuItem, MenuCategory, Page, money, imageUrl } from './data';
import { theme, palette } from './theme';
import './site.css';

type CartLine = { id: string; quantity: number };
const pages:Page[] = ['home','menu','catering','rewards','locations','about'];
const pageTitle:Record<Page,string> = {home:'Home',menu:'Menu',catering:'Catering',rewards:'Rewards',locations:'Location',about:'Our story'};
const categories:('All'|MenuCategory)[] = ['All','Tacos','Favorites','Appetizers','Breakfast','Drinks','Desserts'];
const sectionH = {fontFamily:'"Barlow Condensed", Impact, sans-serif', fontWeight:800, letterSpacing:'.02em', color:palette.navy};
const roundedImage = {width:'100%',height:'100%',objectFit:'cover' as const};
const phoneFormatted = '(214) 799-7852';
const image = (name:string) => imageUrl(name);
function Brand({onClick,small=false}:{onClick:()=>void,small?:boolean}) {
  return <Box component="button" onClick={onClick} aria-label="Mateo's Taqueria home" sx={{border:0,background:'none',padding:0,cursor:'pointer',display:'flex',alignItems:'center'}}>
    <Box component="img" src={image('mateos-wordmark.png')} alt="Mateo’s Taqueria" sx={{width:small?133:186,height:'auto',display:'block'}}/>
  </Box>;
}
function ScrollToTop() { useEffect(()=>window.scrollTo(0,0),[]); return null; }
function Preheader({go}:{go:(p:Page)=>void}) {
  return <Box className="preheader"><Container maxWidth="lg"><Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
    <LocalFloristOutlined sx={{fontSize:16,color:'#8ca57c'}}/>
    <Typography sx={{fontSize:{xs:10.5,sm:12},fontWeight:650,letterSpacing:'.025em'}}>Arlington, we're coming soon. <Box component="span" sx={{color:'#8ecaf7'}}>Catering is available now.</Box></Typography>
    <Box component="button" onClick={()=>go('catering')} className="status-link">Explore catering <ChevronRightRounded sx={{fontSize:15}}/></Box>
  </Stack></Container></Box>;
}
function DecoLine(){return <Box className="deco-line" aria-hidden="true"><span/><b>✣</b><span/></Box>}
function FoodCard({item,add,showDetail}:{item:MenuItem;add:(id:string)=>void;showDetail:(item:MenuItem)=>void}) {
  return <Card className="food-card">
    <Box className="food-media" onClick={()=>showDetail(item)} role="button" tabIndex={0} onKeyDown={e=>e.key==='Enter'&&showDetail(item)}>
      <Box component="img" loading="lazy" src={image(item.photo)} alt={item.name} sx={roundedImage}/>
      {item.badge&&<Chip label={item.badge} size="small" className="product-badge"/>}
      <Tooltip title={`Add ${item.name} to demo bag`}><IconButton className="add-food" onClick={e=>{e.stopPropagation();add(item.id)}} aria-label={`Add ${item.name}`}><AddRounded fontSize="small"/></IconButton></Tooltip>
    </Box>
    <CardContent sx={{p:'16px 17px 18px !important'}}>
      <Typography variant="subtitle1" onClick={()=>showDetail(item)} sx={{fontSize:17,fontWeight:850,lineHeight:1.2,cursor:'pointer',mb:.65}}>{item.name}</Typography>
      <Typography color="text.secondary" sx={{fontSize:12.8,lineHeight:1.55,mb:1,minHeight:40}}>{item.description}</Typography>
      <Typography sx={{fontSize:19,color:palette.royal,fontWeight:850}}>{money(item.price)}</Typography>
    </CardContent>
  </Card>;
}
function Heading({kicker,title,action}:{kicker?:string;title:string;action?:React.ReactNode}) {
  return <Stack direction="row" justifyContent="space-between" alignItems="flex-end" spacing={1} sx={{mb:3}}><Box>
    {kicker&&<Typography className="kicker" sx={{mb:.8}}>{kicker}</Typography>}
    <Typography variant="h3" sx={{...sectionH,fontSize:{xs:33,md:42},lineHeight:1.06}}>{title}</Typography>
    <DecoLine/>
  </Box>{action}</Stack>;
}
function Hero({go}:{go:(p:Page)=>void}){
  return <Box className="hero-bg"><Container maxWidth="lg" sx={{position:'relative',zIndex:1}}>
    <Box className="hero-layout"><Box className="hero-copy">
      <Box className="eyebrow"><span className="eyebrow-dot"/> A LITTLE TASTE OF HOME</Box>
      <Typography component="h1" className="hero-title">HECHO EN CASA,<br/>HECHO CON <Box component="span" sx={{color:palette.royal}}>ORGULLO</Box></Typography>
      <DecoLine/>
      <Typography className="hero-description">Authentic Mexican food, prepared fresh with quality ingredients, traditional recipes, and a whole lot of love.</Typography>
      <Stack direction={{xs:'column',sm:'row'}} spacing={1.5} sx={{maxWidth:{xs:300,sm:'none'},mt:3.5}}>
        <Button variant="contained" size="large" endIcon={<ArrowForwardRounded/>} onClick={()=>go('menu')}>Explore our menu</Button>
        <Button variant="outlined" size="large" onClick={()=>go('catering')}>Catering options</Button>
      </Stack>
      <Stack direction="row" spacing={1.4} alignItems="center" sx={{mt:4,color:'#5f7962'}}><CheckCircleOutlineRounded sx={{fontSize:17}}/><Typography fontSize={12.5} fontWeight={700}>Family recipes · Made with love · Fresh ingredients</Typography></Stack>
    </Box><Box className="hero-visual">
      <Box component="img" src={image('hero-tacos.jpg')} alt="Freshly prepared Mexican street tacos with lime and cilantro"/>
      <Box className="hero-floating"><LocalFloristOutlined sx={{color:'#658558'}}/><Box><Typography fontWeight={850} fontSize={13}>Made from the heart</Typography><Typography color="text.secondary" fontSize={11}>Mexican flavor, family tradition</Typography></Box></Box>
    </Box></Box>
  </Container></Box>;
}
const benefits = [
  {icon:<EcoOutlined/>,title:'FRESH INGREDIENTS',text:'Quality ingredients prepared with care every day.'},
  {icon:<HouseOutlined/>,title:'MADE IN HOUSE',text:'Family recipes and homestyle Mexican cooking.'},
  {icon:<FavoriteBorderRounded/>,title:'MADE WITH LOVE',text:'Great food is even better when shared.'},
  {icon:<LocalFloristOutlined/>,title:'MEXICAN ROOTS',text:'Bold, authentic flavors inspired by tradition.'},
];
function Benefits(){return <Box className="benefits"><Container maxWidth="lg"><Grid container>
  {benefits.map(b=><Grid key={b.title} size={{xs:6,md:3}}><Box className="benefit"><Box className="benefit-icon">{b.icon}</Box><Typography fontWeight={850} sx={{fontSize:{xs:11,sm:13}}}>{b.title}</Typography><Typography color="text.secondary" sx={{fontSize:{xs:11,sm:12.7},maxWidth:190,mx:'auto',mt:.6}}>{b.text}</Typography></Box></Grid>)}
</Grid></Container></Box>}
function RewardBanner({go}:{go:(p:Page)=>void}) {
 return <Box className="rewards-banner"><Box className="rewards-banner-content">
   <Typography className="script-title">A little more to love.</Typography>
   <Typography fontWeight={750} fontSize={{xs:13,md:15}} sx={{maxWidth:415,mb:2}}>Your next favorite bite is around the corner. Explore what’s coming to Mateo’s.</Typography>
   <Button variant="contained" onClick={()=>go('rewards')} size="small">Explore rewards <ArrowForwardRounded sx={{ml:1,fontSize:16}}/></Button>
 </Box></Box>;
}
function QuickLinks({go}:{go:(p:Page)=>void}) {
 const links=[{icon:<ShoppingBagOutlined/>,title:'ORDER AHEAD',desc:'Browse your favorites and build a demo order.',cta:'Browse menu',page:'menu' as Page},
 {icon:<LocationOnOutlined/>,title:'FIND US',desc:'Get directions to our Arlington location.',cta:'Get directions',page:'locations' as Page},
 {icon:<LocalOfferOutlined/>,title:'WHAT’S NEW',desc:'Discover upcoming specials and rewards.',cta:'See updates',page:'rewards' as Page},
 {icon:<GroupsOutlined/>,title:'CATERING',desc:'Good food makes every gathering better.',cta:'Explore packages',page:'catering' as Page}];
 return <Box className="quick-links"><Grid container>{links.map(l=><Grid size={{xs:6,md:3}} key={l.title}><Box className="quick-link"><Box className="benefit-icon">{l.icon}</Box><Typography fontWeight={850} fontSize={13}>{l.title}</Typography><Typography color="text.secondary" fontSize={12.1} sx={{maxWidth:170,mx:'auto',mt:.7,mb:1.25}}>{l.desc}</Typography><Button size="small" onClick={()=>go(l.page)} endIcon={<ChevronRightRounded/>} sx={{fontSize:11.5,p:0}}>{l.cta}</Button></Box></Grid>)}</Grid></Box>;
}
function HomePage({go,add,detail}:{go:(p:Page)=>void;add:(id:string)=>void;detail:(i:MenuItem)=>void}) {
 const popular=['street-tacos','quesadilla','burrito','jalapenos'].map(id=>MENU.find(i=>i.id===id)!);
 return <><Hero go={go}/><Benefits/><Container maxWidth="lg" sx={{py:{xs:5,md:8}}}>
   <Heading kicker="THE GOOD STUFF" title="POPULAR PICKS" action={<Button onClick={()=>go('menu')} endIcon={<ArrowForwardRounded/>} sx={{fontWeight:850,fontSize:{xs:11,sm:13}}}>Full menu</Button>}/>
   <Grid container spacing={{xs:1.5,md:2.5}}>{popular.map(i=><Grid size={{xs:6,sm:6,md:3}} key={i.id}><FoodCard item={i} add={add} showDetail={detail}/></Grid>)}</Grid>
   <Box sx={{mt:{xs:5,md:7}}}><RewardBanner go={go}/></Box><QuickLinks go={go}/>
 </Container><Box className="story-strip"><Container maxWidth="lg"><Stack direction={{xs:'column',sm:'row'}} spacing={2} justifyContent="space-between" alignItems="center">
   <Box><Typography className="kicker" sx={{color:'#b3d2b8'}}>OUR STORY</Typography><Typography variant="h4" sx={{...sectionH,color:'white',fontSize:{xs:29,md:35}}}>Good food. Good people. Great memories.</Typography></Box>
   <Button color="inherit" variant="outlined" onClick={()=>go('about')} endIcon={<ArrowForwardRounded/>} sx={{borderColor:'#9cb8c9',color:'white'}}>Get to know us</Button>
 </Stack></Container></Box></>;
}
function PageIntro({eyebrow,title,subtitle,accent}:{eyebrow:string;title:string;subtitle:string;accent?:string}) {
 return <Box className="page-intro"><Container maxWidth="lg"><Typography className="kicker" sx={{mb:1}}>{eyebrow}</Typography>
 <Typography variant="h1" sx={{...sectionH,fontSize:{xs:44,md:64},lineHeight:1.05,mb:1.3}}>{title}</Typography>
 <Typography color="text.secondary" sx={{maxWidth:650,fontSize:{xs:14,md:16},lineHeight:1.7}}>{subtitle}</Typography>{accent&&<Typography sx={{fontSize:12,color:palette.forest,mt:1.5,fontWeight:750}}>{accent}</Typography>}</Container></Box>;
}
function MenuPage({add,detail}:{add:(id:string)=>void;detail:(i:MenuItem)=>void}) {
 const [category,setCategory]=useState<'All'|MenuCategory>('All'); const [search,setSearch]=useState('');
 const filtered=useMemo(()=>MENU.filter(i=>(category==='All'||i.category===category)&&(`${i.name} ${i.description}`.toLowerCase().includes(search.toLowerCase()))),[category,search]);
 return <><PageIntro eyebrow="FROM OUR KITCHEN TO YOUR TABLE" title="EXPLORE THE MENU" subtitle="Tacos, comforting classics, homemade favorites and the little extras that make every meal feel special." accent="Menu prices from the supplied design references — please confirm before launch."/>
 <Container maxWidth="lg" sx={{py:{xs:4,md:6}}}>
 <Stack direction={{xs:'column',md:'row'}} spacing={2} justifyContent="space-between" alignItems={{xs:'stretch',md:'center'}} sx={{mb:4}}>
  <Box className="category-scroll"><Stack direction="row" spacing={1}>{categories.map(c=><Chip key={c} label={c} clickable color={category===c?'primary':'default'} variant={category===c?'filled':'outlined'} onClick={()=>setCategory(c)} sx={{px:1,height:37,borderColor:'#dde5e8',whiteSpace:'nowrap'}}/>)}</Stack></Box>
  <TextField size="small" placeholder="Search menu..." value={search} onChange={e=>setSearch(e.target.value)} sx={{minWidth:{xs:1,md:255}}} InputProps={{startAdornment:<InputAdornment position="start"><SearchRounded/></InputAdornment>}}/>
 </Stack>
 {filtered.length===0?<Paper sx={{p:7,textAlign:'center'}}><Typography fontWeight={800}>No menu items found.</Typography><Button onClick={()=>{setCategory('All');setSearch('')}}>Reset filters</Button></Paper>:
  <Grid container spacing={{xs:1.5,md:3}}>{filtered.map(i=><Grid key={i.id} size={{xs:6,sm:4,md:3}}><FoodCard item={i} add={add} showDetail={detail}/></Grid>)}</Grid>}
 <Box className="menu-notice"><InfoOutlined sx={{fontSize:21,flexShrink:0}}/><Box><Typography fontWeight={800} fontSize={14}>Prototype menu, not live online ordering</Typography><Typography fontSize={13} color="text.secondary">These items and prices come from provided design references. Customize options, prices, and availability before publishing.</Typography></Box></Box>
 </Container></>;
}
function CateringPage(){
 const [packId,setPackId]=useState(CATERING[0].id);
 const [guests,setGuests]=useState<number>(30);
 const [copied,setCopied]=useState(false);
 const selected=CATERING.find(p=>p.id===packId)!;
 const quote=`Hi Mateo's Taqueria! I'd like to ask about catering. Package: ${selected.name} (${money(selected.price)}/person). Guests: ${guests}. Estimated food subtotal: ${money(guests*selected.price)}. Please contact me about availability and final pricing.`;
 const copy=async()=>{try{await navigator.clipboard.writeText(quote);setCopied(true)}catch{setCopied(false)}};
 return <><PageIntro eyebrow="BIG FLAVOR FOR EVERY CELEBRATION" title="LET'S CATER YOUR NEXT EVENT" subtitle="From taco stations to family-style favorites, turn your next celebration into something delicious." accent="Catering is currently available. Packages and rates are taken from the supplied catering menu."/>
 <Container maxWidth="lg" sx={{py:{xs:4,md:7}}}><Heading title="CATERING PACKAGES" kicker="FRESH · HOMEMADE · MADE TO SHARE"/>
  <Grid container spacing={2.5}>{CATERING.map(p=><Grid key={p.id} size={{xs:12,sm:6,md:4}}><Card className={`catering-card ${packId===p.id?'selected':''}`}>
    <Box className="catering-photo"><Box component="img" loading="lazy" src={image(p.photo)} alt={p.name} sx={roundedImage}/><Box className="price-sticker">{money(p.price)}<small>/ person</small></Box></Box>
    <Box sx={{p:2.5}}><Typography variant="h6" sx={{fontWeight:850,mb:.5}}>{p.name}</Typography><Typography fontSize={13} color="text.secondary" sx={{minHeight:40}}>{p.description}</Typography>
    <Divider sx={{my:1.7}}/><Stack spacing={.7} sx={{mb:2}}>{p.includes.slice(0,3).map(v=><Stack key={v} direction="row" alignItems="flex-start" spacing={.8}><CheckRounded sx={{fontSize:17,color:palette.forest,mt:.1}}/><Typography fontSize={12.4}>{v}</Typography></Stack>)}</Stack>
    <Button fullWidth variant={packId===p.id?'contained':'outlined'} onClick={()=>{setPackId(p.id);document.getElementById('catering-quote')?.scrollIntoView({behavior:'smooth',block:'center'})}}>{packId===p.id?'Selected package':'Select package'}</Button></Box>
  </Card></Grid>)}</Grid>
  <Box id="catering-quote" className="catering-quote"><Grid container spacing={4} alignItems="center"><Grid size={{xs:12,md:7}}>
    <Typography className="kicker">PLAN YOUR CELEBRATION</Typography><Typography variant="h3" sx={{...sectionH,fontSize:{xs:34,md:43},mb:1}}>BUILD A QUICK ESTIMATE</Typography>
    <Typography color="text.secondary" fontSize={14} sx={{mb:3}}>Choose a package and your guest count. This is an estimate, not a booking or final quote.</Typography>
    <Grid container spacing={2}><Grid size={{xs:12,sm:7}}><FormControl fullWidth size="small"><InputLabel id="package-label">Catering package</InputLabel><Select labelId="package-label" label="Catering package" value={packId} onChange={e=>setPackId(e.target.value)}>{CATERING.map(p=><MuiMenuItem key={p.id} value={p.id}>{p.name}</MuiMenuItem>)}</Select></FormControl></Grid>
    <Grid size={{xs:12,sm:5}}><TextField label="Guests" type="number" size="small" fullWidth value={guests} onChange={e=>setGuests(Math.min(1000,Math.max(1,Number(e.target.value)||1)))} inputProps={{min:1,max:1000}}/></Grid></Grid>
    <Stack spacing={1} sx={{mt:2}}>{selected.includes.map(inc=><Stack key={inc} direction="row" spacing={1} alignItems="flex-start"><CheckCircleOutlineRounded color="secondary" sx={{fontSize:17,mt:.2}}/><Typography fontSize={13.5}>{inc}</Typography></Stack>)}</Stack>
  </Grid><Grid size={{xs:12,md:5}}><Paper className="estimate-box"><Typography fontSize={13} fontWeight={800} color="#cedce9">YOUR ESTIMATE</Typography><Typography variant="h2" sx={{fontFamily:'"Barlow Condensed"',fontWeight:800,fontSize:65,color:'white',mt:.4}}>{money(guests*selected.price)}</Typography>
   <Typography fontSize={12.5} sx={{color:'#e3edf4'}}> {guests} guests × {money(selected.price)} per person</Typography><Divider sx={{my:2,borderColor:'#407298'}}/>
   <Button fullWidth variant="contained" sx={{background:'white',color:palette.navy,'&:hover':{background:'#e8f3fb'}}} startIcon={<ContentCopyOutlined/>} onClick={copy}>{copied?'Copied!':'Copy catering request'}</Button>
   <Button fullWidth variant="outlined" sx={{mt:1.5,borderColor:'#7290a7',color:'white'}} href={`sms:${BUSINESS.phone}?body=${encodeURIComponent(quote)}`} startIcon={<PhoneOutlined/>}>Text the restaurant</Button>
   <Typography fontSize={11.5} sx={{color:'#c8dfed',mt:2,lineHeight:1.5}}>Demo only. Taxes, service, setup and availability may affect your final quote.</Typography>
  </Paper></Grid></Grid></Box>
 </Container></>;
}
function RewardsPage({go}:{go:(p:Page)=>void}) {
 return <><PageIntro eyebrow="GOOD THINGS ARE COMING" title="REWARDS, THE MATEO'S WAY" subtitle="We’re designing a little something extra for the people who love good Mexican food. This area is a visual preview—no accounts or rewards are active."/>
  <Container maxWidth="lg" sx={{py:7}}><Box className="rewards-feature"><Typography className="script-title" sx={{fontSize:{xs:43,md:63}}}>Made with love. Shared with you.</Typography><Typography fontWeight={750} fontSize={18} sx={{maxWidth:450,mb:3}}>A future home for special offers, fan favorites and surprise treats.</Typography><Chip color="primary" label="Coming soon" sx={{fontSize:12,fontWeight:800}}/></Box>
   <Grid container spacing={2.5} sx={{my:5}}>{[{icon:<FavoriteBorderRounded/>,title:'Celebrate your favorites',text:'Keep the dishes you love close to heart.'},{icon:<CardGiftcardOutlined/>,title:'Something to look forward to',text:'Exclusive perks can live here when rewards launch.'},{icon:<LocalOfferOutlined/>,title:'Fresh updates',text:'Check back for seasonal offers and restaurant news.'}].map(x=><Grid size={{xs:12,md:4}} key={x.title}><Paper className="feature-paper"><Box className="feature-symbol">{x.icon}</Box><Typography fontWeight={850} fontSize={18} sx={{mt:2}}>{x.title}</Typography><Typography color="text.secondary" fontSize={13.5} sx={{mt:.9}}>{x.text}</Typography></Paper></Grid>)}</Grid><Button variant="contained" onClick={()=>go('menu')}>See what's on the menu</Button>
  </Container></>;
}
function LocationsPage(){return <><PageIntro eyebrow="YOUR NEIGHBORHOOD TAQUERIA" title="FIND MATEO'S" subtitle="Our Arlington home is getting ready. Follow the restaurant for opening updates, or reach out about catering your next gathering."/>
 <Container maxWidth="lg" sx={{py:6}}><Grid container spacing={3} alignItems="stretch"><Grid size={{xs:12,md:6}}><Paper sx={{p:{xs:3,md:5},height:'100%',border:'1px solid #e5e9e9',borderRadius:4}}>
 <Chip icon={<AccessTimeRounded/>} label="Opening soon · Catering available" sx={{color:palette.forest,background:'#eaf3e8',fontWeight:800,mb:3}}/>
 <Typography variant="h4" sx={{...sectionH,fontSize:35}}>ARLINGTON, TEXAS</Typography><Typography sx={{fontSize:17,mt:2,lineHeight:1.8}}>{BUSINESS.street}<br/>{BUSINESS.suite}<br/>{BUSINESS.city}</Typography>
 <Divider sx={{my:3}}/><Stack spacing={2}><Stack direction="row" spacing={1.5}><PhoneOutlined sx={{color:palette.royal}}/><Box><Typography fontWeight={800}>Catering contact</Typography><Typography>{phoneFormatted}</Typography></Box></Stack>
 <Stack direction="row" spacing={1.5}><InfoOutlined sx={{color:palette.royal}}/><Box><Typography fontWeight={800}>Hours</Typography><Typography color="text.secondary" fontSize={14}>Not published yet — check for opening updates</Typography></Box></Stack></Stack>
 <Stack direction={{xs:'column',sm:'row'}} spacing={1.3} sx={{mt:4}}><Button variant="contained" startIcon={<LocationOnOutlined/>} href={BUSINESS.maps} target="_blank" rel="noreferrer">Get directions</Button><Button variant="outlined" href={`tel:${BUSINESS.phone}`} startIcon={<PhoneOutlined/>}>Call for catering</Button></Stack>
 </Paper></Grid><Grid size={{xs:12,md:6}}><Box className="location-visual"><Box className="location-plants"/><Box className="location-card"><LocationOnOutlined sx={{fontSize:34,color:palette.royal}}/><Typography fontWeight={850} fontSize={23}>We'll see you in Arlington!</Typography><Typography color="text.secondary" fontSize={14}>2425 SE Green Oaks Blvd · Suite 103</Typography><Button size="small" onClick={()=>window.open(BUSINESS.maps,'_blank','noopener,noreferrer')} endIcon={<ArrowForwardRounded/>}>View on maps</Button></Box></Box></Grid></Grid></Container></>}
function AboutPage({go}:{go:(p:Page)=>void}){return <><PageIntro eyebrow="HOLA, FROM OUR FAMILY" title="THIS IS MATEO'S" subtitle="Our vision is simple: welcoming Mexican food that brings people together, made with care and a whole lot of heart."/>
 <Container maxWidth="lg" sx={{py:7}}><Grid container spacing={5} alignItems="center"><Grid size={{xs:12,md:6}}><Box component="img" src={image('hero-tacos.jpg')} sx={{width:'100%',borderRadius:5,aspectRatio:'1.25',objectFit:'cover'}}/></Grid>
 <Grid size={{xs:12,md:6}}><Typography className="kicker">HECHO EN CASA, HECHO CON ORGULLO</Typography><Typography variant="h3" sx={{...sectionH,fontSize:{xs:36,md:48},mt:1,mb:2}}>FRESH FOOD. DEEP ROOTS. REAL CONNECTION.</Typography><Typography color="text.secondary" sx={{lineHeight:1.9,fontSize:15.5}}>We believe a great meal has a way of making people feel at home. That’s why the Mateo’s Taqueria concept celebrates fresh ingredients, homemade recipes and the rich flavors of Mexican cooking.</Typography><Typography color="text.secondary" sx={{lineHeight:1.9,fontSize:15.5,mt:2}}>From casual taco nights to meaningful celebrations, every gathering deserves something delicious.</Typography><Button sx={{mt:3}} variant="contained" onClick={()=>go('catering')} endIcon={<ArrowForwardRounded/>}>Discover catering</Button></Grid></Grid>
 <Paper sx={{my:7,p:{xs:3,md:5},background:'#f5f8f4',border:'1px solid #e4eadf',borderRadius:4}}><Typography className="kicker">KIND WORDS</Typography><Typography fontWeight={750} sx={{fontSize:{xs:20,md:25},lineHeight:1.5,maxWidth:880,mt:1}}>“We used Mateo’s Taqueria to cater my grandson’s first birthday party, and they were absolutely amazing! The food was fresh, delicious, and a huge hit with all of our guests.”</Typography><Typography fontSize={13} sx={{mt:2,color:palette.forest,fontWeight:800}}>Heidi · May 30, 2026 · Review published on Mateo's website</Typography></Paper>
 </Container></>}
function MainFooter({go}:{go:(p:Page)=>void}){return <Box component="footer" className="site-footer"><Container maxWidth="lg"><Grid container spacing={4} sx={{py:6}}><Grid size={{xs:12,md:5}}><Brand onClick={()=>go('home')}/><Typography fontSize={13.5} color="#c0d7e8" sx={{mt:2,maxWidth:350,lineHeight:1.7}}>Homemade Mexican flavor, fresh ingredients and a whole lot of heart. Welcome to Mateo’s.</Typography></Grid>
 <Grid size={{xs:6,md:2}}><Typography fontWeight={800} fontSize={13} sx={{mb:1.5}}>EXPLORE</Typography>{(['menu','catering','rewards'] as Page[]).map(p=><Box key={p}><Button className="footer-link" onClick={()=>go(p)}>{pageTitle[p]}</Button></Box>)}</Grid>
 <Grid size={{xs:6,md:2}}><Typography fontWeight={800} fontSize={13} sx={{mb:1.5}}>LEARN MORE</Typography>{(['locations','about'] as Page[]).map(p=><Box key={p}><Button className="footer-link" onClick={()=>go(p)}>{pageTitle[p]}</Button></Box>)}<Button className="footer-link" href={BUSINESS.website} target="_blank">Original site</Button></Grid>
 <Grid size={{xs:12,md:3}}><Typography fontWeight={800} fontSize={13} sx={{mb:1.5}}>SAY HOLA</Typography><Typography fontSize={13} color="#c0d7e8">{BUSINESS.street}<br/>{BUSINESS.suite}<br/>{BUSINESS.city}</Typography><Button className="footer-link" href={`tel:${BUSINESS.phone}`} sx={{mt:1}}>{phoneFormatted}</Button></Grid></Grid>
 <Divider sx={{borderColor:'rgba(255,255,255,.16)'}}/><Stack direction={{xs:'column',sm:'row'}} spacing={1} justifyContent="space-between" sx={{py:2.5}}><Typography fontSize={11.5} color="#adc9dd">© 2026 Mateo's Taqueria · Front-end concept</Typography><Typography fontSize={11.5} color="#adc9dd">A design prototype — no orders, bookings or payments are submitted</Typography></Stack>
 </Container></Box>}
function CartDrawer({open,close,lines,change,clear}:{open:boolean;close:()=>void;lines:CartLine[];change:(id:string,change:number)=>void;clear:()=>void}){
 const [dialog,setDialog]=useState(false);
 const items=lines.map(l=>({line:l,item:MENU.find(i=>i.id===l.id)})).filter((v):v is {line:CartLine;item:MenuItem}=>Boolean(v.item));
 const subtotal=items.reduce((s,x)=>s+x.item.price*x.line.quantity,0);
 return <><Drawer anchor="right" open={open} onClose={close} PaperProps={{sx:{width:{xs:'100%',sm:425},p:3,background:'#fffefb'}}}>
 <Stack direction="row" justifyContent="space-between" alignItems="center"><Box><Typography className="kicker">YOUR FAVORITES</Typography><Typography sx={{...sectionH,fontSize:32}}>DEMO BAG</Typography></Box><IconButton onClick={close}><CloseRounded/></IconButton></Stack>
 <Typography fontSize={12} color="text.secondary" sx={{mt:1}}>Try the ordering experience. No live orders are sent.</Typography><Divider sx={{my:3}}/>
 {items.length===0?<Box sx={{textAlign:'center',mt:8}}><ShoppingBagOutlined sx={{fontSize:70,color:'#a5b8c7'}}/><Typography variant="h6" fontWeight={800} sx={{mt:2}}>Your bag is empty</Typography><Typography color="text.secondary" fontSize={13} sx={{mt:1,mb:3}}>Good things are just a few taps away.</Typography><Button variant="contained" onClick={close}>Explore menu</Button></Box>:
 <><Box sx={{flex:1,overflowY:'auto'}}><Stack spacing={2}>{items.map(({line,item})=><Stack key={line.id} direction="row" spacing={2} alignItems="center"><Box component="img" src={image(item.photo)} alt={item.name} sx={{width:90,height:80,borderRadius:2,objectFit:'cover'}}/><Box sx={{flex:1}}><Typography fontSize={14} fontWeight={850}>{item.name}</Typography><Typography fontSize={14} color="primary" fontWeight={800}>{money(item.price*line.quantity)}</Typography><Stack direction="row" spacing={1} alignItems="center" sx={{mt:.5}}><IconButton size="small" onClick={()=>change(line.id,-1)}><RemoveRounded fontSize="small"/></IconButton><Typography fontWeight={800} fontSize={13}>{line.quantity}</Typography><IconButton size="small" onClick={()=>change(line.id,1)}><AddRounded fontSize="small"/></IconButton></Stack></Box></Stack>)}</Stack></Box>
 <Divider sx={{my:2}}/><Stack direction="row" justifyContent="space-between"><Typography fontWeight={850}>Subtotal</Typography><Typography fontWeight={900} fontSize={22}>{money(subtotal)}</Typography></Stack><Typography color="text.secondary" fontSize={12} sx={{mt:1,mb:2}}>Taxes and fees not included. Not a purchase.</Typography>
 <Button variant="contained" fullWidth sx={{py:1.5}} onClick={()=>setDialog(true)}>Continue (demo only)</Button><Button fullWidth size="small" onClick={clear} startIcon={<DeleteOutlineRounded/>} sx={{mt:1,color:'#687a89'}}>Clear bag</Button></>}
 </Drawer><Dialog open={dialog} onClose={()=>setDialog(false)} maxWidth="xs"><DialogTitle sx={{fontWeight:850}}>You're all set for the preview!</DialogTitle><DialogContent><Typography fontSize={14} lineHeight={1.8}>This is a front-end prototype. Your demo bag works locally, but no order, account, or payment is sent to Mateo’s Taqueria. Ordering integration can be added when the restaurant is ready.</Typography></DialogContent><DialogActions><Button onClick={()=>setDialog(false)}>Close</Button></DialogActions></Dialog></>;
}
function AppContents(){
 const [page,setPage]=useState<Page>(()=>{const p=window.location.pathname.slice(1);return pages.includes(p as Page)?p as Page:'home'});
 const [navOpen,setNavOpen]=useState(false); const [cartOpen,setCartOpen]=useState(false); const [details,setDetails]=useState<MenuItem|null>(null); const [toast,setToast]=useState('');
 const [cart,setCart]=useState<CartLine[]>(()=>{try{const raw=localStorage.getItem('mateos-demo-cart');return raw?JSON.parse(raw) as CartLine[]:[]}catch{return []}});
 useEffect(()=>{localStorage.setItem('mateos-demo-cart',JSON.stringify(cart))},[cart]);
 useEffect(()=>{const back=()=>{const p=window.location.pathname.slice(1);setPage(pages.includes(p as Page)?p as Page:'home')};window.addEventListener('popstate',back);return()=>window.removeEventListener('popstate',back)},[]);
 const go=(p:Page)=>{setPage(p);setNavOpen(false);window.history.pushState({},'',p==='home'?'/':`/${p}`);window.scrollTo({top:0,behavior:'smooth'})};
 const add=(id:string)=>{setCart(prev=>{const idx=prev.findIndex(v=>v.id===id);if(idx<0)return [...prev,{id,quantity:1}];return prev.map(v=>v.id===id?{...v,quantity:v.quantity+1}:v)});setToast('Added to your demo bag')};
 const change=(id:string,delta:number)=>setCart(prev=>prev.map(v=>v.id===id?{...v,quantity:Math.max(0,v.quantity+delta)}:v).filter(v=>v.quantity>0));
 const cartCount=cart.reduce((a,x)=>a+x.quantity,0);
 const mobile=useMediaQuery(theme.breakpoints.down('md'));
 const navItems:[Page,string][]=[['home','Home'],['menu','Menu'],['catering','Catering'],['rewards','Rewards'],['locations','Locations'],['about','About Us']];
 return <Box className="app-shell"><Preheader go={go}/><AppBar position="sticky" elevation={0} className="nav-appbar"><Container maxWidth="lg"><Toolbar disableGutters sx={{minHeight:{xs:73,md:102},display:'flex',justifyContent:'space-between',gap:2}}>
   <Stack direction="row" alignItems="center" spacing={1}>{mobile&&<IconButton onClick={()=>setNavOpen(true)} aria-label="Open navigation"><MenuRounded sx={{color:palette.navy}}/></IconButton>}<Brand onClick={()=>go('home')} small={mobile}/></Stack>
   {!mobile&&<Stack direction="row" spacing={.5}>{navItems.map(([p,label])=><Button key={p} onClick={()=>go(p)} className={`nav-link ${page===p?'active':''}`}>{label}</Button>)}</Stack>}
   <Stack direction="row" alignItems="center" spacing={1}>{!mobile&&<Button variant="contained" startIcon={<ShoppingBagOutlined/>} onClick={()=>{if(cartCount===0)go('menu');else setCartOpen(true)}}>Order preview</Button>}
   <Tooltip title="Open demo bag"><IconButton aria-label={`Open bag with ${cartCount} items`} onClick={()=>setCartOpen(true)}><Badge badgeContent={cartCount} color="primary"><ShoppingBagOutlined sx={{color:palette.navy}}/></Badge></IconButton></Tooltip></Stack>
 </Toolbar></Container></AppBar>
 <Box component="main" sx={{minHeight:'55vh'}}>{page==='home'?<HomePage go={go} add={add} detail={setDetails}/>:
 page==='menu'?<MenuPage add={add} detail={setDetails}/>:
 page==='catering'?<CateringPage/>:
 page==='rewards'?<RewardsPage go={go}/>:
 page==='locations'?<LocationsPage/>:<AboutPage go={go}/>}</Box>
 <MainFooter go={go}/>
 <Drawer open={navOpen} onClose={()=>setNavOpen(false)} PaperProps={{sx:{width:285,p:3}}}><Stack direction="row" alignItems="center" justifyContent="space-between"><Brand onClick={()=>go('home')} small/><IconButton onClick={()=>setNavOpen(false)}><CloseRounded/></IconButton></Stack><Divider sx={{my:3}}/><List>{navItems.map(([p,label])=><ListItemButton key={p} selected={p===page} onClick={()=>go(p)} sx={{borderRadius:2,mb:.5}}><ListItemText primary={label} primaryTypographyProps={{fontWeight:800}}/><ChevronRightRounded/></ListItemButton>)}</List><Typography color="text.secondary" fontSize={12} sx={{mt:'auto'}}>Catering available · Arlington opening soon</Typography></Drawer>
 {mobile&&<Box className="mobile-bottom"><BottomNavigation showLabels value={page} onChange={(_,value:Page)=>{if(value==='locations')go('locations');else go(value)}}>
 <BottomNavigationAction value="home" label="Home" icon={<HomeOutlined/>}/><BottomNavigationAction value="menu" label="Menu" icon={<RestaurantMenuOutlined/>}/><BottomNavigationAction value="catering" label="Catering" icon={<GroupsOutlined/>}/><BottomNavigationAction value="rewards" label="Rewards" icon={<CardGiftcardOutlined/>}/><BottomNavigationAction value="locations" label="More" icon={<MoreHorizRounded/>}/>
 </BottomNavigation></Box>}
 <CartDrawer open={cartOpen} close={()=>setCartOpen(false)} lines={cart} change={change} clear={()=>setCart([])}/>
 <Dialog open={!!details} onClose={()=>setDetails(null)} maxWidth="sm" fullWidth PaperProps={{sx:{borderRadius:4,overflow:'hidden'}}}>{details&&<><Box component="img" src={image(details.photo)} alt={details.name} sx={{width:'100%',maxHeight:280,objectFit:'cover'}}/><DialogTitle sx={{pb:.5,fontWeight:850,fontSize:23}}>{details.name}</DialogTitle><DialogContent><Chip size="small" label={details.category} sx={{mb:2}}/><Typography color="text.secondary" fontSize={14.5}>{details.description}</Typography><Typography fontWeight={900} fontSize={27} color="primary" sx={{mt:2}}>{money(details.price)}</Typography></DialogContent><DialogActions sx={{px:3,pb:3}}><Button onClick={()=>setDetails(null)}>Close</Button><Button variant="contained" onClick={()=>{add(details.id);setDetails(null)}} startIcon={<AddRounded/>}>Add to demo bag</Button></DialogActions></>}</Dialog>
 <Snackbar open={!!toast} onClose={()=>setToast('')} autoHideDuration={2400} anchorOrigin={{vertical:'bottom',horizontal:'center'}} sx={{mb:{xs:9,md:2}}}><Alert severity="success" onClose={()=>setToast('')} sx={{fontWeight:750}}>{toast}</Alert></Snackbar>
 </Box>;
}
export default function WebApp(){return <ThemeProvider theme={theme}><CssBaseline/><AppContents/></ThemeProvider>}
