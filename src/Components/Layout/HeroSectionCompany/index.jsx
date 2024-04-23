import React from 'react'
import './style.css'
import LeftContainerCompany from '../../Others/LeftContainerCompany'
import RigthContainerCompany from '../../Others/RigthContainerCompany'


const HeroSectionCompany = ({text}) => {
  return (
    <section className='homeCompany-container '>
        <div className='homeCompany-content '>
            <LeftContainerCompany text={text.leftContent} />
            <RigthContainerCompany img={text.img} />
        </div>
    </section>
  )
}

export default HeroSectionCompany