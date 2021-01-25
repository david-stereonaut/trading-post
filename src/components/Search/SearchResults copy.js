import { Card, CardMedia, Paper, Typography, Divider, makeStyles, IconButton } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import { sizing } from '@material-ui/system';
import Tag from '../Tag';
import SearchTradeCard from './MapTradeCard';
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

  //This needs to be fixed - both in the store, the api, and here. There should be an initial search that returns "Offering trades in your area", "Seeking trades in your area", "Traders in your area" - and the title should use history to see which titles should render
  useEffect(() => {
    SearchStore.initialSearch(UserStore.user.city, UserStore.user.country)
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

// import { Card, CardMedia, Paper, Typography, Divider, makeStyles, IconButton } from '@material-ui/core'
// import { observer, inject } from 'mobx-react'
// import { sizing } from '@material-ui/system';
// import Tag from '../Tag';
// import MapTradeCard from './MapTradeCard';
// import SearchUserCard from './SearchUserCard'
// import MapUserCard from './MapUserCard'
// import { useParams } from 'react-router-dom';
// import { useEffect } from 'react';
// import ProfileTradeCard from '../Cards/ProfileTradeCard';
// import SearchTradeCard from './SearchTradeCard';


// const useStyles = makeStyles((theme) => ({
//   container: {
//     marginTop: '2vh',
//     boxSizing:'border-box',
//     padding: 15,
//     display: 'flex',
//     flexDirection: (({showMap}) => showMap ? 'column' : 'row'),
//     flexWrap: (({showMap}) => showMap ? null : 'wrap'),
//     overflow: (({showMap}) => showMap ? 'auto' : null),
//     height: (({showMap}) => showMap ? 'calc(87vh - 40px - 2vh)' : null),
//     '::-webkit-scrollbar': {
//       display: 'none'
//     }
//   },
//   tradeTitle: {
//     '& button': {
//       display: 'none'
//     },
//     '&:hover': {
//       '& button': {
//         display: 'inline-block'
//       },
//     },
//     display: 'flex',
//     flexDirection: 'row',
//     alignSelf: 'center'
//   }
// }))

// const SearchResults = inject('UserStore','SearchStore', 'GeneralStore')(observer((props) =>  {

//   const { showMap, UserStore, user, SearchStore , allTags , usersResults , tradesResults } = props

//   const { userId } = useParams()

//   const classes = useStyles({showMap})

//   const filterTradeResults = (arr) => {
//     let newArr = arr.filter(trade => {
//       if (SearchStore.seekingFilter === SearchStore.offeringFilter) { return true }
//       else if (SearchStore.seekingFilter) { return trade.type === 'Seeking'}
//       else {return trade.type === 'Offering'}
//     })
//     if (SearchStore.seekingTagsFilter.length > 0) {
//       return newArr.filter(trade => SearchStore.seekingTagsFilter.some(r=> trade.tags.includes(r))) // arr1.some(r=> arr2.includes(r))
//     }
//     return newArr
//   }

//   return (
//     <div className={classes.container}>
//       {/* {SearchStore.results.map(trade => <SearchTradeCard trade={trade} />)}  */}
//       {SearchStore.results.length > 0 && SearchStore.results[0].thumbnail && SearchStore.searchFor === 'offering' && filterTradeResults(SearchStore.results).map(trade => showMap ? <MapTradeCard trade={trade} /> : <SearchTradeCard trade={trade} />)}
//       {SearchStore.results.length > 0 && SearchStore.results[0].thumbnail && SearchStore.searchFor === 'seeking' && filterTradeResults(SearchStore.results).map(trade => showMap ? <MapTradeCard trade={trade} /> : <SearchTradeCard trade={trade} />)}
//       {SearchStore.results.length > 0 && SearchStore.results[0].firstName && SearchStore.searchFor === 'people' && SearchStore.results.map(user => showMap ? <MapUserCard user={user} /> : <SearchUserCard user={user} />)}
//     </div>
//   )
// }))

// export default SearchResults