import React from 'react'
import './style.css'
import img from './img.png'
import Button from '../Button'
import Image from 'next/image'

const ExpertiseSection = ({text}) => {
  return (
    <div className='expertiseSection-container'>
        <div className="expertiseSection_texts">
            <h2 className='expertiseSection_texts-title' dangerouslySetInnerHTML={{ __html: text.title }}></h2>

            <p className='expertiseSection_texts-subtitle' dangerouslySetInnerHTML={{ __html: text.subTitle }}></p>
        </div>
        <div className="expertiseSection-content">
            <div className="expertiseSection-infos">

                {text.cards.map((item, index) => (
                    <div key={index} className='expertiseSection-card'>
                        <h2 >{item.title}</h2>
                        <p>{item.subtitle}</p>
                    </div>
                ))}
            </div>

            <Image src={img} alt='Atendente Tele-marketing' />
        </div>

        <Button text={text.button} />

        <br />
        <br />
        <br />

        <div className="Evaluated-projects_gradient"></div>
    </div>
  )
}

export default ExpertiseSection