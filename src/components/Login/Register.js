import { observer, inject } from 'mobx-react'
import {  useEffect, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import { Button, makeStyles, TextField, Typography } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            marginTop: 10
        },
        
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            marginTop: 10
        },
        width: 200
    },
}))

const Register = inject('GeneralStore', 'UserStore', 'MessagesStore')(observer((props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    let { GeneralStore, UserStore, MessagesStore } = props

    const history = useHistory()

    const classes = useStyles()

    return (
      <div className={classes.container}>
        <form className={classes.form}>
          <TextField />
          <TextField />

        </form>
      </div>
    )
}))

export default Register