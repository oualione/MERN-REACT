import React from 'react'

function Layout({title, description, className, children}) {
  return (
    <div>
        <div className="p-5 text-center bg-light mt-5">
            <h1 className="mb-3">{title}</h1>
            <h4 className="mb-3">{description}</h4>
        </div>
        <div className={className}>
            {children}
        </div>
    </div>
  )
}

export default Layout