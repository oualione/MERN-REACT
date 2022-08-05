import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddCategory from './admin/Category/AddCategory';
import AddProduct from './admin/product/AddProduct';
import { AdminRoute } from './auth/AdminRoute';
import { PrivateRoute } from './auth/PrivateRoute';
import { UserRoute } from './auth/UserRoute';
import Cart from './core/Cart';
import Home from './core/Home';
import Menu from './core/Menu';
import Product from './core/Product';
import Shop from './core/Shop';
import AdminDashboard from './user/AdminDashboard';
import Dashboard from './user/Dashboard';
import Signin from './user/Signin';
import Signup from './user/Signup';


function Routing() {
  return (

    <Router>
      <Menu />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/dashboard"
          element={
            <UserRoute>
              <Dashboard />
            </UserRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/category/create"
          element={
            <AdminRoute>
              <AddCategory />
            </AdminRoute>
          }
        />

        <Route
          path="/product/create"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/shop"
          element={
            <PrivateRoute>
              <Shop />
            </PrivateRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />
        {/* <Route path='/user/dashboard' element={<Dashboard/>} /> */}
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/login" element={<Signin />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default Routing