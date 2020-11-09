import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HelpIcon from '@material-ui/icons/HelpOutline';
import AddIcon from '@material-ui/icons/AddBoxOutlined';
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Container from '@material-ui/core/Container';
import tableIcons from '../../utils/icon.imports';
import MaterialTable from 'material-table';
import Chip from '@material-ui/core/Chip';
import {gettoken}  from '../../utils/login'
const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  content: {
    flexGrow: 1,
    height: '100%',
    overflow: 'auto',
  },
  paperroot: {
    display: 'flex',
    width: '75%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12
  },
  menuButton: {
    marginRight: 16,
    marginLeft: -12
  },
  chip: {
    margin: theme.spacing(0.5),
  },

}));

export default function Index() {
  const classes = useStyles();
  const { useState } = React;
  const [selectedRow, setSelectedRow] = useState(null);

  const [columns] = useState([
   {
      title: 'Profile',
      field: 'profile',
      editable: 'never',
      filtering: false,
      sorting: false,
      searchable: false,
      render: rowData => (
        <img
          style={{ height: 36, borderRadius: '50%' }}
          src={rowData.avatar} alt='profile'
        />
      ),
    },
    { title: 'Basicinfo', field: 'basicinfo', filtering: false, sorting: false },
    {
      title: 'Incoming Call Count', field: 'incomingcallcount', filtering: false, sorting: false, searchable: false,
    },
    {
      title: 'Outgoing Call Count', field: 'outcomingcallcount', filtering: false, sorting: false, searchable: false,
    },
    {
      title: 'Location', field: 'location', searchable: false, sorting: false,
    },
    {
      title: 'Tags', field: 'tags', filtering: false, searchable: false, sorting: false,

      render: rowData => (
        rowData.tags.map((data) => <Chip label={rowData.tags} className={classes.chip} />)),
    },
    {
      title: 'Created Date', field: 'createdAt', filtering: false, searchable: false,
    },

  ]);

  const [data, setData] = useState([]);
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json','Authorization': 'Bearer '+gettoken()},
  };
  console.log(gettoken());
   fetch('http://localhost:4000/api/contacts/list', requestOptions)
  .then(response => response.json())
  .then(data => {
    if (data.statusCode === 200) {
setData(data.responseContent)    }
    else { console.log(data) }
  });
  return (
    <div><Toolbar>
      <Paper className={classes.paperroot}>
        <InputBase className={classes.input} placeholder="Search" inputProps={{ 'aria-label': 'search' }} />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <section className={classes.rightToolbar}>
        <IconButton color="inherit" aria-label="Edit">
          <AddIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="Save">
          <HelpIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="More Options">
          <AccountCircle />
        </IconButton>
      </section>
    </Toolbar>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <MaterialTable
            data={data}
            editable={{
              onRowAdd: newData =>
               { 
                 new Promise((resolve, reject) => {
                  setTimeout(() => {
                    setData([...data, newData]);
                    resolve();
                  }, 1000)
                })
              },
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.basicinfo;
                    dataUpdate[index] = newData;
                    setData([...dataUpdate]);

                    resolve();
                  }, 1000)
                }),
              onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...data];
                    const index = oldData.tableData.basicinfo;
                    dataDelete.splice(index, 1);
                    setData([...dataDelete]);

                    resolve()
                  }, 1000)
                }),
            }}
            options={{
              filtering: true,
              selection: true,
              exportButton: true,
              actionsColumnIndex: -1,
              rowStyle: rowData => ({
                backgroundColor: (selectedRow === rowData.tableData.basicinfo) ? '#EEE' : '#FFF'
              })
            }}
            onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.basicinfo))}
            icons={tableIcons}
            title="Contacts"
            columns={columns}
          />
        </Container>
      </main>
    </div>
  );
}
