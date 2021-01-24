import { observer, inject } from 'mobx-react'
import {  useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


const Login = inject('GeneralStore', 'UserStore')(observer((props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState([])
    const [userOk, setUserOk] = useState("")
    let { GeneralStore, UserStore } = props

    const handleChange = (event) => {
        const value = event.target.value
        if (event.target.name === "email") {
            setEmail(value)
            console.log(email)
        } else {
            setPassword(value)
            console.log(password)
        }
    };

    const userLogin = async () => {
        UserStore.handleLogin(email, password)
        await UserStore.loginUser()
        await UserStore.fetchUser()
}  

  return (
        <div>
            <input id="email-input" type="text" placeholder="Enter your Email" name="email" onChange={handleChange} />
            <input id="password-input" type="text" placeholder="Enter your Password" name="password" onChange={handleChange} />
            <Link to="/search"><button onClick={userLogin}>Go To User Profile</button></Link>
        </div>
    )
}))

export default Login