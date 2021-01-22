import { observer, inject } from 'mobx-react'
import { useEffect } from 'react'
import './Search.scss'
import SearchResults from './SearchResults'


const Search = inject('UserStore', 'SearchStore', 'GeneralStore')(observer((props) =>  {

  const { UserStore, SearchStore, GeneralStore } = props

  let showMap = false

  useEffect(() => {
    GeneralStore.handleTabChange('', 1)
  }, [])

  return (
    <div id="search-container">
        
        <SearchResults showMap={showMap}/>

        
    </div>
  )
}))

export default Search