import React from "react";
import { Link } from "react-router-dom";

import UserSessionContext from "../../contexts/UserSessionContext";
import config from "../../utils/config";
import Select from "react-select";
import MenuIcon from "@material-ui/icons/Menu";
// import {MUI} from '@material-ui/core'
import CompanyContext from "../../contexts/CompanyContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import {
  faCalculator,
  faCog,
  faFileInvoiceDollar,
  faAddressBook,
  faCopy,
  faSignOutAlt,
  faHome,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare } from '@fortawesome/free-solid-svg-icons';

// import Button from '@mui/material/Button';
// import Box from "@material-ui/core/Box";
import axios from "axios"; //
import { toast } from "react-toastify";

//accordion
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

//import UserAuthenticationContext from '../../contexts/UserAuthenticationContext';
import routes from "../../utils/routes"
const TopLevelNavItems = [
  { name: "INVENTORY",icon: <FontAwesomeIcon icon={ faFileInvoiceDollar} size="lg" />},
 
  { name: "GROCERY", icon: <FontAwesomeIcon icon={ faAddressBook} size="lg" /> },
  { name: "STOCK", icon: <FontAwesomeIcon icon={faCopy} size="lg" /> },
  { name: "CONSUMPTION", icon: <FontAwesomeIcon icon={faChartLine} size="lg" /> },
  { name: "SETTINGS", icon: <FontAwesomeIcon icon={faCog} size="lg" /> },
];

const max_width = "250px";
const Sidebar = () => {

  const [menuWidth, setMenuWidth] = React.useState("50px");
 // const userSessionContext = React.useContext(UserSessionContext);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (index) => (event, isExpanded) => {
    setExpanded(isExpanded ? index : false);
  };
console.log(routes)

  return (
    <aside
      style={{
        borderRightWidth: "1px",
        borderRightColor: config.THEME_COLOR,
        display: "flex",
        flexDirection: "column",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        transition: "0.3s",
        background: config.THEME_COLOR,
        width: menuWidth,
        flex: 1,
        background: config.THEME_COLOR,
        //position: "fixed",
        position: "sticky",
        zIndex: "999",
        overflowY: "auto",
      }}
      className="main-sidebar sidebar-dark-primary elevation-4 "
    >
      <div
        style={{
          cursor: "pointer",
        }}
        onClick={(e) => {
          setMenuWidth(menuWidth === max_width ? "50px" : max_width);
        }}
      >
        {menuWidth === max_width ? (
          <Link to="">
            <Typography
              color="white"
              margin="20px"
              display="inline-block"
              float="left"
            >
              E-Pantary
            </Typography>
          </Link>
        ) : null}

        <MenuIcon
          style={{
            color: "#fff",
            margin: "20px",
            float: "right",
          }}
          fontSize="small"
        />
      </div>

      <div className="sidebar" style={{ textAlign: "center" }}>
        <div>
          {menuWidth === max_width ? 
          null
           : (
           <FontAwesomeIcon
              margin="20px"
              color="white"
              icon={faHome}
              size="lg"
              title=""
            />
          )}
        </div>
        {TopLevelNavItems.map((nav, index) => {
          return (
            <div key={index} className="nav-item">
              <i className={"nav-icon " + nav.icon || ""} />
              <span
                style={{
                  color: "#FFF",
                }}
              >
                {menuWidth === max_width ? (
                  <Accordion
                    expanded={expanded === index}
                    onChange={handleChange(index)}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon
                          color="white"
                          style={{ fill: "white" }}
                        />
                      }
                    >
                      <Typography margin="3px" color="white">
                        {nav.icon}
                        {"                   "}
                        {nav.name}
                      </Typography>
                    </AccordionSummary>
                    {routes.filter((route) => route.showInNav & (route["showInNav"] === true) )
                      .filter((item) => item.hasOwnProperty("parent"))
                      .filter(
                        (item) => item.parent.toUpperCase() === nav.name.toUpperCase()
                      )
                      .map((route, index) => {
                     
                        console.log(window.location.pathname);
                        console.log(route)
                        return (
                          <div key={index}>
                            <Link
                              style={{
                                textDecoration: "none",
                                textTransform: "uppercase",
                                fontSize: "small",
                              }}
                              to={route.path}
                            >
                              {menuWidth === max_width ? (
                                <AccordionDetails
                                  sx={{
                                    borderBottom: "1px solid #111",
                                  }}
                                  color="black"
                                  aria-controls="panel2a-content"
                                  id="panel2a-header"
                                >
                                  <Typography fontSize="small" color="white">
                                  {route.icon} {route.title}{" "}
                                  </Typography>
                                </AccordionDetails>
                              ) : (
                                "null"
                              )}
                            </Link>
                          </div>
                        );
                      })}
                  </Accordion>
                ) : (
                  <Typography
                    color="white"
                    margin="10px"
                    marginTop="40px"
                    onClick={(e) => {
                      setMenuWidth(
                        menuWidth === max_width ? "50px" : max_width
                      );
                    }}
                  >
                    {nav.icon}
                  </Typography>
                )}
              </span>
            </div>
          );
        })}
        <div className="nav-item mt-3">
          <li
            className="nav-header nav-item"
            style={{
              listStyle: "none",
            }}
          >
             <Link
              style={{ textDecoration: "none" }}
              to=""
              onClick={(e) => {
                e.preventDefault();
                axios
                  .post(`${config.APP_CONFIG}/logout/userlogout`) 
                  .then((res) => {
                    if (res.data.status_code === 401) {
                     // userSessionContext.handleLogOut();
                    }
                  })
                  .catch((err) => {
                    toast.error("cannot Logout");
                    //setPermissions([]);
                  });
              }}
            >
              {menuWidth === max_width ? (
                <Typography margin="15px" color="white">
                  <FontAwesomeIcon
                    size="lg"
                    color="white"
                    icon={faSignOutAlt}
                  />
                  Log Out
                </Typography>
              ) : (
                <FontAwesomeIcon size="lg" color="white" icon={faSignOutAlt} />
              )}
            </Link>
          </li>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
