import { observer, inject } from 'mobx-react'
import Category from './Category';

const ConsFilter = inject('MessagesStore')(observer((props) =>  {

  const { MessagesStore } = props

  return (
    <div id="cons-filter">
        <Category category = 'All barters'/>
        <Category category = 'Active barters'/>
        <Category category = 'Offers'/>
        <Category category = 'Requests'/>
        <Category category = 'Completed barters'/>
        <Category category = 'Cancelled barters'/>
        <Category category = 'Neigborhood'/>
    </div>
  )
}))

export default ConsFilter;