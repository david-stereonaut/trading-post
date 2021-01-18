import { Chip } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import { useEffect } from 'react'


const Tag = inject()(observer((props) =>  {

  const { tag, editable } = props

  return (
    editable ? 
    <Chip style={{backgroundColor: '#FFE5D4'}} label={tag} onDelete={()=>{}} /> :
    <Chip style={{backgroundColor: '#FFE5D4'}} label={tag} />
  )
}))

export default Tag