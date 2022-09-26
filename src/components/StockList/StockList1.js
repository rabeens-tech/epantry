import React, { useState, useEffect } from "react";
import UseTable from "../home/UseTable";
import Popup from "../home/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

import { Search } from "@material-ui/icons";
import { makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Tooltip} from "@material-ui/core";
import Controls from "../controls/Controls";

import AddIcon from "@material-ui/icons/Add";

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
const product=[
  {
    "id":1,
  "name":"vegsMOMOS",
  "description":"mitho Momos",
  "categoryname":"momos",
  "qty":"3",
  "unit":"plate",
  "last_replenished":"3",
  "left_unit":"bottle",
  "left_qty":"3",
  "imgUrl":"https://i.imgur.com/VVuoqig.jpg",
},
{
  "id":2,
  "name":"pizza",
  "description":"mitho pizzass",
  "categoryname":"dominos",
  "qty":"3",
  "unit":"packet",
  "last_replenished":"4",
  "left_unit":"bottle",
  "left_qty":"3",
  "imgUrl":"https://i.imgur.com/VVuoqig.jpg",
},
{
  "id":3,
  "name":"cocacola",
  "description":"mitho Coke",
  "categoryname":"Coke",
  "unit":"bottle",
  "qty":"3",
  "last_replenished":"75",
  "left_unit":"bottle",
  "left_qty":"3",
  "imgUrl":"https://i.imgur.com/VVuoqig.jpg",
},
{
  "id":4,
  "name":"nachos",
  "description":"mithhjh",
  "categoryname":"crisps",
  "unit":"packet",
  "qty":"3",
  "left_unit":"bottle",
  "left_qty":"3",
  "last_replenished":"7",
  "imgUrl":"https://i.imgur.com/VVuoqig.jpg",
},
]
 
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
                (x.name +x.categoryname)
                  .toLowerCase()
                  .includes(query.toLowerCase())
             
            );
        },
      });
    };





  return (
    <div>
  <div>
  {/* <CardsStock/>  */}
  <NewCard/>
  </div>

  <div>
          
          <PageHeaderTitle title="Grocery" />
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
{item.name}
</div>
                      </TableCell>
                      <TableCell>{item.categoryname}</TableCell>
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
      </div>
  );
}

