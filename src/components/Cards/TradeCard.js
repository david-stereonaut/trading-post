import { observer, inject } from 'mobx-react'
import ProfileTradeCard from './ProfileTradeCard'
import './TradeCard.scss'

const TradeCard = inject('SearchStore')(observer((props) =>  {

  let { SearchStore, type, trade, editable } = props

  return (
    <div className="trade-card">
    {type = 'profile' ? <ProfileTradeCard trade={trade} editable={editable} /> : <div></div>}
    </div>
  )
}))

export default TradeCard