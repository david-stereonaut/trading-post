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

const Seeking = inject('SearchStore')(observer((props) =>  {
    const {SearchStore} = props
    const classes = useStyles();
    
    const handleChange = (event) => {
        const value = event.target.value;
        console.log(value)
        SearchStore.handleSeeking(value)
      };
      useEffect(() => {
        SearchStore.getTags()
      }, [])
    
    return(
        <Autocomplete
        id="Seeking"
        options={SearchStore.allTags}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Seeking" variant="outlined" onChange={handleChange}/>}
      />
    )
}))

export default Seeking