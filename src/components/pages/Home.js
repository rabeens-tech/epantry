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
import InventoryCategoryForm from "../Inventory/InventoryCategoryForm";
import AddIcon from "@material-ui/icons/Add";
//import UserSessionContext from "../../contexts/UserSessionContext";
// import ConfirmDialog from "../../components/ConfirmDialog";
import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";
import ConfirmDialog from "../home/ConfirmDialog";
//import UserAuthenticationContext from "../../contexts/UserAuthenticationContext";
import PageHeaderTitle from "../../utils/PageHeaderTitle";
//import ProductForm from "../settings/ProductForm";
import InventoryForm from "./InventoryForm";
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  searchInput: {
    width: '50%'
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
  "categoryName":"momos",
  "qty":"3",
  "unit":"plate",
  "consume_rate":"2gram/day",
  "imgUrl":"https://i.imgur.com/VVuoqig.jpg",
},
{
  "id":2,
  "name":"pizza",
  "description":"mitho pizzass",
  "categoryName":"dominos",
  "qty":"3",
  "unit":"packet",
  "consume_rate":"2piece/week",
  "imgUrl":"https://i.imgur.com/VVuoqig.jpg",
},
{
  "id":3,
  "name":"cocacola",
  "description":"mitho Coke",
  "categoryName":"Coke",
  "unit":"bottle",
  "qty":"3",
  "consume_rate":"2bootle/day",
  "imgUrl":"https://i.imgur.com/VVuoqig.jpg",
},
{
  "id":4,
  "name":"nachos",
  "description":"mithhjh",
  "categoryName":"crisps",
  "unit":"packet",
  "qty":"3",
  "consume_rate":"200gram/week",
  "imgUrl":"https://i.imgur.com/VVuoqig.jpg",
},
]

const headCells = [
//   { id: "item", label: "Item" },
//   { id: "description", label: " Description", disableSorting: true },
//   { id: "categoryname", label: "categoryname", disableSorting: true },
//   { id: "qty", label: "quantity"},
//   { id: "unit", label: "Description", disableSorting: true },
//   { id: "image", label: "image", disableSorting: true },
//   { id: "actions", label: "Actions", disableSorting: true },
// ];
{ id: "name", label: "Item" },

{ id: "categoryName", label: "Category", disableSorting: true },
{ id: "quantity", label: "Quantity"},
{ id: "unitName", label: "UOM", disableSorting: true },
{ id: "consume_rate", label: "Consumption Rate", disableSorting: true },
{ id: "actions", label: "Actions", disableSorting: true },
];
export default function Home(props) {
 // const userSessionContext = React.useContext(UserSessionContext);

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
                (x.name+x.categoryname )
                  .toLowerCase()
                  .includes(query.toLowerCase())
             
            );
        },
      });
    };

      // useEffect(() => {
    //load_inventory();
  // }, []);
  const addinventory = (_data) => {
//     axios
//     .post(`${config.APP_CONFIG}/inventory/save`, _data, {
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
   
  };

  const updateinventory = (_data) => {
//     axios
//     .put(`${config.APP_CONFIG}/inventory/change/${_data.id}`,  {
//       headers: { Authorization: userSessionContext.token },
//     })
//     .then((res) => {
//       if (res.data.status_code === 200) {
//         toast.success(res.data.msg || "successfully added");
//         load_inventory();
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
   
  };

  const deleteproductcategory = (id) => {
    // setConfirmDialog({ ...confirmDialog, isOpen: false });
    // axios
    //   .delete(`${config.APP_CONFIG}/api/${id}`, {
    //     headers: { Authorization: userSessionContext.token },
    //   })
    //   .then((res) => {
    //     if (res.data.status_code === 200) {
    //       toast.success("Deleted Successfully!");
    //       load_inventory();
    //     } else if (res.data.status_code === 401) {
    //       userSessionContext.handleLogout();
    //     } else {
    //       toast.error("delete unsuccessful");
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error("Error");
    //   });
  
  };

  if (records === undefined) {
    return <Spinner />;
  }
 
  return (
    <div>
      {isNewPopup ? (
        <Popup
          title="Add Inventory "
          openPopup={isNewPopup}
          setPopups={setIsNewPopup}
        >
          <InventoryForm  handleSubmit={addinventory} />
        </Popup>
      ) : null}

      {isEditPopup ? (
        <Popup
          title="Edit Inventory"
          openPopup={isEditPopup === false ? false : true}
          setPopups={() => {
            setIsEditPopup(false);
          }}
        >
          <InventoryCategoryForm
            handleSubmit={updateinventory}
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
        <div className="row proCategoryPage">
          <div>
          
            <PageHeaderTitle title="InventoryList" />
          </div>
    
            <div className="addButton">
              <Controls.Button
                text="Add Inventory"
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
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 proCategoryTbl">
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting() &&
                recordsAfterPagingAndSorting().map((item) => (
                  <TableRow key={item.id}>
                                         <TableCell><div className="avataricon">
<img alt={item.name} src={item.imgUrl}className="avt"/>
{item.name}
</div>
                      </TableCell>
          
                    <TableCell>{item.categoryName}</TableCell>
                    <TableCell>{item.qty}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.consume_rate}</TableCell>
                   
              
  
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
                            title: "Are you sure to delete item?",
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              deleteproductcategory(item.id);
                            },
                          });
                        }}
                      ><Tooltip title="Delete">
                        <CloseIcon fontSize="small" /></Tooltip>
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
  );
}
