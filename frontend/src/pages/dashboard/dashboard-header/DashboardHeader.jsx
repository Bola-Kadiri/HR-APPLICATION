import { IoSearchOutline } from "react-icons/io5";
// import { GoPeople } from "react-icons/go";
// import { GoBell } from "react-icons/go";
import { RxAvatar } from "react-icons/rx";
import Badge from "@mui/material/Badge";
// import Stack from '@mui/material/Stack';
import MailIcon from "@mui/icons-material/Mail";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

const DashboardHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="dashboard-header-container">
      <div className="dashboard-header">
        <div className="header-child">
          <span>
            <IoSearchOutline className="search" />
          </span>
          <div className="hr-admin">
            <Badge
              badgeContent={4}
              color="secondary"
              style={{ cursor: "pointer" }}
            >
              <MailIcon color="action" />
            </Badge>
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <RxAvatar className="search" style={{ cursor: "pointer" }} />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default DashboardHeader;
