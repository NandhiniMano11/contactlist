import {  makeStyles } from '@material-ui/core/styles';

 const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
      },
      inline: {
        display: 'inline',
      },
  }));
   export default useStyles;