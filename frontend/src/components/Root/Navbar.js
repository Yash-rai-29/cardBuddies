import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "blue", // Change the background color
  },
  logo: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
  },
  navLinks: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-start",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  drawer: {
    width: 250,
  },
  list: {
    width: "100%",
  },
  accountButton: {
    marginLeft: "auto",
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(2),
    },
  },
}));

export default function Navbar({ setIsAuthenticated }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(null);

  useEffect(() => {
    const authStatus = localStorage.getItem("auth");
    setIsLoggedIn(authStatus === "true");
  }, []);

  const handleMobileMenuOpen = () => {
    setIsMobileMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleAccountMenuOpen = (event) => {
    setIsAccountMenuOpen(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setIsAccountMenuOpen(null);
  };

  const handleLogout = () => {
    const cookies = Cookies.get();
    for (const cookie in cookies) {
      Cookies.remove(cookie);
    }
    localStorage.clear();
    setIsAuthenticated(false);
    Cookies.remove();
    navigate("/login");
  };

  const navItems = [
    { title: "Home", link: "/" },
    { title: "About Us", link: "/about" },
    { title: "How It Works", link: "/how-it-works" },
    { title: "Available Cards", link: "/cards" },
    { title: "Available Buyer", link: "/buyers" },
  ];

  return (
    <AppBar position="static" className={`${classes.appBar}`}>
      <Toolbar>
        {/* Mobile Menu Button */}
        <IconButton
          edge="start"
          className={`${classes.menuButton} lg:hidden`}
          color="inherit"
          aria-label="menu"
          onClick={handleMobileMenuOpen}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          className={classes.logo}
        >
          <img
            src="/logo1.svg"
            alt="Company Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
        </Typography>

        <div className={classes.navLinks}>
          {navItems.map((item, index) => (
            <Typography
              variant="button"
              component={Link}
              to={item.link}
              key={index}
              style={{
                textDecoration: "none",
                color: "inherit",
                marginRight: 20,
                "&:hover": { color: "#fff" },
              }}
            >
              {item.title}
            </Typography>
          ))}
        </div>

        {/* Account Menu */}
        <IconButton
          className={classes.accountButton}
          color="inherit"
          aria-label="account of current user"
          aria-controls="account-menu"
          aria-haspopup="true"
          onClick={handleAccountMenuOpen}
          style={{ "&:hover": { color: "#fff" } }}
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          id="account-menu"
          anchorEl={isAccountMenuOpen}
          keepMounted
          open={Boolean(isAccountMenuOpen)}
          onClose={handleAccountMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={handleAccountMenuClose}
            component={Link}
            to="/account/profile"
          >
            Profile
          </MenuItem>
          <MenuItem
            onClick={handleAccountMenuClose}
            component={Link}
            to="/settings"
          >
            Account Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>

      {/* Responsive Mobile Menu */}
      <Drawer
        anchor="left"
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.list}>
          <List>
            {navItems.map((item, index) => (
              <ListItem
                button
                component={Link}
                to={item.link}
                key={index}
                onClick={handleMobileMenuClose}
              >
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {isLoggedIn ? (
              <>
                <ListItem
                  button
                  component={Link}
                  to="/profile"
                  onClick={handleMobileMenuClose}
                >
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/settings"
                  onClick={handleMobileMenuClose}
                >
                  <ListItemText primary="Account Settings" />
                </ListItem>
                <ListItem button onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem
                  button
                  component={Link}
                  to="/login"
                  onClick={handleMobileMenuClose}
                >
                  <ListItemText primary="Sign in" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/signup"
                  onClick={handleMobileMenuClose}
                >
                  <ListItemText primary="Sign Up" />
                </ListItem>
              </>
            )}
          </List>
        </div>
      </Drawer>
    </AppBar>
  );
}
