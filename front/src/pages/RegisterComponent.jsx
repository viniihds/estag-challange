import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import ButtonComponent from "../components/ButtonComponent"
const url = "http://localhost/routes/users.php"
function RegisterComponent() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const handleRegisterUser = async (e) => {
        e.preventDefault()

        const data = new FormData()
        if(password == "" || username == ""){
            alert("Preencha os campos")
        }else{
            data.append("username", username)
            data.append("password", password)
                const res = await fetch(url, {
                    method: "POST",
                    body: data
                })
                navigate("/login");
        }

    }
    return (
        <div className="body">
            <div className="form-container">
                <p className="titlelogin">Register</p>
                <form className="form" onSubmit={handleRegisterUser} >
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="username" id="username" placeholder=""></input>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder=""></input>
                    </div>
                    <ButtonComponent styleclass={"sign"} text={"Sign in"} />
                </form>
                <p className="signup">Already have an account?
                    <Link to="/login" href="#" className=""> Log in</Link>
                </p>
            </div>
        </div>
    )
}
export default RegisterComponent