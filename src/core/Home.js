import React, { useEffect, useState } from 'react'
import { getProducts } from './ApiCore'
import Card from './Card'
import Layout from './Layout'
import Search from './Search'

function Home() {



  const [productBestSeller, setProductBestSeller] = useState([])
  const [productArrivals, setProductArrivals] = useState([])


  const loadBestSeller = () => {
    getProducts({sortBy: 'sold', orderBy : 'desc', limit : 6})
      .then((products) => setProductBestSeller(products))
  }
  const loadArrivals = () => {
    getProducts({sortBy : 'createdAt', orderBy: 'desc', limit: 3})
      .then((products) => setProductArrivals(products))
  }

  useEffect(() => {
    loadBestSeller()
    loadArrivals()
  }, [])


  return (
    <div>
      <Layout title="HOME" description="WELCOME TO OUALIONE STORE" className="container text-center mt-3">

        <div className="row mb-5">
          
          <Search></Search>
        </div>
        <h1>ARRIVAL PRODUCT</h1>
        <div className="row">
          {productArrivals.map((product, index) => (
            <div key={index} className="col-md-4">
              <Card product={product}></Card>
            </div>
          ))}
        </div>
        <hr />
        <h1>BEST SEELER</h1>
        <div className="row">
          {productBestSeller.map((product, index) => (
            <div key={index} className="col-md-4">
              <Card product={product}></Card>
            </div>
          ))}
        </div>
      </Layout>
    </div>
  )
}

export default Home