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
  if (days < 2) {
    return {
      //background: 'rgb(145 254 159 / 47%)',
      background: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      // color: 'red',
    }
  }
  else if (days > 3 && days < 7) {
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

const test_data = [
  {
    "id": 16,
    "inventoryName": "American Corn Chips",
    "inventoryAdded": 1664899200000,
    "consumptionRate": 1.0,
    "quantity": 0,
    "inventoryImgUrl": "http://placekitten.com/g/150/150",
    "unitName": "piece",
    "consumptionType": "DAILY",
    "daysToDeplete": 0.0,
    "categoryId": 7
  },
  {
    "id": 17,
    "inventoryName": "Potato Chips",
    "inventoryAdded": 1664899200000,
    "consumptionRate": 0.0,
    "quantity": 0,
    "inventoryImgUrl": "http://placekitten.com/g/150/150",
    "unitName": "piece",
    "consumptionType": "DAILY",
    "daysToDeplete": 0.0,
    "categoryId": 8
  },
  {
    "id": 39,
    "inventoryName": "Basmati Rice",
    "inventoryAdded": 1665244800000,
    "consumptionRate": 0.0,
    "quantity": 0,
    "inventoryImgUrl": "http://placekitten.com/g/150/150",
    "unitName": "kg",
    "consumptionType": "DAILY",
    "daysToDeplete": 0.0,
    "categoryId": 7
  },
  {
    "id": 40,
    "inventoryName": "iodine",
    "inventoryAdded": 1665244800000,
    "consumptionRate": 0.0,
    "quantity": 0,
    "inventoryImgUrl": "http://placekitten.com/g/150/150",
    "unitName": "piece",
    "consumptionType": "DAILY",
    "daysToDeplete": 0.0,
    "categoryId": 7
  },
  {
    "id": 45,
    "inventoryName": "ddfd",
    "inventoryAdded": 1665244800000,
    "consumptionRate": 0.0,
    "quantity": 0,
    "inventoryImgUrl": "http://placekitten.com/g/150/150",
    "unitName": "gram",
    "consumptionType": "DAILY",
    "daysToDeplete": 0.0,
    "categoryId": 7
  },
  {
    "id": 50,
    "inventoryName": "jkl",
    "inventoryAdded": 1665331200000,
    "consumptionRate": 0.0,
    "quantity": 0,
    "inventoryImgUrl": "http://placekitten.com/g/150/150",
    "unitName": "litre",
    "consumptionType": "DAILY",
    "daysToDeplete": 0.0,
    "categoryId": 7
  },
  {
    "id": 55,
    "inventoryName": "Olive Oil",
    "inventoryAdded": 1665331200000,
    "consumptionRate": 0.0,
    "quantity": 0,
    "inventoryImgUrl": "http://placekitten.com/g/150/150",
    "unitName": "litre",
    "consumptionType": "DAILY",
    "daysToDeplete": 0.0,
    "categoryId": 7
  }
]
  
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
          console.log(res)

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
    console.log(a);
    return <span>{a[0]["quantity"]}{" "}{a[0]["unitName"]}</span>
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
              label="Search by product"
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
            <br />
            &nbsp;
           
            <span style={{ width: "800px" }}>
             
              <Select
              type="text"
              placeholder={"filter by category"}
                // defaultValue={[options[0], options[2]]}
                components={animatedComponents}
                 isMulti
                options={allCat}
                onChange={handleSelect}
                //onChange={handleSelect}
                className="select"
                isClearable={true}
                isSearchable={true}
                isDisabled={false}
                isLoading={false}
                isRtl={false}
                closeMenuOnSelect={false}
              />
            </span>
          </Toolbar>
        </Paper>

        <Paper className={classes.pageContent}>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 proCategoryTbl">
              <TblContainer>
                <TblHead />
                <TableBody>
                  {recordsAfterPagingAndSorting().map((item) => {
                    console.log(item)
                    return <TableRow key={item.id}>
                      <TableCell><div className="avataricon">
                        <img alt={item.inventoryName} src={item.inventoryImgUrl} className="avt" />
                        {item.inventoryName}<br />
                        {cat_name(item.categoryId) || 0}
                      </div>
                      </TableCell>
                      {/* <TableCell>{item.categoryName}</TableCell> */}
                      <TableCell>{item.quantity + " " + item.unitName}</TableCell>
                      <TableCell>{(getDuration(item.daysToDeplete)).value}</TableCell>



                      <TableCell align="left">
                        <span className="status" style={makeStyle(getDuration(item.daysToDeplete).value)}>{"Repeat Last Purchase -"} {check(item.id)}<span>{check_status(item.daysToDeplete)}</span>

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
