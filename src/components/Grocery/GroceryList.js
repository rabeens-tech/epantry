import React, { useState, useEffect } from "react";
import axios from "axios";

import config from "../../utils/config";
import UseTable from "../home/UseTable";
import Popup from "../home/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles, TableBody, TableRow, TableCell, Tooltip } from "@material-ui/core";
import Controls from "../controls/Controls";

import AddIcon from "@material-ui/icons/Add";


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

const headCells = [
  { id: "item", label: "Item" },
  { id: "qty", label: " Qty Left", disableSorting: true },
  { id: "days", label: "Days to Deplete", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function GroceryList(props) {


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



  const addCategory = (_data) => {
   
  };

  const updateCategory = (_data) => {
   
  };

  const deleteproductcategory = (id) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
  
  };

  if (records === undefined) {
    return <Spinner />;
  }
 
  return (
    <div>
      {/* {isNewPopup ? (
        <Popup
          title="Category Form"
          openPopup={isNewPopup}
          setPopups={setIsNewPopup}
        >
          <InventoryCategoryForm handleSubmit={addCategory} />
        </Popup>
      ) : null}

     
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      /> */}

      <div>
        <div className="row proCategoryPage">
          <div>
          
            <PageHeaderTitle title="Grocery" />
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
                    <TableCell>{item.stock_quantity}</TableCell>
                    <TableCell>{item.parentName}</TableCell>
                   
              
  
                    <TableCell>
                   
                      <Controls.ActionButton
                        color="primary"
                        onClick={(e) => {
                          setIsEditPopup(item.id);
                        }}
                      ><Tooltip title="Edit">
                        <EditOutlinedIcon fontSize="small" /></Tooltip>
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
    </div>
  );
}
