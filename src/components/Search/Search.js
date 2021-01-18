import { observer, inject } from 'mobx-react'
import { useEffect } from 'react'
import './Search.scss'


const Search = inject('UserStore', 'SearchStore', 'GeneralStore')(observer((props) =>  {

  const { UserStore, SearchStore, GeneralStore } = props

  useEffect(() => {
    GeneralStore.handleTabChange('', 1)
  }, [])

  return (
    <div id="search-container">

    </div>
  )
}))

export default Search