import { observer, inject } from 'mobx-react'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect } from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const Offering = inject('SearchStore')(observer((props) =>  {
    const {SearchStore} = props
    const classes = useStyles();
    
    const handleChange = (event) => {
        const value = event.target.value;
        console.log(value)
        SearchStore.handleOffering(value)
      };
      useEffect(() => {
        SearchStore.getTags()
      }, [])
    
    return(
        <Autocomplete
        id="offering"
        options={SearchStore.allTags}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Offering" variant="outlined" onChange={handleChange}/>}
      />
    )
}))

export default Offering