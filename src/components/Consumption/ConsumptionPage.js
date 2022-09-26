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
import ConsumeForm from "./ConsumeForm";
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
  { id: "name", label: "item" },
  { id: "categoryname", label: " CategoryName" },
  { id: "frequency", label: " Consumptionfrequency" },
  { id: "depletion_rate", label: " Avg Qty Consumption" },
  { id: "unit", label: " UOM", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];




const category=[
    {
      "id":1,
    "name":"vegMOMOS",
    "categoryname":"momos",
    "frequency":"daily",
    "depletion_rate":"0.1",
    "unit":"kg",
    "imgUrl":"https://i.imgur.com/VVuoqig.jpg",
  },
  {
    "id":2,
    "name":"pizza",
    "categoryname":"dominoss",
    "frequency":"daily",
    "depletion_rate":"0.5",
    "unit":"gram",
    "imgUrl":"https://i.imgur.com/VVuoqig.jpg",
  },
  {
    "id":3,
    "name":"fanta",
    "categoryname":"cocacola",
    "frequency":"weekly",
    "depletion_rate":"200",
    "unit":"ml",
    "imgUrl":"https://i.imgur.com/VVuoqig.jpg",
  },
]


export default function ConsumeptionPage(props) {
  const classes = useStyles(props);
  const [records, setRecords] = useState(category);
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
    //   load_consume();
    //    }, []);
    //    const load_consume = () => {
       
    //        axios.get(`${config.APP_CONFIG}/users/getall`)
    //         .then((res) => {
    //           if (res.data.status_code === 200) {
    //             setRecords(res.data.msg)
            
    //           } else if (res.data.status_code === 401) {
    //            // userSessionContext.handleLogout();
    //           } else if (res.data.status_code === 400) {
    //             toast.error(res.data.msg);
    //             setRecords([]);
    //           }
    //         })
    //         .catch((err) => {
    //           toast.error("Something Went Wrong");
    //           setRecords([]);
    //         });
    
    //    }
  const addconsume = (_data) => {
   //     axios
//     .post(`${config.APP_CONFIG}/`, _data, {
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
  const updateconsume= (_data) => {
    //     axios
//     .post(`${config.APP_CONFIG}/`, _data, {
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
const deleteconsume= (id) => {
    // setConfirmDialog({ ...confirmDialog, isOpen: false });
    // axios
    //   .delete(`${config.APP_CONFIG}/api/${id}`, {
    //     headers: { Authorization: userSessionContext.token },
    //   })
    //   .then((res) => {
    //     if (res.data.status_code === 200) {
    //       toast.success("Deleted Successfully!");
    //       load_product_category();
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
   
        <div
          className="content-wrapper iframe-mode"
          data-widget="iframe"
          data-loading-screen={750}
        >
          {isNewPopup ? (
            <Popup
              title="Add Consumption Ratio"
              openPopup={isNewPopup}
              setPopups={setIsNewPopup}
            >
              <ConsumeForm handleSubmit={addconsume} />
            </Popup>
          ) : null}

          {isEditPopup ? (
            <Popup
              title="Edit Consumption Ratio "
              openPopup={isEditPopup === false ? false : true}
              setPopups={() => {
                setIsEditPopup(false);
              }}
            >
              <ConsumeForm 
                handleSubmit={updateconsume}
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
              style={{ fontSize:"30px"}}>Consumption Summary</span>
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
                   
                      <TableCell><div className="avataricon">
<img alt={item.name} src={item.imgUrl}className="avt"/>
{item.name}
</div>
                      </TableCell>
                      <TableCell>{item.categoryname}</TableCell>
                      <TableCell>{item.frequency}</TableCell>
                      <TableCell>{item.depletion_rate}</TableCell>
                      <TableCell>{item.unit}</TableCell>

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
                                deleteconsume(item.id);
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
  );
}





