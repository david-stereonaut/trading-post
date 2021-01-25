import { observer, inject } from 'mobx-react'
import {  useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'



const Login = inject('GeneralStore', 'UserStore')(observer((props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState([])
    const [userOk, setUserOk] = useState(false)
    let { GeneralStore, UserStore } = props

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
        setUserOk(true)
    }
}  

const userLogOut = () => {
    localStorage.clear()
}

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