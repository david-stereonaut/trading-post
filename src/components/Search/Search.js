import { observer, inject } from 'mobx-react'
import { useEffect } from 'react'
import './Search.scss'
import SearchType from './SearchType'
import FirstName from './FirstName'
import LastName from './LastName'
import Offering from './Offering'
import Seeking from "./Seeking";
import App from './Location'

const Search = inject('UserStore', 'SearchStore', 'GeneralStore')(observer((props) =>  {

  const { UserStore, SearchStore, GeneralStore } = props

  useEffect(() => {
    GeneralStore.handleTabChange('', 1)
  }, [])

 
  return (
    <div id="search-container">
      <SearchType/>
      {SearchStore.searchType === 'people' ? <> <FirstName/> <LastName/> </>:<> <Offering/> <Seeking/></>}     
    {/* <App/> */}

    </div>
  )
}))

export default Search