import { observer, inject } from 'mobx-react'

const SearchCons = inject('MessagesStore')(observer((props) =>  {

  const { MessagesStore } = props

  const changeUser = () => MessagesStore.changeUser();

  return (
    <div id="search-cons">
        <h1 id = "con-title">Conversations</h1>
        <button onClick = {changeUser}>Change user</button>
        <input id = "search-cons-input" placeholder = "Search conversation"/>
    </div>
  )
}))

export default SearchCons;