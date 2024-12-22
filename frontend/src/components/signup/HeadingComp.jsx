import React from 'react'

const headingComp = ({first,second}) => {
    return (
      <div>
          <h1 className='signup-heading'>
             {first} <br /> {second}
          </h1>
      </div>
    )
  }

export default headingComp