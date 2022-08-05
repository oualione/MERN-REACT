import React from 'react'
import {Link} from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { addToCart } from '../actions/cartActions'



function Card({product, ViewBtn = true}) {

  let dispatch = useDispatch()

  const showQuantity = (quantity) => {
    return quantity > 0 ? <span className="badge badge-success"> {quantity} In Stock</span> : <span className="badge badge-danger">Out Of Stock</span>
  }
  return (
    <div>
        <div className="card mt-2">
            <div className="card-body">
            <ShowImage item={product} url="product/photo" className="card-img-top"></ShowImage>
                <h4 className="card-title">{product.name}</h4>
                <p className="card-text">{product.description}</p>
                <div>
                  <span className="badge badge-secondary">$ {product.price}</span>
                </div>
                <div>
                  <span className="badge rounded-pill badge-dark mb-2">{product.category.name}</span>
                </div>
                {ViewBtn && (
                <Link to={`/product/${product._id}`} >
                <button type="button" className="btn btn-warning mx-2"><i className="fas fa-eye"></i></button>
                </Link>
                )}
               
               {product.quantity > 0 && (
                    <button type="button" onClick={()=> dispatch(addToCart(product))} className="btn btn-info mx-2"><i className="fas fa-cart-plus"></i></button>
               )}
                  

                <div className="well">
                  {showQuantity(product.quantity)}
                  <hr />
                  <span>CREATED AT {moment(product.createdAt).fromNow()}</span>
                </div>
                
                
               

            </div>
        </div>
    </div>
  )
}

export default Card