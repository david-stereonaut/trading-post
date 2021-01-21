import { Card, CardMedia, Paper, Typography, Divider, makeStyles, IconButton } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import { sizing } from '@material-ui/system';
import Tag from '../Tag';
import SearchTradeCard from './SearchTradeCard';
import SearchUserCard from './SearchUserCard'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


const useStyles = makeStyles((theme) => ({
  tradesContainer: {
    marginTop: '2vh',
    boxSizing:'border-box',
    padding: 15,
    display: 'flex',
    flexDirection: 'column'
  },
  tradeTitle: {
    '& button': {
      display: 'none'
    },
    '&:hover': {
      '& button': {
        display: 'inline-block'
      },
    },
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center'
  }
}))

const SearchResults = inject('UserStore','SearchStore', 'GeneralStore')(observer((props) =>  {

  const { showMap, UserStore, user, SearchStore , allTags , usersResults , tradesResults } = props

//   const { userId } = useParams()

  const classes = useStyles()

  useEffect(() => {
    SearchStore.initialSearch()
    SearchStore.searchUsers()
  }, [])

  let offeringResults = SearchStore.tradesResults.length > 0 ? SearchStore.tradesResults.filter(c => c.type === 'Offering') : null
  let seekingResults = SearchStore.tradesResults.length > 0 ? SearchStore.tradesResults.filter(c => c.type === 'Seeking') : null
  console.log(offeringResults)
//   let  = tradesResults.tradeCards.filter(c => c.type === 'Seeking')

  return (
    <Paper className={classes.tradesContainer}>
      <div className={classes.tradeTitle}>
        <Typography variant="h5" align="center">Search Results</Typography>
      </div>
      <Typography variant="h6">Offering Results:</Typography>
      <div className="trade-results-container">
        {offeringResults && offeringResults.length > 0 ? (offeringResults.map((trade) => <SearchTradeCard key={trade._id} type='search' trade={trade} userId={trade.userId} showMap={showMap} />)) : <Typography >No relevant results</Typography>}
      </div>
      <Typography variant="h6">Seeking Results:</Typography>
      <div className="trade-results-container">
        {seekingResults && seekingResults.length > 0 ? (seekingResults.map((trade) => <SearchTradeCard key={trade._id} type='search' trade={trade} userId={trade.userId} showMap={showMap} />)) : <Typography >No relevant Results</Typography>}
      </div>
      <Typography variant="h6">Traders Results:</Typography>
      <div className="trade-results-container">
        {SearchStore.usersResults && SearchStore.usersResults.length > 0 ? (SearchStore.usersResults.map((user) => <SearchUserCard key={user._id} type='search' user={user} showMap={showMap} />)) : <Typography >No relevant Results</Typography>}
      </div>
    </Paper>
  )
}))

export default SearchResults