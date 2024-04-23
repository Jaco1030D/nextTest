import React from 'react'
import img from './image.svg'
import './style.css'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const RigthContainerMain = ({text}) => {
  console.log(text);
  return (
    <div className='main_rigth'>
      <p className='main_rigth_text' dangerouslySetInnerHTML={{ __html: text }} >
      </p>
      <LazyLoadImage src={img} width={'795px'} height={'795px'} alt="blob_with_people" />
    </div>
  )
}

export default RigthContainerMain