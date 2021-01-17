import { observer, inject } from 'mobx-react'
import './Search.scss'


const Search = inject('UserStore', 'SearchStore')(observer((props) =>  {

  const { UserStore, SearchStore } = props

  return (
    <div id="search-container">

    </div>
  )
}))

export default Search