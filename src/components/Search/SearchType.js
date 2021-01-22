import { observer, inject } from 'mobx-react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const SearchType = inject('SearchStore')(observer((props) =>  {
    const {SearchStore} = props
    const classes = useStyles();
  
    const handleChange = (event) => {
      const value = event.target.value;
      SearchStore.handleSearchType(value)
    };
  
    return (
      <FormControl className={classes.formControl}>
        <NativeSelect
          value={SearchStore.searchType}
          onChange={handleChange}
          name="type"
          className='searchtype'
          inputProps={{ 'aria-label': 'type' }}
        >
          <option value="people">people</option>
          <option value="Trade">Trade</option>
        </NativeSelect>
      </FormControl>
    )
}))

export default SearchType