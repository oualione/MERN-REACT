import React from 'react'
import { useState } from 'react'
import Layout from '../../core/Layout'
import { API_URL } from '../../config'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { isAuth } from '../../auth/helpers'
import { useEffect } from 'react'



function AddProduct() {



    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        category : "",
        photo : false

    });

    const [formData, setFormData] = useState(new FormData())

    const [categories, setCategories] = useState([])

    useEffect(() => getCategories(), [])


     const getCategories = () => {

        fetch(`${API_URL}/category`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => setCategories(res.categories))
        .catch(err => console.error(err))

     }

    const handlForm = (e) => {

        const value = e.target.id === "photo" ? e.target.files[0] : e.target.value
        formData.set(e.target.id , value)
        setProduct({...product ,[e.target.id] : value})
    }

    const submitProduct = (e) => {
        e.preventDefault();

        const { user, token } = isAuth()

        fetch(`${API_URL}/product/create/${user._id}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                toastr.warning(res.error, 'Please Check form !', {
                    positionClass: "toast-bottom-left",
                })
            }
            else {
                toastr.success(`Product ${product.name} created`, 'new Product', {
                    positionClass: "toast-bottom-left",
                })

                setProduct({
                    photo: '',
                    name: '',
                    description: '',
                    quantity: 0,
                    price: 0,
                    shipping: false,
                    category: 0
                })

                setFormData(new FormData())

            }

        })
        .catch(err =>  toastr.error(err, 'Server error !', {
                    positionClass: "toast-bottom-left",
                }))

    }


    return (
        <div>
            <Layout title="PRODUCT" description="CREATE NEW CATEGORY" className="container text-center mt-3">
                <h1>ADD PRODUCT</h1>
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={submitProduct}>
                                    <div className="form-group mb-4">
                                        <input autoFocus onChange={handlForm} type="text" value={product.name} name="name" id="name" className="form-control" placeholder="NAME" aria-describedby="helpId" />
                                    </div>
                                    <div className="form-group mb-4">
                                        <textarea name="description" value={product.description} onChange={handlForm} id="description" cols="30" rows="3" className="form-control" placeholder="DESCRIPTION" aria-describedby="helpId"></textarea>
                                    </div>
                                    <div className="form-group mb-4">
                                        <input autoFocus onChange={handlForm} type="number" value={product.price} name="price" id="price" className="form-control" placeholder="PRICE" aria-describedby="helpId" />
                                    </div>
                                    <div className="form-group mb-4">
                                        <input autoFocus onChange={handlForm} type="number" value={product.quantity} name="quantity" id="quantity" className="form-control" placeholder="QUANTITY" aria-describedby="helpId" />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label className="form-label" htmlFor="customFile">PHOTO</label>
                                        <input type="file" onChange={handlForm} className="form-control" id="photo" name="photo" />
                                    </div>
                                    <div className="form-group mb-4">
                                    <div className="form-group">
                                        <select className="form-select" value={product.shipping} id="shipping" onChange={handlForm} aria-label="Default select example">
                                            <option defaultValue>SELECT SHIPPING</option>
                                            <option value="false">NO</option>
                                            <option value="true">YES</option>
                                            
                                        </select>
                                    </div>
                                    </div>
                                    <div className="form-group mb-4">
                                        <div className="form-group">
                                            <select className="form-select" value={product.category} id="category" onChange={handlForm} aria-label="Default select example">
                                            <option value="0">SELECT CATEGORY</option>
                                                {categories && categories.map((category, index) => (
                                                    <option key={index} value={category._id}>{category.name}</option>
                                               ))}
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-success btn-block">ADD PRODUCT</button>



                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default AddProduct