import { observer, inject } from 'mobx-react'

const SearchCons = inject('MessagesStore')(observer((props) =>  {

  const { MessagesStore } = props

  return (
    <div id="search-cons">
        <h1 id = "con-title">Conversations</h1>
        <input id = "search-cons-input" placeholder = "Search conversation"/>
    </div>
  )
}))

export default SearchCons;