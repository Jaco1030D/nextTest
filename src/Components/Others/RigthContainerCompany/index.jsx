import React from 'react'
import elipse from './elipse.svg'
import './style.css'
import Image from 'next/image'

const RigthContainerCompany = ({img}) => {
  return (
    <div className='rigthContainerCompany-container img-hero'>
        <Image src={img} alt="hero-section" />
        <Image className='serviceOffered-elipse' src={elipse} alt="elipse-detail" />
    </div>
  )
}

export default RigthContainerCompany