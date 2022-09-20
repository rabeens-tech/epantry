import Home from "../components/pages/Home";
import InventoryList from "../components/Inventory/InventoryList";
import GroceryList from "../components/Grocery/GroceryList";
import ProductPage from "../components/settings/ProductPage";
import ProductCategory from "../components/settings/ProductCategory";
import ConsumptionPage from "../components/Consumption/ConsumptionPage";
import Login from "../components/Login/Login";
import StockList1 from "../components/StockList/StockList1";


const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
    title: "Dashboard",
    showInNav: true,
    parent: "Core",
  },


  // settings part
 

  {
    path:"/settings/productCategory",
    component: ProductCategory,
    exact:true,
    parent: "SETTINGS",
    title:" manage category",
    showInNav:true,
},
{
  path:"/settings/productSKU",
  component: ProductPage,
  exact:true,
  parent: "SETTINGS",
  title:"productSKU",
  showInNav:true,
},
{
  path:"/inventory/inventorylist",
  component: InventoryList,
  exact:true,
  parent: "INVENTORY",
  title:"ProductList",
  showInNav:true,
},
{
path:"/grocery/productlist",
component: GroceryList,
exact:true,
parent: "GROCERY",
title:"GroceryList",
showInNav:true,
},
{
  path:"/stock/addstockproductlist",
  component: StockList1,
  exact:true,
  parent: "STOCK",
  title:"stock",
  showInNav:true,
  },
{
  path:"/consumption/productlist",
  component: ConsumptionPage,
  exact:true,
  parent: "CONSUMPTION",
  title:"ConList",
  showInNav:true
  },
];

export default routes;
