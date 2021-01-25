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
    // height: 40
    // justifyContent: 'center'
  },
  select: {
    minWidth: 100,
    borderRadius: 20,
    // height: 40,
  },
  textField: {
    borderRadius: 20,
    // height: 40,
    // width: 300
  },
  inputs: {
    borderRadius: 20,
    // heigh: 40,
    // width: 200,
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  paper: {
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchIcon: {
    fontSize: 25,
    marginLeft: 2.5,
    marginRight: 5,
    cursor: 'pointer',
    color: 'gray',
    height: 40,
    width: 40
  },
  filterIcon: {
    fontSize: 25,
    marginLeft: 5,
    cursor: 'pointer',
    color: 'gray',
    height: 40,
    width: 40
  },
  filterSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 5,
    padding: 5
  },
  tagsFilter: {
    width: 180,
    borderRadius: 20
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
        SearchStore.searchTrades(freeTextInput)
        SearchStore.setSeekingFilter(false)
        SearchStore.setOfferingFilter(true)
        console.log(SearchStore.seekingFilter)
        console.log(SearchStore.offeringFilter)
        console.log(freeTextInput)
        //SearchStore.searchOffering(freeTextInput)
        break;
      case "seeking":
        SearchStore.searchTrades(freeTextInput)
        SearchStore.setSeekingFilter(true)
        SearchStore.setOfferingFilter(false)
        console.log(SearchStore.seekingFilter)
        console.log(SearchStore.offeringFilter)
        //SearchStore.searchSeeking(freeTextInput)
        break;
      case "people":
        SearchStore.searchUsers(freeTextInput)
        break;
      case "tags":
        SearchStore.searchTags()
        break;
    }
  }

  const classes = useStyles({ showFilters })

  return (
    <div className={classes.barContainer}>
      <Paper className={classes.paper}>
        <Paper className={classes.inputs}>
          <Select variant="outlined" label="Search for" className={classes.select} value={searchFor} onChange={({ target }) => setSearchFor(target.value)}>
            <MenuItem value='offering'>Offering Cards</MenuItem>
            <MenuItem value='seeking'>Seeking Cards</MenuItem>
            <MenuItem value='tags'>Trades</MenuItem>
            <MenuItem value='people'>People</MenuItem>
          </Select>

          {!(searchFor === 'tags') &&
            <TextField id="Naked input" label={searchFor} variant="outlined" InputProps={{ className: classes.textField }} value={freeTextInput} onChange={({ target }) => setFreeTextInput(target.value)} placeholder="Search" />
          }

          {searchFor === 'tags' &&
            <FormControl>

              <FormLabel style={{ marginBottom: 5 }}>Seeking Tags</FormLabel>
              <Autocomplete
                className={classes.seekingTagsFilter}
                multiple
                size="small"
                limitTags={1}
                options={SearchStore.allTags}
                getOptionLabel={(option) => option}
                defaultValue={[]}
                onChange={(e, value) => SearchStore.setSeekingTagsFilter(value)}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} />
                )}
              />
            </FormControl>}
          {searchFor === 'tags' &&
            <FormControl>
              <FormLabel style={{ marginBottom: 5, marginTop: 5 }}>Offering Tags</FormLabel>
              <Autocomplete
                className={classes.offeringTagsFilter}
                multiple
                size="small"
                limitTags={1}
                options={SearchStore.allTags}
                getOptionLabel={(option) => option}
                defaultValue={[]}
                onChange={(e, value) => SearchStore.setOfferingTagsFilter(value)}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} />
                )}
              />
            </FormControl>}
          {searchFor === 'tags' &&
            <FormControlLabel
              control={<Switch checked={exactMatch} onChange={handleSwitch} name="exactMatch" />}
              label="exact match"
            />}
          <div>
          </div>
          <IconButton className={classes.filterIcon} onClick={() => setShowFilters(!showFilters)}><FilterListIcon /></IconButton>
          <IconButton className={classes.searchIcon} onClick={search}><SearchIcon /></IconButton>
        </Paper>
        <Collapse style={{ width: '90%' }} in={showFilters}>
          {/* <FormControl> */}
          {/* <LocationSearchInput /> */}
          {/* <MenuItem value='location'>Location</MenuItem>
                  <MenuItem value='match'>Match</MenuItem> */}
          {/* </FormControl> */}
          <div className={classes.filterSection}>
            {/* {searchFor !== 'people' &&
              <FormControl component="fieldset">
                <FormLabel component="legend">Trade types</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={SearchStore.seekingFilter} onChange={({ target }) => SearchStore.setSeekingFilter(target.checked)} />}
                    label="Show Seeking"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={SearchStore.offeringFilter} onChange={({ target }) => SearchStore.setOfferingFilter(target.checked)} />}
                    label="Show Offering"
                  />
                </FormGroup>
              </FormControl>
            } */}

            <div>
              <FormControl>
                <FormLabel style={{ marginBottom: 5 }}>Sort by</FormLabel>
                <Select style={{ height: 40, width: 130 }} variant="outlined" value={SearchStore.sortBy} onChange={({ target }) => SearchStore.setSortBy(target.value)}>

                </Select>
              </FormControl>
            </div>
          </div>
        </Collapse>
      </Paper>

      <Button startIcon={<MapIcon />} style={{ marginLeft: 30, alignSelf: 'flex-start' }} onClick={() => handleMap()}>Show Map</Button>
    </div>
  )
}))

export default Searchbar