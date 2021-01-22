import { observer, inject } from 'mobx-react'

const Category = inject('MessagesStore')(observer((props) =>  {

  const { MessagesStore } = props

  const changeCategory = () => MessagesStore.changeCategory(props.category);

  return (
    <div className = "category" id = {`${props.category.split(' ')[0]}-selector`} onClick = {changeCategory}>
        <h4 className = "selector-name">{props.category}</h4>
    </div>
  )
}))

export default Category;