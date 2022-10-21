import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../utils/config";
import UseTable from "../home/UseTable";
import Popup from "../home/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import { Search } from "@material-ui/icons";
import { makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Tooltip,Paper} from "@material-ui/core";
import Controls from "../controls/Controls";

import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";
//import  PageHeaderTitle from "../home/PageHeaderTitle";
import ProductForm from "./ProductForm";
import AddIcon from "@material-ui/icons/Add";
import units from '../../utils/units'


import ConfirmDialog from "../home/ConfirmDialog";
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  searchInput: {
    width: '50%'
},
  newButton: {
    position: "absolute",
    zIndex: 4,
    margin: 0,
    right: 0,
  },
}));

const headCells = [
  { id: "inventoryName", label: "Product Name" },

  { id: "unit", label: "Product Qty Unit" },
  { id: "image", label: "Image URL" },
  { id: "actions", label: "Actions", disableSorting: true },
];



export default function ProductPage(props) {
  const classes = useStyles(props);
  const [records, setRecords] = useState();
  const [allCat, setAllCat] = useState();

  const [isNewPopup, setIsNewPopup] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);
  
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
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
                (x.inventoryName )
                  .toLowerCase()
                  .includes(query.toLowerCase())
             
            );
        },
      });
    };

  useEffect(() => {
    load_product();
    load_categories()
  }, []);

  const load_product = () =>{
    axios
    .get(`${config.APP_CONFIG}inventory/getall`)
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data)
        setRecords(res.data)    
      } else if (res.status === 401) {
        // userSessionContext.handleLogout();
      } else if (res.status === 400) {
        toast.error(res.data);
        setRecords([]);
      }
    })
    .catch((err) => {
      toast.error("Something Went Wrong");
      setRecords([]);
    });
 }

  const load_categories = () =>{
    axios
    .get(`${config.APP_CONFIG}category/getall`)
    .then((res) => {
      if (res.status === 200) {
        let _res= res.data.map((x,i)=>{
          return {
            id:x["categoryId"],
            title:x["categoryName"]
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

 const addproduct= (_data) => {
  axios
  .post(`${config.APP_CONFIG}inventory/saveincategory`, _data)
  .then((res) => {
    if (res.status === 200) {
      toast.success(res.data || "successfully added");
    load_product()
    } else if (res.status === 401) {
      // userSessionContext.handleLogout();
    } else if (res.status === 400) {
      toast.error(res.data);
      // setRecords([]);
    }
  })
  .catch((err) => {
    toast.error("Something went wrong while adding product");
    // setRecords([]);
  });
setIsNewPopup(false);
};

const updateproduct= (_data) => {
  // console.log(_data)
  axios
    .put(`${config.APP_CONFIG}inventory/change/${_data["inventoryId"]}`, _data)
    .then((res) => {
      if (res.status === 200) {
        toast.success(res.data || "successfully added");
           load_product()
           setIsEditPopup(false);
      } else if (res.status === 401) {
        // userSessionContext.handleLogout();
      } else if (res.status === 400) {
        toast.error(res.data);
        // setRecords([]);
      }
    })
    .catch((err) => {
      toast.error("Something Went Wrong");
      // setRecords([]);
    });
  
};
  

const deleteProduct= (id) => {
     setConfirmDialog({ ...confirmDialog, isOpen: false });
    axios
      .delete(`${config.APP_CONFIG}inventory/remove/${id}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Deleted Successfully!");
         load_product()
        } else if (res.status === 401) {
          // userSessionContext.handleLogout();
        } else {
          toast.error("delete unsuccessful");
        }
      })
      .catch((err) => {
        toast.error("Error");
      });
  
    
}

  
  if (records === undefined || allCat === undefined) {
    return <Spinner />;
  }


  

  return (
    <div>
      <div className="">
        <div
          className="content-wrapper iframe-mode"
          data-widget="iframe"
          data-loading-screen={750}
        >
          {isNewPopup ? (
            <Popup
              title="Add Product"
              openPopup={isNewPopup}
              setPopups={setIsNewPopup}
            >
              <ProductForm 
                categories = {allCat}
                handleSubmit={e=>{
                 addproduct(e) 
                }} 
              />
            </Popup>
          ) : null}

          {isEditPopup ? (
            <Popup
              title="Edit Product"
              openPopup={isEditPopup === false ? false : true}
              setPopups={() => {
                setIsEditPopup(false);
              }}
            >
              <ProductForm 
                categories = {allCat}
                handleSubmit={updateproduct}
                data={records.filter((x) => x.inventoryId === isEditPopup)[0] || null}
              />
            </Popup>
          ) : null}
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
 <Paper className={classes.pageContent}>
          <div>
         
            <div>
              <div>            
              <span
              style={{ fontSize:"30px"}}>Product</span>
              </div>
             
              <div className="addButton">
                <Controls.Button
                  text="Add Product"
                  variant="outlined"
                  startIcon={<AddIcon />}
                  className={classes.newButton}
                  onClick={() => {
                    setIsNewPopup(!isNewPopup);
                  }}
                />
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
        </Paper>
        <Paper className={classes.pageContent}>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
              <TblContainer>
                <TblHead />
                <TableBody>
                  {recordsAfterPagingAndSorting().map((item, index) => {
                    // console.log(item)
                    let curr_cat = allCat.filter(x=>(x["id"] === item.categoryId))
                    let curr_cat_id = 0
                    if(curr_cat.length!==0){
                      curr_cat_id = curr_cat[0]["title"] 
                    }
                    return <TableRow key={index}>
                   
                      <TableCell> <span className="avataricon">
                          <img alt={item.inventoryName} src={item.inventoryImgUrl}className="avt"/>
                        {item.inventoryName}<br/>
                         {curr_cat_id}
                      
                        </span>
                        </TableCell>
                      <TableCell>{curr_cat_id}</TableCell>
                      <TableCell>{`${item.remainingStock || 0} ${item.unitName} `}</TableCell>
                      <TableCell>{ (item.inventoryImgUrl&&item.inventoryImgUrl.substr(0,20) ) || ""}</TableCell>

                      <TableCell>
                        <Controls.ActionButton
                          color="primary"
                          onClick={(e) => {
                            // alert("edit")
                            setIsEditPopup(item.inventoryId);
                          }}
                        ><Tooltip title="Edit">
                          <EditOutlinedIcon fontSize="small" /></Tooltip>
                        </Controls.ActionButton>
                       
                      
                         <Controls.ActionButton
                          color="secondary"
                          onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: "Are you sure to delete this Product?",
                              subTitle: "You can't undo this operation",
                              onConfirm: () => {
                                deleteProduct(item.inventoryId);
                              },
                            });
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </Controls.ActionButton> 
                    
                      </TableCell>
                    </TableRow>
                  })}
                </TableBody>
              </TblContainer>
              {records.length>1 ?
          <TblPagination />
          :null}
            </div>
          </div>
</Paper>
        </div>
      </div>
    </div>
  );
}





