import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
   const [credentials, setCredentials] = useState({ email: "", password: "" })
   let history = useNavigate()

   const handleSubmit = async (e) => {
      e.preventDefault()
      const data = { email: credentials.email, password: credentials.password }
      const response = await fetch('http://localhost:3001/api/auth/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
      });
      const json = await response.json()
      console.log(json)

      if (json.success) {
         localStorage.setItem("token", json.authToken)
         history('/')
         props.showAlert("Logged in successfully", "success")
      } else {
         props.showAlert("Invalid credentials", "danger")
      }
   }

   const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value })
   }

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <div className="mb-3">
               <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
               <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
            </div>
            <div className="mb-3">
               <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
               <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credentials.password} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
         </form>
      </div>
   )
}

export default Login
