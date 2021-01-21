import { Chip } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import { useEffect } from 'react'


const Tag = inject('UserStore', 'GeneralStore')(observer((props) =>  {

  const { tag, editable, UserStore, GeneralStore, type, tradeCard } = props

  const deleteTag = async () => {
    if (tradeCard) {
      GeneralStore.removeEditTag(tag)
    } else {
      UserStore.removeTag(tag, type)
    }
  }

  return (
    editable ? 
    <Chip style={{backgroundColor: '#FFE5D4'}} label={tag} onDelete={deleteTag} /> :
    <Chip style={{backgroundColor: '#FFE5D4'}} label={tag} />
  )
}))

export default Tag