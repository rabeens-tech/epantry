import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserSessionContext from "../../contexts/UserSessionContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import config from "../../utils/config";
import { toast } from "react-toastify";

const Header = () => {
  let _user = window.localStorage.getItem("user");
  const userSessionContext = React.useContext(UserSessionContext);
  return (
    <div className="header-section">
      <div className="container-fluid">
        <div className="header-section-right">
          Welcome suraj {_user}! &nbsp;
          <span>
            <ExpandMoreIcon style={{ fontSize: "20px" }} />
          </span>
          <div className="show-on-hover">
            <div className="card">
              <Link
                style={{
                  textDecoration: "none",
                  color: "#444",
                  wordSpacing: "1px",
                }}
                to=""
                onClick={(e) => {
                  e.preventDefault();
                  axios
                    .post(`${config.APP_CONFIG}/logout/userlogout`, {
                      headers: { Authorization: userSessionContext.token },
                    })
                    .then((res) => {
                      if (res.data.status_code === 401) {
                        //userSessionContext.handleLogOut();
                      }
                    })
                    .catch((err) => {
                      toast.error("cannot Logout");
                      //setPermissions([]);
                    });
                }}
              >
                <FontAwesomeIcon size="md" color="#444" icon={faSignOutAlt} />
                &nbsp;
                Log Out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
