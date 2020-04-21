import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, IconButton, Menu, MenuItem} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Home from '../../containers/Home/Home';
import About from '../../containers/About/About';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Router>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} onClick={handleClick} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><Link to="/">Home</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to="/about">About</Link></MenuItem>
        
      </Menu>
          <Typography variant="h6" className={classes.title}>
            Day Length App
          </Typography>
          
        </Toolbar>
      </AppBar>
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
