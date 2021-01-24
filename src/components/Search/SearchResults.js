import { Card, CardMedia, Paper, Typography, Divider, makeStyles, IconButton } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import { sizing } from '@material-ui/system';
import Tag from '../Tag';
import MapTradeCard from './MapTradeCard';
import SearchUserCard from './SearchUserCard'
import MapUserCard from './MapUserCard'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ProfileTradeCard from '../Cards/ProfileTradeCard';
import SearchTradeCard from './SearchTradeCard';


const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '2vh',
    boxSizing:'border-box',
    padding: 15,
    display: 'flex',
    flexDirection: (({showMap}) => showMap ? 'column' : 'row'),
    flexWrap: (({showMap}) => showMap ? null : 'wrap'),
    overflow: (({showMap}) => showMap ? 'auto' : null),
    height: (({showMap}) => showMap ? 'calc(87vh - 40px - 2vh)' : null),
    '::-webkit-scrollbar': {
      display: 'none'
    }
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

  const classes = useStyles({showMap})

  const filterTradeResults = (arr) => {
    let newArr = arr.filter(trade => {
      if (SearchStore.seekingFilter === SearchStore.offeringFilter) { return true }
      else if (SearchStore.seekingFilter) { return trade.type === 'Seeking'}
      else {return trade.type === 'Offering'}
    })
    if (SearchStore.seekingTagsFilter.length > 0) {
      return newArr.filter(trade => SearchStore.seekingTagsFilter.some(r=> trade.tags.includes(r))) // arr1.some(r=> arr2.includes(r))
    }
    return newArr
  }

  return (
    <div className={classes.container}>
      {SearchStore.results.length > 0 && SearchStore.results[0].thumbnail && SearchStore.searchFor === 'trades' && filterTradeResults(SearchStore.results).map(trade => showMap ? <MapTradeCard trade={trade} /> : <SearchTradeCard trade={trade} />)}
      {SearchStore.results.length > 0 && SearchStore.results[0].firstName && SearchStore.searchFor === 'people' && SearchStore.results.map(user => showMap ? <MapUserCard user={user} /> : <SearchUserCard user={user} />)}
    </div>
  )
}))

export default SearchResults