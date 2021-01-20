import { Chip } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import { useEffect } from 'react'


const Tag = inject('UserStore')(observer((props) =>  {

  const { tag, editable, UserStore, type } = props

  return (
    editable ? 
    <Chip style={{backgroundColor: '#FFE5D4'}} label={tag} onDelete={() => UserStore.removeTag(tag, type)} /> :
    <Chip style={{backgroundColor: '#FFE5D4'}} label={tag} />
  )
}))

export default Tag