import React, { useState, useEffect } from "react";
import axios from "axios";

import config from "../../utils/config";
import UseTable from "../home/UseTable";
import Popup from "../home/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles, TableBody, TableRow, TableCell, Tooltip } from "@material-ui/core";
import Controls from "../controls/Controls";
import InventoryCategoryForm from "./InventoryCategoryForm";
import AddIcon from "@material-ui/icons/Add";
import UserSessionContext from "../../contexts/UserSessionContext";
// import ConfirmDialog from "../../components/ConfirmDialog";
import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";
import ConfirmDialog from "../home/ConfirmDialog";
import UserAuthenticationContext from "../../contexts/UserAuthenticationContext";
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
const product=[
  {
    "id":1,
  "name":"vegsMOMOS",
  "description":"mitho Momos",
  "categoryname":"momos",
  "qty":"3",
  "unit":"plate",
  "image":"drive"
},
{
  "id":2,
  "name":"pizza",
  "description":"mitho pizzass",
  "categoryname":"dominos",
  "qty":"3",
  "unit":"packet",
  "image":"drive"
},
{
  "id":3,
  "name":"cocacola",
  "description":"mitho Coke",
  "categoryname":"Coke",
  "unit":"bottle",
  "qty":"3",
  "image":"drive"
},
{
  "id":4,
  "name":"nachos",
  "description":"mithhjh",
  "categoryname":"crisps",
  "unit":"packet",
  "qty":"3",
  "image":"drive"
},
]

const headCells = [
  { id: "item", label: "Item" },
  { id: "description", label: " Description", disableSorting: true },
  { id: "categoryname", label: "categoryname", disableSorting: true },
  { id: "qty", label: "quantity"},
  { id: "unit", label: "Description", disableSorting: true },
  { id: "image", label: "image", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function InventoryList(props) {
  const userSessionContext = React.useContext(UserSessionContext);

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
      {isNewPopup ? (
        <Popup
          title="Category Form"
          openPopup={isNewPopup}
          setPopups={setIsNewPopup}
        >
          <InventoryCategoryForm handleSubmit={addCategory} />
        </Popup>
      ) : null}

      {isEditPopup ? (
        <Popup
          title="Product Category"
          openPopup={isEditPopup === false ? false : true}
          setPopups={() => {
            setIsEditPopup(false);
          }}
        >
          <InventoryCategoryForm
            handleSubmit={updateCategory}
            data={records.filter((x) => x.id === isEditPopup)[0] || null}
          />
        </Popup>
      ) : null}
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />

      <div>
        <div className="row proCategoryPage">
          <div>
          
            <PageHeaderTitle title="Inventory Categories" />
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
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.categoryname}</TableCell>
                    <TableCell>{item.qty}</TableCell>
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
                    
                      {/* <Controls.ActionButton
                        color="secondary"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: "Are you sure to delete this record?",
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              deleteproductcategory(item.id);
                            },
                          });
                        }}
                      ><Tooltip title="Delete">
                        <CloseIcon fontSize="small" /></Tooltip>
                      </Controls.ActionButton> */}
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
