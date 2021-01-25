import { observer, inject } from 'mobx-react'
import {  useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { makeStyles, TextField } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}))

const Login = inject('GeneralStore', 'UserStore', 'MessagesStore')(observer((props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState([])
    const [userOk, setUserOk] = useState(false)
    let { GeneralStore, UserStore, MessagesStore } = props

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
         UserStore.handleLogin(email, password)
        const verify = await UserStore.loginUser()
        if (verify ==="ok"){
        await UserStore.fetchUser()
        if (UserStore.user._id) {
            MessagesStore.setUserId(UserStore.user._id)
        }
        setUserOk(true)
    }
}  

const userLogOut = () => {
    localStorage.clear()
}

    const classes = useStyles()

  return (
        <div>
            <input id="email-input" type="text" placeholder="Enter your Email" name="email" onChange={handleChange} />
            <input id="password-input" type="text" placeholder="Enter your Password" name="password" onChange={handleChange} />
        {userOk 
        ? <Link to="/search"><button>Search for a Trade</button></Link>
        : <button onClick={userLogin}>Login</button>
        }
        <button onClick={userLogOut}>Log Out</button>
        </div>
    )
}))

export default Login