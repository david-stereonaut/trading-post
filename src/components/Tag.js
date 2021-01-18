import { Chip } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import { useEffect } from 'react'


const Tag = inject()(observer((props) =>  {

  const { tag } = props

  return (
    <Chip label={tag} onDelete={()=>{}} />
  )
}))

export default Tag