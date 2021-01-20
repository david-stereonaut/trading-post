import { observer, inject } from 'mobx-react'

const TypeBar = inject('MessagesStore')(observer((props) =>  {

  const { MessagesStore } = props

  return (
    <div id = "type-bar">
        <h1>type bar</h1>
    </div>
  )
}))

export default TypeBar;