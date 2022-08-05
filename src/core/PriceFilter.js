import React from 'react'

function PriceFilter({handleFilters}) {

    const prices = [
        {
            _id: 1,
            name: "Any",
            value: []
        },
        {
            _id: 2,
            name: "0$ to 39$",
            value: [0, 39]
        },
        {
            _id: 3,
            name: "40$ to 79$",
            value: [40, 79]
        },
        {
            _id: 4,
            name: "80$ to 119$",
            value: [80, 119]
        },
        {
            _id: 5,
            name: "120$ to 160$",
            value: [120, 160]
        },
        {
            _id: 6,
            name: "More",
            value: [161, 9999999]
        }
    ]

    const handlePrice = (e) => {
        handleFilters(prices[e.target.value]['value'])
    }

  return (
    <div>
        <h4>FILTER BY PRICE</h4>
        

        {prices.map((price, index) => (
            <div key={index} className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id={`${index}-price_id`} value={index} onChange={handlePrice} />
            <label className="form-check-label" htmlFor={`${index}-price_id`}> {price.name} </label>
          </div>
        ))}
    </div>
  )
}

export default PriceFilter