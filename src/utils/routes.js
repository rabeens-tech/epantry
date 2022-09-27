import Home from "../components/pages/Home";
import InventoryList from "../components/Inventory/InventoryList";
import GroceryList from "../components/Grocery/GroceryList";
import ProductPage from "../components/settings/ProductPage";
import ProductCategory from "../components/settings/ProductCategory";
import ConsumptionPage from "../components/Consumption/ConsumptionPage";
import Login from "../components/Login/Login";
import StockList1 from "../components/StockList/StockList1";
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CategoryIcon from '@mui/icons-material/Category';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import User from "../components/settings/User";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Productlist from "../components/Inventory/Productlist";
const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
    title: "Dashboard",
    showInNav: true,
    parent: "Core",
  },

  {
    path:"/settings/productCategory",
    component: ProductCategory,
    exact:true,
    parent: "SETTINGS",
    title:" manage category",
    showInNav:true,
    icon:<CategoryIcon />
},
{
path:"/product/inventory",
  component:Productlist,
  exact:true,
  parent:"INVENTORY",
  title:"Add Product",
  showInNav:true,
  icon:<AddBusinessIcon />
},
{
  path:"/settings/User",
  component: User,
  exact:true,
  parent: "SETTINGS",
  title:" User",
  showInNav:true,
  icon:<ManageAccountsIcon />
},
{
  path:"/settings/productSKU",
  component: ProductPage,
  exact:true,
  parent: "SETTINGS",
  title:"productSKU",
  showInNav:true,
icon:<ProductionQuantityLimitsIcon/>
},
// {
//   path:"/inventory/inventorylist/add",
//   component: InventoryList,
//   exact:true,
//   parent: "INVENTORY",
//   title:"Inventorys",
//   showInNav:true,
 
  
// },
{
path:"/grocery/productlist",
component: GroceryList,
exact:true,
parent: "GROCERY",
title:"GroceryList",
showInNav:true,
icon:<LocalGroceryStoreIcon/>,
},
{
  path:"/stock/stockproductlist/add",
  component: StockList1,
  exact:true,
  parent: "STOCK",
  title:"Stock List",
  showInNav:true,
  icon:<InventoryIcon />

  },
{
  path:"/consumption/productlist",
  component: ConsumptionPage,
  exact:true,
  parent: "CONSUMPTION",
  title:"Consumption",
  showInNav:true,
  icon:<AccessTimeIcon/>
  },
];

export default routes;
