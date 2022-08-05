import React from 'react'
import { useState } from 'react'
import { API_URL } from '../config'
import Layout from '../core/Layout'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { useNavigate } from 'react-router-dom';




function Signup(props) {

  const history = useNavigate()

  const [user, setUser] = useState({
    name : '',
    email : '',
    password : ''
  })


  const handleForm = (e) => {

    setUser({...user, [e.target.name] : e.target.value})

  }


  const signUp = (e) => {

      e.preventDefault();

      fetch(`${API_URL}/sign-up`, {
        method : "POST",
        headers : {
          "Accept" : "application/json",
          "Content-Type" : "application/json",
        },
        body : JSON.stringify(user)
      }).then((res) => res.json())
        .then((user) => {
          if(user.error){
            toastr.error(user.error, 'PLEASE CHECK YOUR FORM !', {
              "positionClass": "toast-bottom-left",
            })
          }else{
            toastr.success('SUCCESS','PLEASE SIGN IN NOW !', {
              "positionClass": "toast-bottom-left",
            })
            history('/login');
          }
        })
        .catch((error) => toastr.error(error, 'SERVER ERROR', {
          "positionClass": "toast-bottom-left",
        }))

  }

  const form = () => (

    <div className="card">
      <div className="card-header">REGISTER</div>
      <div className="card-body">
        <h5 className="card-title">CREATE NEW ACCOUNT</h5>

        <form onSubmit={signUp}>
          <div className="form-group mb-4">
            <input type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter Your Full Name" 
              onChange={handleForm}/>
          </div>

          <div className="form-group mb-4">
            <input type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter Your Email" 
              onChange={handleForm}/>
          </div>

          <div className="form-group mb-4">
            <input type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter Your Password" 
              onChange={handleForm}/>
          </div>
          




          <button type="submit" className="btn btn-success btn-block">SIGN UP</button>
        </form>

      </div>
    </div>

  )
  return (
    <div>
      <Layout title="SIGN UP" description="CREATE A NEW ACCOUNT" className="container text-center mt-4">
       <div className="row">
        <div className="col-md-6 mx-auto">
        {form()}
        </div>
       </div>
      </Layout>
    </div>
  )
}

export default Signup