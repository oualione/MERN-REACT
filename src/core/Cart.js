import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { decrementProduct, incrementProduct, removeFromCart } from '../actions/cartActions'
import Checkout from './Checkout'
import Layout from './Layout'
import ShowImage from './ShowImage'

function Cart() {

    let productsInCart = useSelector(state => state.cart.products)
    let dispatch = useDispatch()

    const ImgStyle = {

        width: "100px",
    };

    return (
        <div>
            <Layout title="SHOP" description="ONLINE SHOPPING" className="container text-center mt-3">

                <div className="row">
                    <div className="col-md-9">
                        {productsInCart.length > 0 ? (
                        <table className="table align-middle mb-0 bg-white">
                            <thead className="bg-light">
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Actions</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>

                            
                                <tbody>
                                    {productsInCart.map((product, index) => (

                                        <tr key={index}>
                                            <td width="45px">
                                                <ShowImage item={product} url="product/photo" className="card-img-top"></ShowImage>
                                            </td>
                                            <td>
                                                <p className="fw-normal mb-1">{product.description}</p>
                                            </td>
                                            <td>
                                                <h4><span className="badge rounded-pill badge-dark">$ {product.price}</span></h4>
                                            </td>
                                            <td>{product.count}</td>
                                            <td>{product.count * product.price}</td>
                                            <td>
                                                <button type="button" onClick={() => dispatch(incrementProduct(product))} className="btn btn-success btn-floating mx-1">
                                                    <i className="fas fa-plus-circle"></i>
                                                </button>

                                                {product.count > 1 && (
                                                    <button type="button" onClick={() => dispatch(decrementProduct(product))} className="btn btn-danger btn-floating">
                                                        <i className="fas fa-minus-circle"></i>
                                                    </button>
                                                )}

                                            </td>
                                            <td>
                                                <button type="button" onClick={() => dispatch(removeFromCart(product._id))} className="btn btn-danger btn-rounded">
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}


                                </tbody>

                           

                        </table>
                        ) : 
                            <div className="alert alert-warning" role="alert">
                                YOUR CART IS EMPTY ! START SHOPPING <Link to="/shop">HERE</Link>
                            </div>
                        }
                    </div>
                    <div className="col-md-3">
                        <Checkout products={productsInCart} />
                    </div>

                </div>
            </Layout>
        </div>
    )
}

export default Cart