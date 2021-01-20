import { observer, inject } from 'mobx-react'

const Category = inject('MessagesStore')(observer((props) =>  {

  const { MessagesStore } = props

  const changeCategory = () => MessagesStore.changeCategory(props.category);

  return (
    <div className = "category" onClick = {changeCategory}>
        <h4>{props.category}</h4>
    </div>
  )
}))

export default Category;