import { observer, inject } from 'mobx-react'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const LastName = inject('SearchStore')(observer((props) =>  {
    const {SearchStore} = props
    const classes = useStyles();
    
    const handleChange = (event) => {
        const value = event.target.value;
        SearchStore.handleLastName(value)
      };
      
    return(
        <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Last Name" onChange={handleChange}/>
      </form>
    )
}))

export default LastName