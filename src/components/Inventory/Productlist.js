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
import ProductForm from "../settings/ProductForm";
import AddIcon from "@material-ui/icons/Add";
import InventoryProductFormAdd from './InventoryProductFormAdd'


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
  { id: "inventoryName", label: "Item" },
  { id: "quantity", label: "Quantity" },
  { id: "unit", label: "Unit" },
  { id: "actions", label: "", disableSorting: true },
];





export default function Productlist(props) {
  const classes = useStyles(props);
  const [records, setRecords] = useState();
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
  }, []);

  const load_product = () => {
    axios
    .get(`${config.APP_CONFIG}inventory/getall`)
    .then((res) => {
      if (res.status === 200) {
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
  setIsNewPopup(false);
};


  const addproduct= (_data) => {
    axios
    .post(`${config.APP_CONFIG}inventory/saveall`, _data)
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
      .put(`${config.APP_CONFIG}inventory/change/${_data["id"]}`, _data)
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
        toast.error("Something Went Wrong");
        // setRecords([]);
      });
    setIsNewPopup(false);
  };
    

const deleteProduct= (id) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    axios
      .delete(`${config.APP_CONFIG}inventory/remove/${id}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Product deleted successfully!");
         //load_product()
        } else if (res.status === 401) {
          // userSessionContext.handleLogout();
        } else {
          toast.error("Product delete unsuccessful");
        }
      })
      .catch((err) => {
        toast.error("Error");
      });
  
    
}

  
  if (records === undefined) {
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
              title="Add Product Inventory"
              openPopup={isNewPopup}
              setPopups={setIsNewPopup}
            >
              <InventoryProductFormAdd handleSubmit={addproduct} />
            </Popup>
          ) : null}

          {isEditPopup ? (
            <Popup
              title="Edit Product Inventory"
              openPopup={isEditPopup === false ? false : true}
              setPopups={() => {
                setIsEditPopup(false);
              }}
            >
              <InventoryProductFormAdd 
                handleSubmit={updateproduct}
                data={records.filter((x) => x.id === isEditPopup)[0] || null}
              />
            </Popup>
          ) : null}
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
 <Paper className={classes.pageContent}>
          <div>
         
             
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
                  {recordsAfterPagingAndSorting().map((item, index) => (
                    <TableRow key={item.id}>
                   
                      <TableCell>
                        <span className="avataricon">
                          <img alt={item.inventoryName} src={item.inventoryImgUrl}className="avt"/>
                        {item.inventoryName}
                        </span>
                        
                      </TableCell>
                      
                      <TableCell>{`${item.quantity || 0} ${item.unitName} `}</TableCell>
                      
                      <TableCell>{`${item.consumptionRate|| 0} ${item.unit || "unit"}/${item.consumptionType || "day"}`}</TableCell>
                      
                      <TableCell>
                        <Controls.ActionButton
                          color="primary"
                          onClick={(e) => {
                            setIsEditPopup(item.id);
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
                                deleteProduct(item.id);
                              },
                            });
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </Controls.ActionButton> 
                      

                    
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
</Paper>
        </div>
      </div>
    </div>
  );
}





