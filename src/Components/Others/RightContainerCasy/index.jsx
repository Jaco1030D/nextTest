import React from 'react'
import './style.css'

const RightContainerCasy = ({text}) => {
  return (
    <div className='main-rigth-container'>
      <img src={text.img} className='img-hero' alt='zf-empresa' />
      <div className='rectngle-img-case-study' >
      <span dangerouslySetInnerHTML={{ __html: text.text }}>
      </span>
      </div>
    </div>
  )
}

export default RightContainerCasy