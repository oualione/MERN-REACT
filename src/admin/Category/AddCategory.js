import React from 'react'
import { useState } from 'react'
import Layout from '../../core/Layout'
import { API_URL } from '../../config'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { isAuth } from '../../auth/helpers'



function AddCategory() {



  const [name, setName] = useState('');

  const handlForm = (e) => {
    setName(e.target.value)
  }

  const submitCategory = (e) => {
    e.preventDefault();

    const { user, token } = isAuth()

    fetch(`${API_URL}/category/create/${user._id}`, {
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({name})
  }).then((res) => res.json())
      .then((res) => {
        if (res.error) {
          toastr.error(res.error, 'Failed to Create a new Category !! Try Again Later', {
            "positionClass": "toast-bottom-left",
          })
        } else {
          toastr.success('WELL DONE', 'CATEGORY CREATED SUCCESSFULY', {
            "positionClass": "toast-bottom-left",
          })
          setName("")

        }
        
      })
      .catch((error) => toastr.error(error, 'SERVER ERROR !', {
        "positionClass": "toast-bottom-left",
      }))

  }


  return (
    <div>
      <Layout title="CATEGORY" description="CREATE NEW CATEGORY" className="container text-center mt-3">
        <h1>ADD CATEGORY</h1>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-body">
                <form onSubmit={submitCategory}>
                  <div className="form-group">
                    <label htmlFor="name"></label>
                    <input autoFocus onChange={handlForm} value={name} type="text" name="name" id="name" className="form-control" placeholder="ENTER NEW CATEGORY" aria-describedby="helpId" />
                    <button type="submit" className="btn btn-success btn-block mt-4">ADD CATEGORY</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default AddCategory