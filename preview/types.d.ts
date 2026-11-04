type Page = 'home' | 'menu' | 'catering' | 'rewards' | 'locations' | 'about';
type MenuCategory = 'Tacos' | 'Favorites' | 'Appetizers' | 'Breakfast' | 'Drinks' | 'Desserts';

interface Business {
  name: string;
  address: string;
  street: string;
  suite: string;
  city: string;
  phone: string;
  website: string;
  maps: string;
}

interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  photo: string;
  badge?: string;
}

interface CateringPack {
  id: string;
  name: string;
  price: number;
  description: string;
  photo: string;
  serving: string;
  includes: string[];
}

interface MateoData {
  business: Business;
  menu: MenuItem[];
  catering: CateringPack[];
}

interface Window {
  MATEOS_DATA: MateoData;
}
