import React from 'react';
import clsx from 'clsx';
import { Switch, Route, BrowserRouter } from "react-router-dom";

//material core components imports
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
//material icons import
import MenuIcon from '@material-ui/icons/Menu';

//local imports
import { mainListItems } from '../../components/listItems';
import useStyles from "./style";
import Contacts from "../contactlist/index";

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
 
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
     
      <BrowserRouter>
        <Drawer variant="permanent" classes={{ paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose), }} open={open}>
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <MenuIcon />
            </IconButton>
          </div>
          <List>{mainListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <Switch>
              <Route exact path="/dashboard/contactlist"><Contacts /></Route>
            </Switch>
          </Container>
        </main>
      </BrowserRouter>

    </div>
  );
}
