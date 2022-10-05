import React, { useState, useEffect } from "react";
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import axios from "axios";
import config from "../../utils/config";
import UseTable from "../home/UseTable";
import Popup from "../home/Popup";

import CloseIcon from "@material-ui/icons/Close";
import { Search } from "@material-ui/icons";
import { makeStyles, TableBody, TableRow, TableCell, Toolbar, Paper,InputAdornment, Table,Tooltip,Typography,Grid} from "@material-ui/core";
import Controls from "../controls/Controls";
import CardHeader from '@mui/material/CardHeader';
import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";

import UserForm from "./UserForm";
import AddIcon from "@material-ui/icons/Add";
import ConfirmDialog from "../home/ConfirmDialog";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';

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
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light)
},
table: {
  minWidth: 640
},

}));

const headCells = [
  { id: "username", label: "UserName" },
  { id: "userEmail", label: "Email" },
  { id: "is_admin", label: "Admin", disableSorting: true },

  { id: "active", label: " Active " ,disableSorting: true },

  { id: "actions", label: "Actions", disableSorting: true },
];




// const users=[
//     {
//       "id":1,
//     "username":"suraj",
//     "userEmail":"surajgmail.com",
//     "is_admin":"1",
//     "active":"0",
    
//   },
//   {
//     "id":2,
//     "username":"pizza",
//     "userEmail":"mithopizzass@gmail.com",
//     "is_admin":"1",
//     "active":"1",
    
//   },
//   {
//     "id":3,
//     "username":"Coke",
//     "userEmail":"mithoCoke@gmail.com",
//     "is_admin":"0",
//     "active":"0",
    
//   },
//   {
//     "id":4,
//   "username":"suraj",
//   "userEmail":"surajgmail.com",
//   "is_admin":"1",
//   "active":"0",
  
// },
// {
//   "id":5,
//   "username":"pizza",
//   "userEmail":"mithopizzass@gmail.com",
//   "is_admin":"1",
//   "active":"1",
  
// },
// {
//   "id":6,
//   "username":"Coke",
//   "userEmail":"mithoCoke@gmail.com",
//   "is_admin":"0",
//   "active":"0",
  
// },
// ]


export default function User(props) {
  const classes = useStyles(props);
  const [records, setRecords] = useState();
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
                (x.userName)
                  .toLowerCase()
                  .includes(query.toLowerCase())
             
            );
        },
      });
    };



   useEffect(() => {
    // console.log(config)
  load_user();
   }, []);
   const load_user = () => {
   
       axios(`${config.APP_CONFIG}users/getall`)
        .then((res) => {
          console.log(res)
          console.log(res.data)
          if (res.status === 200) {
            setRecords(res.data)
          } else if (res.status === 401) {
            // userSessionContext.handleLogout();
          } else if (res.status === 400) {
            toast.error(res.data.msg);
            setRecords([]);
          }
        })
        .catch((err) => {
          console.log(err)
          toast.error("Something Went Wrong");
          setRecords([]);
        });

   }

  const adduser = (_data) => {
    // const URL='http://localhost:8080/users/save'
    //     axios.post(URL,_data)
    axios.post(`${config.APP_CONFIG}users/save`, _data )
    .then((res) => {
      if (res.status===200) {
        toast.success("successfully added");
           setIsNewPopup(false);
      }
   
      setIsNewPopup(false);
      load_user()
    })
    .catch((err) => {
      toast.error("Something Went Wrong");
     setRecords([]);
     });
  
};

  
const  deleteuser = (id) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    axios.delete(`${config.APP_CONFIG}users/remove/${id}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Deleted Successfully!");
         load_user();
        } else if (res.data.status_code === 401) {
          // .handluserSessionContexteLogout();
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

<Paper className={classes.pageContent}>
            <div>
              <div>            
              <span
              style={{ fontSize:"30px"}}>Users</span>
              </div>
             
              <div className="addButton">
                <Controls.Button
                  text="Add user"
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
              <Table className={classes.table}>
              <TblContainer>
                <TblHead />
                <TableBody>
                  {recordsAfterPagingAndSorting().map((item, index) => (
                    <TableRow key={item.id}>

                      <TableCell>
                        <div className="avataricon">
                        <Avatar alt={item.username} src='.' className="avt"/>
                        {item.userName}
                        </div>
                      {/* <CardHeader
                      avatar={
                          <Avatar alt={item.username} src='.' className={classes.avatar}/>}
                       title= {item.userName}
                   />
                   */}
                 
                 
                      </TableCell>
                      <TableCell>{item.userEmail}</TableCell>
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
              </Table>
              {records.length>1 ?
          <TblPagination />
          :null}
            </div>
          </div>
          </Paper>
        </div>
      </div>

  );
}



