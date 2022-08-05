import React, { useEffect, useState } from 'react'
import { filterProduct, getCategories } from './ApiCore'
import Card from './Card'
import CategoryFilter from './CategoryFilter'
import Layout from './Layout'
import PriceFilter from './PriceFilter'
import Search from './Search'



function Shop() {

    const [categories, setCategories] = useState([])
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(3)
    const [size, setSize] = useState(0)
    const [filteredProduct, setFilteredProduct] = useState([])
    const [myFilter, setMyFilter] = useState({
        category : [],
        price : []
    })

    useEffect(() => {
        getCategories()
        .then((res) => setCategories(res))

        filterProduct(skip, limit, myFilter)
        .then(res => {
            setFilteredProduct(res)
            setSkip(0)
            setSize(res.length)
        })

    }, [myFilter])

    const handleFilters = (data, filterBy) => {

        setMyFilter({
            ...myFilter,
            [filterBy] : data,
            
            
        })

       
        //console.log('SHOP', data, filterBy)
    }


    const loadMore = () => {
        
        const toSkip = skip + limit;

        filterProduct(toSkip, limit, myFilter)
        .then(res => {
            setFilteredProduct([...filteredProduct, ...res])
            setSize(res.length)
            setSkip(toSkip)
        })
    }

    const buttonToLoadMore = () => {

        return (
            size > 0 && 
            size >= limit &&
            (
                <div className="text-center">
                     <button onClick={loadMore} className="btn btn-outline-dark">Load More</button> 
                </div>
            )
        )

    }

  return (
    <div>
        <Layout title="SHOP" description="ONLINE SHOPPING" className="container text-center mt-3"> 
       
            <div className="row">
                <div className="col-md-3 mt-4">
                   <CategoryFilter 
                   categories={categories} 
                   handleFilters={(data) => handleFilters(data, 'category')}
                   />
                   <hr/>
                   <PriceFilter handleFilters={(data) => handleFilters(data, 'price')}/>
                </div>
                
                <div className="col-md-9">
                       
                       <div className="row mb-5">
                           {filteredProduct.map((product, i) => (
                           <div key={product._id} className="col-md-4">
                                   <Card product={product}></Card> 
                           </div>  
                           ))}
                       </div>

                       <div className="text-center">
                        {buttonToLoadMore()}
                       </div>
                     
                   </div>
                
            </div>
        </Layout>
    </div>
  )
}

export default Shop