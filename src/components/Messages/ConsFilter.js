import { FormControl, InputLabel, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import { observer, inject } from 'mobx-react'
import { useState } from 'react';
import Category from './Category';

const useStyles = makeStyles(() => ({
  filters: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  select: {
    marginLeft: 5
  },
}))

const ConsFilter = inject('MessagesStore')(observer((props) =>  {

  const { MessagesStore } = props

  const [category, setCategory] = useState('Active barters')

  const changeCategory = ({ target }) => {
    setCategory(target.value)
    MessagesStore.changeCategory(target.value)
  };

  const classes = useStyles()

  return (
    <div className={classes.filters}>
          <Typography>Filter:</Typography>
          <Select
            value={category}
            onChange={changeCategory}
            className={classes.select}
          >
            <MenuItem value='All barters'>All barters</MenuItem>
            <MenuItem value='Active barters'>Active barters</MenuItem>
            <MenuItem value='Offers'>Offers</MenuItem>
            <MenuItem value='Requests'>Requests</MenuItem>
            <MenuItem value='Completed barters'>Completed barters</MenuItem>
            <MenuItem value='Cancelled barters'>Cancelled barters</MenuItem>
            <MenuItem value='Neigborhood'>Neigborhood</MenuItem>
          </Select>
    </div>
  )
}))

export default ConsFilter;