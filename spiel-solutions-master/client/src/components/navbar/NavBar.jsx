import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import { navigate } from "@reach/router";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const Navbar = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    // top: false,
    // left: false,
    // bottom: false,
    right: false,
  });

  const logout = () => {
    axios
      .get(
        "http://localhost:8000/api/users/logout",
        { withCredentials: true }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    navigate("/");
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Profile"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />

      <List>
        {/* <ListItem button>
          {!props.user ? (
            <ListItemText primary="Login" />
          ) : (
            <ListItemText primary="Logout" />
          )}
        </ListItem> */}

        {props.user ? (
          <ListItem button onClick={logout}>
            <ListItemIcon>
              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <ListItem button>
            <ListItemIcon>
              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <span>Welcome, {props.user.firstName}</span>
            <Button onClick={toggleDrawer(anchor, true)}>
              <MenuIcon />
            </Button>
          </div>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
          <Divider />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Navbar;
