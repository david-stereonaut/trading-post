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

const Login = inject('GeneralStore', 'UserStore', 'MessagesStore')(observer((props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    let { GeneralStore, UserStore, MessagesStore } = props

    const history = useHistory()

    useEffect(() => {
        GeneralStore.handleTabChange('', 3)
        if (UserStore.user._id) {
          history.push(`/search`)
        }
    
      }, [UserStore.user._id]);

    const handleChange = (event) => {
        const value = event.target.value
        if (event.target.name === "email") {
            setEmail(value)
            console.log(email)
        } else {
            setPassword(value)
        }
    };

    

    const userLogin = async () => {
        if (!email && !password) {
            setEmail('')
            setPassword('')
            setEmailError(true)
            setPasswordError(true)
            setError('You must enter your email and password!')
            return
        } else if (!email) {
            setEmail('')
            setPassword('')
            setEmailError(true)
            setPasswordError(false)
            setError('You must enter your email')
            return
        } else if (!password) {
            setEmail('')
            setPassword('')
            setEmailError(false)
            setPasswordError(true)
            setError('You must enter your password!')
            return
        }
        const verify = await UserStore.loginUser(email, password)
        if (verify ==="ok"){
            await UserStore.fetchUser()
            MessagesStore.setUserId(UserStore.user._id)
            history.push('/search')
        } else {
            setEmail('')
            setPassword('')
            setError(verify)
        }
    }  

    const classes = useStyles()

  return (
        <div className={classes.container}>
            <Typography variant='h6'>Log in here</Typography>
            <form className={classes.form}>
                {!emailError ? <TextField label="Enter your Email" name="email" value={email} onChange={handleChange} /> : <TextField value={email} label="Enter your Email" error name="email" onChange={handleChange} />}
                {!passwordError ? <TextField type='password' label="Enter your Password" value={password} name="password" onChange={handleChange} /> : <TextField value={password} error label="Enter your Password" name="password" onChange={handleChange} />}
                <Button style={{flexGrow: 0}} onClick={userLogin}>Login</Button>
                {error && <Typography variant='subtitle2' style={{color: 'red'}}>{error}</Typography>}
            </form>
            <Typography>Don't have an account? Register <Link to='/register'>here</Link></Typography>
        </div>
        
    )
}))

export default Login