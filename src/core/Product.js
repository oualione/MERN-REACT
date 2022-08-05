import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOneProduct, getRelatedProduct } from './ApiCore'
import Card from './Card'
import Layout from './Layout'

function Product(ViewBtn) {

  const [product, setProduct] = useState({})
  const [related, setRelated] = useState([])
  let { id } = useParams()

  useEffect(() => {

    getOneProduct(id)
      .then(res => {
        setProduct(res)
        return getRelatedProduct(id)
      })
      .then(related => setRelated(related))
      .catch(err => console.error(err))

  }, [id])


  return (
    <div>
      {product && product.description && (
        <Layout title={product.name} description={product.description} className="container text-center mt-3">



          <div className="row">
            <div className="col-md-9">
              <Card product={product} ViewBtn={false} />
            </div>
            <div className="col-md-3">
              {related.map((product, i) => (

                <Card key={i} product={product} />

              ))}
            </div>
          </div>

        </Layout>
      )}
    </div>
  )
}

export default Product