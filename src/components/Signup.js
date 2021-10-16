import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

const Signup = () => {
    const [credential, setCredential] = useState({name:"", email:"", password:"", confirmPassword:""})
    let history = useHistory();
      const handleSubmit = async (e)=>{
          e.preventDefault();
                  //API call
                  const {name, email, password} = credential
                  const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                         body: JSON.stringify({name, email, password})
  
                    });
                    const json = await response.json();
                    console.log(json); 
                    if(json.success){
                      //save the auth token and redirect
                      localStorage.setItem('token', json.authtoken)
                      history.push("/login");
                    }
                    else{
                      alert('Invalid credential')
                    }
      }
      const onChange=(e)=>{
        setCredential({...credential, [e.target.name]: e.target.value})
    }
    return (
        <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="name" className="form-control" id="name" onChange={onChange} name="name" aria-describedby="emailHelp" required/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" onChange={onChange} name="email" aria-describedby="emailHelp" required/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" onChange={onChange} name="password" required minLength={5}/>
  </div>
  <div className="mb-3">
    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="confirmPassword" onChange={onChange} name="confirmPassword" required minLength={5}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    )
}

export default Signup
