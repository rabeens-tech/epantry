import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../utils/config";
import UseTable from "../home/UseTable";
import Popup from "../home/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import { Search } from "@material-ui/icons";
import { makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Tooltip} from "@material-ui/core";
import Controls from "../controls/Controls";

import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";
//import  PageHeaderTitle from "../home/PageHeaderTitle";
import CategoryForm from "./CategoryForm";
import AddIcon from "@material-ui/icons/Add";
import ProductForm from './ProductForm';
import ConfirmDialog from "../home/ConfirmDialog";
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  newButton: {
    position: "absolute",
    zIndex: 4,
    margin: 0,
    right: 0,
  },
}));

const headCells = [
  { id: "name", label: "Category Name" },
  { id: "description", label: " Description" },
  { id: "actions", label: "Actions", disableSorting: true },
];




const product=[
    {
      "id":1,
    "name":"vegsMOMOS",
    "description":"mitho Momos",
    "categoryname":"momos",
    "unit":"plate",
    "image":"drive"
  },
  {
    "id":2,
    "name":"pizza",
    "description":"mitho pizzass",
    "categoryname":"dominos",
    "unit":"packet",
    "image":"drive"
  },
  {
    "id":3,
    "name":"cocacola",
    "description":"mitho Coke",
    "categoryname":"Coke",
    "unit":"bottle",
    "image":"drive"
  },
  {
    "id":4,
    "name":"nachos",
    "description":"mithhjh",
    "categoryname":"crisps",
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
  
  // }, []);
  const addproduct= (_data) => {

  }
  const updateproduct= (_data) => {
    
}
const deleteProduct= (_data) => {
    
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
              title="Unit MeasureMent Form"
              openPopup={isNewPopup}
              setPopups={setIsNewPopup}
            >
              <ProductForm handleSubmit={addproduct} />
            </Popup>
          ) : null}

          {isEditPopup ? (
            <Popup
              title="Edit Unit Form"
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

          <div>
            <div>
              <div>            
              <span
              style={{ fontSize:"30px"}}>Product</span>
              </div>
             
              <div className="addButton">
                <Controls.Button
                  text="Add New"
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
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
              <TblContainer>
                <TblHead />
                <TableBody>
                  {recordsAfterPagingAndSorting().map((item, index) => (
                    <TableRow key={item.id}>
                   
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.description}</TableCell>

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
                              title: "Are you sure to delete this record?",
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
              <TblPagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





