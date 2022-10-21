import React, { useState, useEffect } from "react";
import axios from "axios";

import config from "../../utils/config";
import UseTable from "../home/UseTable";
import Popup from "../home/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Search } from "@material-ui/icons";
import { makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Tooltip, Paper } from "@material-ui/core";
import Controls from "../controls/Controls";

import AddIcon from "@material-ui/icons/Add";
import Cards from "../cards/Cards";

import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";
import ConfirmDialog from "../home/ConfirmDialog";

import PageHeaderTitle from "../../utils/PageHeaderTitle";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  searchInput: {
    width: '30%'
  },
  searchMultiInput: {
    width: '50%'
  },
  newButton: {
    margin: 0,
    zIndex: 4
  },

}));


const makeStyle = (days) => {
  if (days <= 3) {
    return {
      //background: 'rgb(145 254 159 / 47%)',
      background: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      // color: 'red',
    }
  }
  else if (days > 3 && days <= 7) {
    return {
      background: '#ffadad8f',
      // backGround: "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      // color: 'yellow',
    }
  }
  if (days > 7) {
    return {
      background: '#bb67ff',
      // backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      //color: 'green',
    }
  }
}


  
const headCells = [
  { id: "inventoryName", label: "Item" },
  // { id: "categoryName", label: " Category", disableSorting: true },
  { id: "qty", label: " Qty Left", disableSorting: true },
  // { id: "unit", label: " UOM", disableSorting: true },
  { id: "daysToDeplete", label: "Days to Deplete", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function GroceryList(props) {


  const classes = useStyles(props);
  const [records, setRecords] = useState();
  const [selectedOptions, setSelectedOptions] = useState();
  const [data, setData] = useState();
  const [allCat, setAllCat] = useState();

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const cat_name = (cat_id) => {
    let curr_cat = allCat.filter(x => (x["value"] === cat_id))

    //let curr_cat_id = 0
    if (curr_cat.length !== 0) {
      return curr_cat[0]["label"]
      //curr_cat_id = 
    }
  }
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = UseTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let query = e.target.value;

    setFilterFn({
      fn: (items) => {
        if (query === "") return items;
        else {

          return items.filter(
            (x) =>
              (x.name + x.inventoryName)
                .toLowerCase()
                .includes(query.toLowerCase())

          );
        }
      },
    });
  };
  const handleSelect = (e) => {

    let query_value = e[0]["value"];

    setFilterFn({
      fn: (items) => { return items.filter((x) => (x.categoryId == query_value )) }
    });
  };

  React.useEffect(() => {
    load_summary()
    load_products()
    load_categories()
  }, [])
  const load_categories = () => {
    axios
      .get(`${config.APP_CONFIG}category/getall`)
      .then((res) => {
        if (res.status === 200) {
          let _res = res.data.map((x, i) => {
            return {
              value: x["categoryId"],
              label: x["categoryName"]
            }
          })
          setAllCat(_res)
        } else if (res.status === 401) {
          // userSessionContext.handleLogout();
        } else if (res.status === 400) {
          toast.error(res.data || "Cannot load categories");
          setAllCat([]);
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
        setAllCat([]);
      });
  }
  const load_products = () => {
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


  const load_summary = () => {
    axios
      .get(`${config.APP_CONFIG}inventory/invsummary`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res)

          setData(res.data)
          // toast.success(res.data || "successfully added");

        } else if (res.status === 401) {
          // userSessionContext.handleLogout();
        } else if (res.status === 400) {
          toast.error(res.data || "error loading data");
          setData([]);
        }
      })
      .catch((err) => {
        console.log(err)
        toast.error("Something Went Wrong");
        setData([]);
      });
  }


  if (records === undefined) {
    return <Spinner msg="records..."/>;
  }

  if (data === undefined) {
    return <Spinner msg="data..."/>;
  }
  // console.log(data)

  function getDuration(milli) {
    let minutes = Math.floor(milli / 60000);
    let hours = Math.round(minutes / 60);
    let days = Math.round(hours / 24);

    return (
      (days && { value: days, unit: 'days' }) ||
      (hours && { value: hours, unit: 'hours' }) ||
      { value: minutes, unit: 'minutes' }
    )

    //console.log(tDuration.value + ': ' + tDuration.unit);
  };
  const check = (id) => {
    let a = {};

    a = records.filter((x) => x.id === id)
    // console.log(a);
    return <span>{a[0]["remainingStock"]}{" "}{a[0]["unitName"]}</span>
  }

  const check_status = (days) => {

    if (days < 3) {
      return <span>{"Order Now"}</span>
    }

    if (days > 3 && days < 7) {
      return <span>{"Order Soon"}</span>
    }
    if (days > 7) {
      return <span>{"Order Later"}</span>
    }
  }
  if (allCat === undefined) {
    return <Spinner />;
  }
  return (
    <div>

      <Cards data={data} />
      <div>

        <Paper className={classes.pageContent}>

          <div className="row proCategoryPage">


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
   </Paper>
    
  <Paper className={classes.pageContent}>
        <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 proCategoryTbl">
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((item) => {
                // let lastReplishment = item.purchase.reduce( (x,y) =>(x["inventoryAdded"] < y["inventoryAdded"]))
                return <TableRow key={item.id}>
                  <TableCell>
                      <div className="avataricon">
                      <img alt={item.inventoryName} src={item.inventoryImgUrl} className="avt"/>
                      {item.inventoryName}
                      </div>
                    </TableCell>
                    {/* <TableCell>{item.categoryName}</TableCell> */}
                    <TableCell>
                      {item.remainingStock + " " + item.unitName}
                    </TableCell>
                    <TableCell>
                      { 
                        item.remainingDaysToDeplete  || 0
                      }
                      {" days"}
                    </TableCell>              
  
                   <TableCell align="left">
                    <span 
                      className="status" 
                      style={makeStyle(item.remainingDaysToDeplete)}
                    >
                      {
                        // "Repeat Last Purchase -"
                      } 
                      {
                        //check(item.id)
                      }
                        <span>
                          {check_status(item.remainingDaysToDeplete)}
                        </span>
                     
                      

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
                  })}
                </TableBody>
              </TblContainer>
              {records.length > 1 ?
                <TblPagination />
                : null}
            </div>
          </div>
        </Paper>

      </div>
    </div>
  );
}
