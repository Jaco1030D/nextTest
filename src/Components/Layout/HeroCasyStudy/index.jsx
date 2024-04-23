import React from 'react'
import LeftContainerCasy from '../../Others/LeftContainerCasy'
import RightContainerCasy from '../../Others/RightContainerCasy'
import './style.css'

const HeroCasyStudy = ({text}) => {
  return (
    <section className='HeroCase-container '>
        <div className='HeroCase-content '>
            <LeftContainerCasy text={text} />
            <RightContainerCasy text={text.right} />
        </div>
    </section>
  )
}

export default HeroCasyStudy