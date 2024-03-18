import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import ButtonComponent from "../components/ButtonComponent";
const urlUsers = "http://localhost/routes/users.php"
const urlLogin = "http://localhost/routes/login.php"
function LoginComponent() {
    const [username, setUsername] = useState([])
    const [password, setPassword] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.setItem("users",JSON.stringify({code:0}))
    })
    const handleLoginUser = async (e) => {
        e.preventDefault()

        const data = new FormData()
        data.append("username", username)
        data.append("password", password)
            const res = await fetch(urlLogin, {
                method: "POST",
                body: data
            }).then(response => response.json())
            console.log(res)
            saveUser()
            if(res.error){
                alert('User not found!')
                return
            }else{
                saveUser(res)
                navigate("/");
                return
            }
        }
        function saveUser(user){
            localStorage.setItem("users", JSON.stringify(user))
        }

    return (
        <div className="body">
            <div className="form-container">
                <p className="titlelogin">Login</p>
                <form className="form">
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="username" id="username" placeholder=""></input>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder=""></input>
                    </div>
                    <button onClick={handleLoginUser} className="sign">Log in</button>
                </form>
                <p className="signup">Don't have an account?
                    <Link to="/register" href="#" className="">Sign up</Link>
                </p>
            </div>
        </div>
    )    
}
export default LoginComponent