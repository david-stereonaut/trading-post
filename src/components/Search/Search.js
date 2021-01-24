import { observer, inject } from 'mobx-react'
import { useEffect, useState } from 'react'
import Map from './Map/Map'

import SearchType from './SearchType'
import FirstName from './FirstName'
import LastName from './LastName'
import Offering from './Offering'
import Seeking from "./Seeking";
import App from './Location'
import Searchbar from './Searchbar'
import { makeStyles } from '@material-ui/core'
import SearchResults from './SearchResults'

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: (({ showMap }) => showMap ? 'flex' : 'block'),
    // flexDirection: 'row',
    

  },
  searchTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: (({ showMap }) => showMap ? 780 : null),
    // justifyContent: 'center'
    marginRight: 20
  }
}))

const Search = inject('UserStore', 'SearchStore', 'GeneralStore')(observer((props) =>  {

  const { UserStore, SearchStore, GeneralStore } = props

  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    GeneralStore.handleTabChange('', 1)
  }, [])

  const handleMap = () => {
    setShowMap(!showMap)
  }

  const classes = useStyles({ showMap })
 
  return (
    <div className={classes.mainContainer}>
      <div className={classes.searchTextContainer}>
        <Searchbar handleMap={handleMap} />

        <SearchResults showMap={showMap} />

          
      </div>
      {showMap && <Map />}
    </div>
  )
}))

export default Search