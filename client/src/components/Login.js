import React, { useState } from 'react'

const Login = () => {
   const [credentials, setCredentials] = useState({ email: "", password: "" })

   const handleSubmit = async (e) => {
      e.preventDefault()
      const data = { email: credentials.email, password: credentials.password }
      const response = await fetch(`http://localhost:3001/api/auth/login`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
      });
      const json = await response.json()
      console.log(json)
   }

   const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value })
   }

   return (
      <div>
         <form>
            <div className="mb-3">
               <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
               <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
               <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
               <input type="password" className="form-control" id="password" name='password' onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
         </form>
      </div>
   )
}

export default Login
