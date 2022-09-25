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
  searchInput: {
    width: '50%'
},
  newButton: {
    margin: 0,
    zIndex:4
  },
//   status: {
//     fontWeight: 'bold',
//     fontSize: '0.75rem',
//     color: 'white',
//     backgroundColor: 'grey',
//     borderRadius: 8,
//     padding: '3px 10px',
//     display: 'inline-block'
// }

}));


const makeStyle=(days)=>{
  if(days ===0)
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'red',
    }
  }
  else if(days <4)
  {
    return{
      background: '#ffadad8f',
      color: 'yellow',
    }
  }
  if(days >5)
  {
    return{
      background: '#59bfff',
      color: 'green',
    }
  }
}
const product=[
  {
    id:1,
  "name":"vegsMOMOS",
  "days":0,
  "categoryname":"momos",
  "qty":"3",
  "unit":"plate",
  "consume_rate":"2gram/day"
},
{
  id:2,
  "name":"pizza",
  "days":"4",
  "categoryname":"dominos",
  "qty":"3",
  "unit":"packet",
  "consume_rate":"2piece/week"
},
{
  id:3,
  "name":"cocacola",
  "days":"7",
  "categoryname":"Coke",
  "unit":"bottle",
  "qty":"3",
  "consume_rate":"2bootle/day"
},
{
  id:4,
  "name":"nachos",
  "days":"3",
  "categoryname":"crisps",
  "unit":"packet",
  "qty":"3",
  "consume_rate":"200gram/week"
},
]
const product_stock=[
  {
    id:1,
  "name":"vegsMOMOS",
  "description":"mitho Momos",
  "categoryname":"momos",
  qtyi:5,
  "unit":"plate",
  "last_replenished":"3",
  "left_unit":"bottle",
  "left_qty":"3",
},
{
  id:2,
  "name":"pizza",
  "description":"mitho pizzass",
  "categoryname":"dominos",
  qtyi:3,
  "unit":"packet",
  "last_replenished":"4",
  "left_unit":"bottle",
  "left_qty":"3",
},
{
  id:3,
  "name":"cocacola",
  "description":"mitho Coke",
  "categoryname":"Coke",
  "unit":"bottle",
  "qtyi":"3",
  "last_replenished":"75",
  "left_unit":"bottle",
  "left_qty":"3",
},
{
  id:4,
  "name":"nachos",
  "description":"mithhjh",
  "categoryname":"crisps",
  "unit":"packet",
  "qty":"3",
  "left_unit":"bottle",
  "left_qty":"3",
  "last_replenished":"7"
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
  const [data, setData] = useState(product_stock);

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
   //     axios
//     .post(`${config.APP_CONFIG}/Products/ProductCategory/api`, _data, {
//       headers: { Authorization: userSessionContext.token },
//     })
//     .then((res) => {
//       if (res.data.status_code === 200) {
//         toast.success(res.data.msg || "successfully added");
    
//       } else if (res.data.status_code === 401) {
//         userSessionContext.handleLogout();
//       } else if (res.data.status_code === 400) {
//         toast.error(res.data.msg);
//         setRecords([]);
//       }
//     })
//     .catch((err) => {
//       toast.error("Something Went Wrong");
//       setRecords([]);
//     });
//   setIsNewPopup(false);
// };
  };

  const updateCategory = (_data) => {
    //     axios
//     .post(`${config.APP_CONFIG}/Products/ProductCategory/api`, _data, {
//       headers: { Authorization: userSessionContext.token },
//     })
//     .then((res) => {
//       if (res.data.status_code === 200) {
//         toast.success(res.data.msg || "successfully added");
    
//       } else if (res.data.status_code === 401) {
//         userSessionContext.handleLogout();
//       } else if (res.data.status_code === 400) {
//         toast.error(res.data.msg);
//         setRecords([]);
//       }
//     })
//     .catch((err) => {
//       toast.error("Something Went Wrong");
//       setRecords([]);
//     });
//   setIsNewPopup(false);
// };
   
  };


  if (records === undefined) {
    return <Spinner />;
  }
 console.log(data)
 const check=(id)=>{
  let a={};
   a =data.filter((x)=> x.id===id)
console.log(a)
    return <div>{a[0]["qtyi"]}{a[0]["unit"]}</div>
 }
// console.log(a);
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
                   
              
  
                    <TableCell align="left">
                    <span className="status" style={makeStyle(item.days)}>{"Repeat Last Purchase -"} {check(item.id)}{"Order Now"}
                      
                      {/* {("Repeat Last Purchase -")+({data.filter((x)=> x.id===item.id).map((y,i)=>
                      {
  console.log(y);
                      return(<div key={i}>{y.qtyi}{y.unit}</div>)})})} */}
                     
     {/* <span className="status" style={makeStyle(item.days)}>{"Repeat Last Purchase - "}{data.filter((x)=> x.id===item.id).map((y,index)=>{return({y.qty} {""}{y.unit} )               
              })}
  
                    
                  </span> */}

{/* <Typography 
                    className={classes.status}
                    style={{
                        backgroundColor: 
                        ((row.status === 'Active' && 'red') ||
                        (row.status === 'Pending' && 'yellow') ||
                        (row.status === 'Blocked' && 'green'))
                    }}
                  >{row.status}</Typography> */}
</span></TableCell>
                    
                
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
