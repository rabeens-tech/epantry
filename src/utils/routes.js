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
    component: Productlist,
    exact: true,
    title: "Dashboard",
    showInNav: true,
    parent: "Core",
  },

  {
    path:"/settings/categories",
    component: ProductCategory,
    exact:true,
    parent: "MASTER",
    title:"categories",
    showInNav:true,
    icon:<CategoryIcon />
},
{
path:"/inventory",
  component:Productlist,
  exact:true,
  parent:"INVENTORY",
  title:"Product",
  showInNav:true,
  icon:<AddBusinessIcon />
},
{
  path:"/settings/users",
  component: User,
  exact:true,
  parent: "MASTER",
  title:" User",
  showInNav:true,
  icon:<ManageAccountsIcon />
},
{
  path:"/settings/products",
  component: ProductPage,
  exact:true,
  parent: "MASTER",
  title:"products",
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
path:"/grocerylist",
component: GroceryList,
exact:true,
parent: "GROCERY",
title:"Grocery List",
showInNav:true,
icon:<LocalGroceryStoreIcon/>,
},
{
  path:"/stock",
  component: StockList1,
  exact:true,
  parent: "STOCK",
  title:"Stock List",
  showInNav:true,
  icon:<InventoryIcon />

  },
{
  path:"/consumption",
  component: ConsumptionPage,
  exact:true,
  parent: "CONSUMPTION",
  title:"Consumption",
  showInNav:true,
  icon:<AccessTimeIcon/>
  },
];

export default routes;
