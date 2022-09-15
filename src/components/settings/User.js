import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../utils/config";
import UseTable from "../home/UseTable";
import Popup from "../home/Popup";

import CloseIcon from "@material-ui/icons/Close";
import { Search } from "@material-ui/icons";
import { makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Tooltip} from "@material-ui/core";
import Controls from "../controls/Controls";

import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";

import UserForm from "./CategoryForm";
import AddIcon from "@material-ui/icons/Add";

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
  { id: "username", label: "UserName" },
  { id: "password", label: " Password" },
  { id: "is_admin", label: " Is Admin" },
  { id: "active", label: " Active " },
  { id: "actions", label: "Actions", disableSorting: true },
];




const users=[
    {
      "id":1,
    "username":"MOMOS",
    "password":"mitho Momos",
    "is_admin":"1",
    "active":"0",
    
  },
  {
    "id":2,
    "username":"pizza",
    "password":"mitho pizzass",
    "is_admin":"1",
    "active":"1",
    
  },
  {
    "id":3,
    "username":"Coke",
    "password":"mitho Coke",
    "is_admin":"0",
    "active":"0",
    
  },
]


export default function User(props) {
  const classes = useStyles(props);
  const [records, setRecords] = useState(users);
  const [isNewPopup, setIsNewPopup] = useState(false);

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
  const adduser = (_data) => {

  }
const deleteuser= (_data) => {
    
}

  
  if (records === undefined) {
    return <Spinner />;
  }

  

  return (
    <div>
   
        <div
          className="content-wrapper iframe-mode"
          data-widget="iframe"
          data-loading-screen={750}
        >
          {isNewPopup ? (
            <Popup
              title=" User Form"
              openPopup={isNewPopup}
              setPopups={setIsNewPopup}
            >
              <UserForm handleSubmit={adduser} />
            </Popup>
          ) : null}

       
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />

         
            <div>
              <div>            
              <span
              style={{ fontSize:"30px"}}>Users</span>
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
                   
                      <TableCell>{item.username}</TableCell>
                      <TableCell>{item.password}</TableCell>
                      <TableCell>{item.is_admin===1?"Yes":"No"}</TableCell>
                      <TableCell>{item.active===1?"Yes":"No"}</TableCell>
                      <TableCell>
                  
                      
                         <Controls.ActionButton
                          color="secondary"
                          onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: "Are you sure Want to Delete?",
                              subTitle: "You can't undo this operation",
                              onConfirm: () => {
                                deleteuser(item.id);
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

  );
}



