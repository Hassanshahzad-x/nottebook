import React, { useState } from 'react'


const Signup = (props) => {
   const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })

   const handleSubmit = async (e) => {
      e.preventDefault()
      // const { name, email, password } = credentials
      const data = { name: credentials.name, email: credentials.email, password: credentials.password }

      const response = await fetch('http://localhost:3001/api/auth/createuser', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
      });
      const json = await response.json()
      console.log(json)
      props.showAlert("Account created successfully", "success")
   }


   const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value })
   }

   return (
      <div className='container'>
         <h1>Sign up to <strong>nottebook</strong></h1>
         <form onSubmit={handleSubmit}>
            <div className="mb-3">
               <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
               <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} />
            </div>
            <div className="mb-3">
               <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
               <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
            </div>
            <div className="mb-3">
               <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
               <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
            </div>
            <div className="mb-3">
               <label htmlFor="exampleInputPassword1" className="form-label">Confirm password</label>
               <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
         </form>
      </div>
   )
}

export default Signup
