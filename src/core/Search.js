import React, { Fragment } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getCategories, getProducts } from './ApiCore'
import Card from './Card'

function Search() {


    const [categories, setCategories] = useState([])
    const [searchData, setSearchData] = useState({search : '', category : ''})
    const [products, setProducts] = useState([])


    const handlSearch = (e) => {
        setSearchData({...searchData, [e.target.id] : e.target.value})
    }

    const submitSearch = (e) => {
        e.preventDefault();

        let {search, category} = searchData

        if(search || category) {

            getProducts({search: search || undefined, category})
              .then(res => setProducts(res))
        }
        else {
            setProducts([])
        }
       
    }

    const searchMessage = () => {
        return products && products.length > 0 && (
            <h2>{products.length} Proudut Found</h2>
        )
    }

    useEffect(() => {

        getCategories()
            .then((categories) => setCategories(categories))
            .catch((error) => console.error(error))

    }, [])

    return (
        <Fragment>
            <form onSubmit={submitSearch}>
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select onChange={handlSearch} id="category" className="form-select" aria-label="Default select example">
                            <option value="">Select a Category</option>
                            {categories.map((category, i) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input onChange={handlSearch} id="search" type="search" className="form-control input-group rounded mx-4" />
                    <div className="input-group-apprend">
                        <button className="btn btn-light mx-3" id="search-addon">
                            SEARCH <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </form>
            <hr className='mt-4' />
            {searchMessage()}
            <div className="row">
                {products.map((product, index) => (
                    <div key={index} className="col-md-4">
                        <Card product={product}></Card>
                    </div>
                ))}
                
            </div>
        </Fragment>


    )
}

export default Search