import React, { useState, useEffect } from "react";
import axios from "axios";

import config from "../../utils/config";
import UseTable from "../home/UseTable";
import Popup from "../home/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Search } from "@material-ui/icons";
import { makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Tooltip} from "@material-ui/core";
import Controls from "../controls/Controls";

import AddIcon from "@material-ui/icons/Add";
import Cards from "../cards/Cards";

import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";
import ConfirmDialog from "../home/ConfirmDialog";

import PageHeaderTitle from "../../utils/PageHeaderTitle";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  newButton: {
    margin: 0,
    zIndex:4
  },
}));
const product=[
  {
    "id":1,
  "name":"vegsMOMOS",
  "days":"5",
  "categoryname":"momos",
  "qty":"3",
  "unit":"plate",
  "consume_rate":"2gram/day"
},
{
  "id":2,
  "name":"pizza",
  "days":"4",
  "categoryname":"dominos",
  "qty":"3",
  "unit":"packet",
  "consume_rate":"2piece/week"
},
{
  "id":3,
  "name":"cocacola",
  "days":"7",
  "categoryname":"Coke",
  "unit":"bottle",
  "qty":"3",
  "consume_rate":"2bootle/day"
},
{
  "id":4,
  "name":"nachos",
  "days":"3",
  "categoryname":"crisps",
  "unit":"packet",
  "qty":"3",
  "consume_rate":"200gram/week"
},
]
const headCells = [
  { id: "name", label: "Item" },
  { id: "categoryname", label: " Category", disableSorting: true },
  { id: "qty", label: " Qty Left", disableSorting: true },
  { id: "unit", label: " UOM", disableSorting: true },
  { id: "days", label: "Days to Deplete", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function GroceryList(props) {


  const classes = useStyles(props);
  const [records, setRecords] = useState(product);


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
                (x.name+x.categoryname )
                  .toLowerCase()
                  .includes(query.toLowerCase())
             
            );
        },
      });
    };

  const addCategory = (_data) => {
   
  };

  const updateCategory = (_data) => {
   
  };


  if (records === undefined) {
    return <Spinner />;
  }
 
  return (
    <div>
  
<Cards/>
      <div>

        <div className="row proCategoryPage">
          <div>
          
            <PageHeaderTitle title="Grocery" />
          </div>
        </div>
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
      <div style={{marginTop:"15px"}}></div>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 proCategoryTbl">
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting() &&
                recordsAfterPagingAndSorting().map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.categoryname}</TableCell>
                    <TableCell>{item.qty}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.days}</TableCell>
                   
              
  
                    <TableCell>
                      
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </TblContainer>
          {records.length>1 ?
          <TblPagination />
          :null}
        </div>
      </div>
    </div>
  );
}
