import React, { useState, useEffect } from "react";
import UseTable from "../home/UseTable";
import Popup from "../home/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Spinner from '../../utils/spinner';
import { Search } from "@material-ui/icons";
import { makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Tooltip,Paper} from "@material-ui/core";
import Controls from "../controls/Controls";

import AddIcon from "@material-ui/icons/Add";


import axios from "axios";
import { toast } from "react-toastify";
import config from "../../utils/config";


import NewCard from "../card/NewCard";
import CardsStock from "../cards/CardsStock";
import PageHeaderTitle from "../../utils/PageHeaderTitle";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  searchInput: {
    width: '50%'
},
  newButton: {
    margin: 0,
    zIndex:4
  },
}));
 
const headCells = [
  { id: "categoryname", label: "CategoryName", disableSorting: true },
  { id: "name", label: "Item" , disableSorting: true },
  { id: "qty", label: "QTY", disableSorting: true },
  { id: "unit", label: "UOM", disableSorting: true },
  { id: "left_qty", label: " LeftQTY", disableSorting: true },
  { id: "left_unit", label: "Left UOM", disableSorting: true },
 
  { id: "last_replenished", label: "Last Replenished", disableSorting: true },
];

export default function StockList1(props) {


  const classes = useStyles(props);
  const [records, setRecords] = useState();
  const [categories, setCategories] = useState();
 

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
 
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    UseTable(records, headCells, filterFn);

    const handleSearch = (e) => {
      let query = e.target.value;
  
      setFilterFn({
        fn: (items) => {
          if (query === "") return items;
          else
            return items.filter(
              (x) =>
                x.categoryname
                  .toLowerCase()
                  .includes(query.toLowerCase())
             
            );
        },
      });
    };

    React.useEffect(()=>{
      load_products()
      load_categories()
    },[])



const load_categories = () =>{
    axios
    .get(`${config.APP_CONFIG}category/getall`)
    .then((res) => {
      if (res.status === 200) {
        console.log(res)

        setCategories(res.data)
        // toast.success(res.data || "successfully added");
    
      } else if (res.status === 401) {
        // userSessionContext.handleLogout();
      } else if (res.status === 400) {
        toast.error(res.data || "error loading data");
        setCategories([]);
      }
    })
    .catch((err) => {
      console.log(err)
      toast.error("Something Went Wrong");
      setCategories([]);
    });
    }





    const load_products = () =>{
    axios
    .get(`${config.APP_CONFIG}inventory/getall`)
    .then((res) => {
      if (res.status === 200) {
        // console.log(res)
        setRecords(res.data)
        // toast.success(res.data || "successfully added");
    
      } else if (res.status === 401) {
        // userSessionContext.handleLogout();
      } else if (res.status === 400) {
        toast.error(res.data || "error loading data");
        setRecords([]);
      }
    })
    .catch((err) => {
      console.log(err)
      toast.error("Something Went Wrong");
      setRecords([]);
    });
    }


    if(records === undefined ){
      return <Spinner />
    }

    if(categories === undefined ){
      return <Spinner />
    }



  return (
    <div>
  <div>
  {/* <CardsStock/>  */}
  <NewCard
    data = {categories}
  />
  </div>

  <div>
          
{/*          <PageHeaderTitle title="Grocery" /> */}
        </div>
        <Toolbar>
          <Controls.Input
            label="Search"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Toolbar>
 
        <Paper className={classes.pageContent}>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 proCategoryTbl">
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting() &&
                recordsAfterPagingAndSorting().map((item) => (
                  <TableRow key={item.id}>
                 
                    <TableCell><div className="avataricon">
                      <img alt={item.name} src={item.imgUrl}className="avt"/>
                      {item.inventoryName}
                      </div>
                    </TableCell>
                    <TableCell>{item.inventoryName}</TableCell>
                    <TableCell>{item.qty}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.left_qty}</TableCell>
                    <TableCell>{item.left_unit}</TableCell>
                    <TableCell>{item.last_replenished}{"  days ago"}</TableCell>

                  </TableRow>
                ))}
            </TableBody>
          </TblContainer>
          {records.length>1 ?
          <TblPagination />
          :null}
        </div>
        </div>
        </Paper>
  
      </div>
  );
}

