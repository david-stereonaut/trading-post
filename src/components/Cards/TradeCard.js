import { observer, inject } from 'mobx-react'

const TradeCard = inject('SearchStore')(observer((props) =>  {

  const { SearchStore } = props

  return (
    <div className="trade-card">

    </div>
  )
}))

export default TradeCard