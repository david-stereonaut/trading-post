import { Card, CardMedia, Paper, Typography, Divider } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import './Profile.scss'
import { sizing } from '@material-ui/system';
import Tag from '../Tag';


const Photo = inject('UserStore')(observer((props) =>  {

  const { UserStore, imgUrl } = props

  return (
    <Card style={{width:175}}>
        <CardMedia style={{height: 175}}
          image={imgUrl}
          title="Interesting stuff"
        />
      </Card>
  )
}))

export default Photo