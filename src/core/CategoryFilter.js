import React from 'react'
import { useState } from 'react'

function CategoryFilter({categories, handleFilters}) {

  const [checked] = useState(new Set())

  const handlCategory = (category) => {

      if(checked.has(category._id)){
          checked.delete(category._id)
      }else{
        checked.add(category._id)
      }
      handleFilters(Array.from(checked))
  }



  return (
    <div>
        <h3>FILTER BY CATEGORY</h3>
        <ul className="list-unstyled">
            {categories && categories.map((categroy, index) => (
                <div key={index} className="form-check">
                <input className="form-check-input" onClick={() => handlCategory(categroy)} type="checkbox" value={categroy._id} id={index} />
                <label className="form-check-label" htmlFor={index}>{categroy.name}</label>
              </div>
            ))}
        </ul>
    </div>
  )
}

export default CategoryFilter