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
  { id: "name", label: "Product Name" },
  { id: "description", label: " Description" },
  { id: "categoryName", label: "Product Category" },
  { id: "unit", label: "Product Qty Unit" },
  { id: "image", label: "Image URL" },
  { id: "actions", label: "Actions", disableSorting: true },
];




const product=[
    {
      "id":1,
    "name":"vegsMOMOS",
    "description":"mitho Momos",
    "categoryName":"momos",
    "unit":"plate",
    "image":"drive"
  },
  {
    "id":2,
    "name":"pizza",
    "description":"mitho pizzass",
    "categoryName":"dominos",
    "unit":"packet",
    "image":"drive"
  },
  {
    "id":3,
    "name":"cocacola",
    "description":"mitho Coke",
    "categoryName":"Coke",
    "unit":"bottle",
    "image":"drive"
  },
  {
    "id":4,
    "name":"nachos",
    "description":"mithhjh",
    "categoryName":"crisps",
    "unit":"packet",
    "image":"drive"
  },
]


export default function ProductPage(props) {
  const classes = useStyles(props);
  const [records, setRecords] = useState(product);
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
                (x.name )
                  .toLowerCase()
                  .includes(query.toLowerCase())
             
            );
        },
      });
    };

  // useEffect(() => {
    //load_product();
  // }, []);
  const addproduct= (_data) => {
    //     axios
//     .post(`${config.APP_CONFIG}/Products/ProductCategory/api`, _data, {
//       headers: { Authorization: userSessionContext.token },
//     })
//     .then((res) => {
//       if (res.data.status_code === 200) {
//         toast.success(res.data.msg || "successfully added");
      //load_product()
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

  }
  const updateproduct= (_data) => {
    //     axios
//     .post(`${config.APP_CONFIG}/Products/ProductCategory/api`, _data, {
//       headers: { Authorization: userSessionContext.token },
//     })
//     .then((res) => {
//       if (res.data.status_code === 200) {
//         toast.success(res.data.msg || "successfully added");
           //load_product()
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
    
}
const deleteProduct= (id) => {
    // setConfirmDialog({ ...confirmDialog, isOpen: false });
    // axios
    //   .delete(`${config.APP_CONFIG}/api/${id}`, {
    //     headers: { Authorization: userSessionContext.token },
    //   })
    //   .then((res) => {
    //     if (res.data.status_code === 200) {
    //       toast.success("Deleted Successfully!");
    //      //load_product()
    //     } else if (res.data.status_code === 401) {
    //       userSessionContext.handleLogout();
    //     } else {
    //       toast.error("delete unsuccessful");
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error("Error");
    //   });
  
    
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
              title="Add Product"
              openPopup={isNewPopup}
              setPopups={setIsNewPopup}
            >
              <ProductForm handleSubmit={addproduct} />
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
                  {recordsAfterPagingAndSorting().map((item, index) => (
                    <TableRow key={item.id}>
                   
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.categoryName}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>{item.image}</TableCell>
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





