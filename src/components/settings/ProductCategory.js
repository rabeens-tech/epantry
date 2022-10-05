import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../utils/config";
import UseTable from "../home/UseTable";
import Popup from "../home/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import { Search } from "@material-ui/icons";
import { makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment,Paper,Tooltip} from "@material-ui/core";
import Controls from "../controls/Controls";

import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";
//import  PageHeaderTitle from "../home/PageHeaderTitle";
import CategoryForm from "./CategoryForm";
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
  { id: "categoryName", label: "Category Name" },
  { id: "categoryDescription", label: " Description", disableSorting: true },
  { id: "categoryImgUrl", label: "Category Image" },
  { id: "actions", label: "Actions", disableSorting: true },
];




// const category=[
//     {
//       "id":1,
//     "categoryName":"MOMOS",
//     "categoryDescription":"mitho Momos",
//     "categoryImgUrl":"http://placekitten.com/g/150/150",

//   },
//   {
//     "id":2,
//     "categoryName":"pizza",
//     "categoryDescription":"mitho pizzass",
//     "categoryImgUrl":"http://placekitten.com/g/150/150",
//   },
//   {
//     "id":3,
//     "categoryName":"Coke",
//     "categoryDescription":"mitho Coke",
//     "categoryImgUrl":"http://placekitten.com/g/150/150",
//   },
// ]


export default function ProductCategory(props) {
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
                (x.categoryName)
                  .toLowerCase()
                  .includes(query.toLowerCase())
             
            );
        },
      });
    };



  useEffect(() => {
  load_product_category();
   }, []);

   const load_product_category=() => {
    axios.get(`${config.APP_CONFIG}category/getall`)
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


   }


  const addproductcategory = (_data) => {
    // const URL='http://localhost:8080/category/save'
    //     axios.post(URL,_data)
    // // .post(`${config.APP_CONFIG}/users/save`, _data )
    // .then((res) => {
    //   if (res.status===200) {
    //     toast.success("successfully added");
    //   }
    //   else{
    //     toast.error("Something Went Wrong");
    //   }
    //   setIsNewPopup(false);
    // })
 axios.post(`${config.APP_CONFIG}category/save`, _data,)
   .then((res) => {
    // console.log(res);
     if (res.status=== 200) {
        toast.success("successfully added")
        setIsNewPopup(false);
      }
      load_product_category()
    
//       } else if (res.data.status_code === 401) {
//         userSessionContext.handleLogout();
//       } else if (res.data.status_code === 400) {
//         toast.error(res.data.msg);
//         setRecords([]);
//       }
    })
    .catch((err) => {
      toast.error("Something Went Wrong");
     // setRecords([]);
    });
 
// };
// else{
//     toast.error("Something Went Wrong");
//     }
//   })
  }
  const updateproductcategory = (_data) => {
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
    
}
const deleteProductcategory= (id) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    axios
      .delete(`${config.APP_CONFIG}category/remove/${id}`)
      
      
      .then((res) => {
        if (res.status === 200) {
          toast.success("Deleted Successfully!"); 
         load_product_category();
        } else if (res.status === 401) {
         // userSessionContext.handleLogout();
        } else {
          toast.error("Delete Unsuccessful");
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
              title="Add Category"
              openPopup={isNewPopup}
              setPopups={setIsNewPopup}
            >
              <CategoryForm handleSubmit={addproductcategory} />
            </Popup>
          ) : null}

          {isEditPopup ? (
            <Popup
              title="Edit Category"
              openPopup={isEditPopup === false ? false : true}
              setPopups={() => {
                setIsEditPopup(false);
              }}
            >
              <CategoryForm 
                handleSubmit={updateproductcategory}
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
              style={{ fontSize:"30px"}}>Product Category</span>
              </div>
             
              <div className="addButton">
                <Controls.Button
                  text="Add Category"
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
                    <TableRow key={index}>
                   
                      <TableCell>{item.categoryName}</TableCell>
                      <TableCell>{item.categoryDescription}</TableCell>
                      <TableCell>{item.categoryImgUrl}</TableCell>
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
                              title: "Are you sure to delete this Category?",
                              subTitle: "You can't undo this operation",
                              onConfirm: () => {
                                deleteProductcategory(item.categoryId);
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
              <TblPagination />
            </div>
          </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}





