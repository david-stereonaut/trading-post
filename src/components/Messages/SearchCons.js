import { TextField, Typography } from '@material-ui/core';
import { observer, inject } from 'mobx-react'

const SearchCons = inject('MessagesStore')(observer((props) =>  {

  const { MessagesStore } = props

  const changeUser = () => MessagesStore.changeUser();

  return (
    <div id="search-cons">
        <Typography variant="h5" style={{marginBottom: 2}}>Conversations</Typography>
        <TextField label='Search conversation' style={{marginBottom: 10}} />
    </div>
  )
}))

export default SearchCons;