import React, { Fragment } from 'react'
import { isAuth } from '../auth/helpers'
import Layout from '../core/Layout'
import { Link } from 'react-router-dom'


function AdminDashboard() {

  const { user: { name, email, role } } = isAuth()

  const adminInfo = () => {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">ADMIN INFPORMATION</h5>
          <ul className="list-group list-group-light">
            <li className="list-group-item px-3">{name}</li>
            <li className="list-group-item px-3">{email}</li>
            <li className="list-group-item px-3">{role ? 'ADMIN' : 'USER'}</li>
          </ul>
        </div>
      </div>
    )
  }

//   const userHistory = () => {
//     return (
//       <div className="card">
//         <div className="card-body">
//           <h5 className="card-title">PURCHASE HISTORY</h5>
//           <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//           <button type="button" className="btn btn-primary">Button</button>
//         </div>
//       </div>
//     )
//   }

  const adminLinks = () => {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">ADMIN LINKS</h5>
          <ul className="list-group list-group-light">
            <Link to='/product/create'>CREATE NEW PRODUCT</Link>
            <Link to='/category/create'>CREATE NEW CATEGORY</Link>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <Fragment>
      <Layout className={"container"} title={"DASHBOARD"} description={`${name.toUpperCase()}`}>
        <h1 className='text-center'>ADMIN DASHBOARD</h1>
        <div className="row">
          <div className="col-md-6">
            {adminInfo()}
          </div>
          <div className="col-md-6">
            {adminLinks()}
          </div>


        </div>
      </Layout>
    </Fragment>
  )
}

export default AdminDashboard