import { Button, IconButton, InputBase, makeStyles, MenuItem, Paper, Select, TextField, Collapse, FormGroup, FormControlLabel, Checkbox, FormLabel, FormControl } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import { useEffect, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MapIcon from '@material-ui/icons/Map';
import { LocationSearchInput } from './Location';
import Switch from '@material-ui/core/Switch';


const useStyles = makeStyles((theme) => ({
  barContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifySelf: 'center',
    justifyContent: 'center', //this is optional 
  },
  select: {
    minWidth: 115,
    borderRadius: 40,
    height: 68,
  },
  textField: {
    borderRadius: 40,
    height: 68,
    flexGrow: 4
    // width: 300
  },
  inputs: {
    borderRadius: 40,
    height: 68,
    // width: 200,
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    width: 574
  },
  paper: {
    borderRadius: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchIcon: {
    fontSize: 25,
    cursor: 'pointer',
    color: 'gray',
    height: 40,
    width: 40
  },
  filterIcon: {
    fontSize: 25,
    cursor: 'pointer',
    color: 'gray',
    height: 40,
    width: 40,
    marginLeft: 'auto'
  },
  filterSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    fontSize: 30,
    paddingTop: 5,
    padding: 5
  },
  tagsFilter: {
    width: 150,
  }
}))

const Searchbar = inject('UserStore', 'SearchStore', 'GeneralStore')(observer((props) => {

  const { UserStore, SearchStore, GeneralStore, handleMap, showMap } = props

  const [freeTextInput, setFreeTextInput] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [searchFor, setSearchFor] = useState('offering')
  const [typeFilter, setTypeFilter] = useState({
    seeking: true,
    offering: true
  })
  const [offeringTagsFilter, setOfferingTagsFilter] = useState([])
  const [seekingTagsFilter, setSeekingTagsFilter] = useState([])
  const [exactMatch, setExactMatch] = useState(true);
  const [sortBy, setSortBy] = useState('location')

  useEffect(() => {
    SearchStore.getAllTags()
  }, [])

  const handleSwitch = (event) => {
    setExactMatch(event.target.checked);
  };

  const search = () => {
    switch (searchFor) {
      case "offering":
        SearchStore.searchOffering(freeTextInput)
        break;
      case "seeking":
        SearchStore.searchSeeking(freeTextInput)
        break;
      case "people":
        SearchStore.searchUsers(freeTextInput)
        break;
      case "swap":
        exactMatch ? SearchStore.searchExactSwap() : SearchStore.searchSwap()
        break;
        default: break;
    }
  }

  const classes = useStyles({ showFilters })

  return (
    <div className={classes.barContainer}>
      <Paper className={classes.paper}>
        <Paper className={classes.inputs}>
          <Select variant="outlined" className={classes.select} value={searchFor} onChange={({ target }) => setSearchFor(target.value)}>
            <MenuItem value='offering'>Trade offers</MenuItem>
            <MenuItem value='seeking'>Trade requests</MenuItem>
            <MenuItem value='swap'>Swap</MenuItem>
            <MenuItem value='people'>People</MenuItem>
          </Select>

          {!(searchFor === 'swap') &&
            <TextField id="Naked input" variant="outlined" style={{flexGrow: 4}} InputProps={{ className: classes.textField }} value={freeTextInput} onChange={({ target }) => setFreeTextInput(target.value)} placeholder="Search" />
          }

          {searchFor === 'swap' &&
            <FormControl>
              <Autocomplete
                forcePopupIcon={false}
                className={classes.tagsFilter}
                multiple
                size="small"
                limitTags={1}
                options={SearchStore.allTags}
                getOptionLabel={(option) => option}
                defaultValue={[]}
                onChange={(e, value) => SearchStore.setOfferingTagsFilter(value)}
                renderInput={(params) => (
                  <TextField placeholder="Offer tags" variant="outlined" {...params} />
                )}
              />
            </FormControl>}

          {searchFor === 'swap' &&
            <FormControl>
              <Autocomplete
                forcePopupIcon={false}
                className={classes.tagsFilter}
                multiple
                size="small"
                limitTags={1}
                options={SearchStore.allTags}
                getOptionLabel={(option) => option}
                defaultValue={[]}
                onChange={(e, value) => SearchStore.setSeekingTagsFilter(value)}
                renderInput={(params) => (
                  <TextField placeholder="Request tags" variant="outlined" {...params} />
                )}
              />
            </FormControl>}

          {searchFor === 'swap' &&
            <FormControlLabel
              control={<Checkbox checked={exactMatch} onChange={handleSwitch} name="exactMatch" />}
              label="Exact"
              style={{margin: 0}}
            />
          }
          <div>
          </div>
          <IconButton className={classes.filterIcon} onClick={() => setShowFilters(!showFilters)}><FilterListIcon /></IconButton>
          <IconButton className={classes.searchIcon} onClick={search}><SearchIcon /></IconButton>
        </Paper>
        <Collapse style={{ width: '90%' }} in={showFilters}>
          <div className={classes.filterSection}>
            🧙‍♂️🥽🤹‍♂️🥏🧛‍♀️🥦👩‍🚀🌪
          </div>
        </Collapse>
      </Paper>

      <Button startIcon={<MapIcon />} style={{ marginLeft: 30, alignSelf: 'center' }} onClick={() => handleMap()}>Show Map</Button>
    </div>
  )
}))

export default Searchbar