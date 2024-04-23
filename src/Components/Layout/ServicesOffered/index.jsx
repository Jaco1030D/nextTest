import React from 'react'
import './style.css'
import elipse from './elipse.svg'
import logoleft from './logo-left.png'
import Image from 'next/image'

const ServicesOffered = ({text, type}) => {
  return (
    <div className='serviceOffered-container'>
        <div className="serviceOffered-content ">
        <Image className='serviceOffered-elipse' src={elipse} alt="elipse" />
            <div className="serviceOffered-content_card">
                <div className="serviceOffered_featured-card">
                    <h2 dangerouslySetInnerHTML={{ __html: text.featured.title }}></h2>
                    <p dangerouslySetInnerHTML={{ __html: text.featured.text }}></p>
                </div>
            </div>
            {text.card.map((item, index) => (
                <div key={index} className="serviceOffered-content_card">
                    <div className="serviceOffered_card">
                        <h2>{item.title}</h2>
                        <p>{item.text}</p>
                        <div className="serviceOffered-card_rectangle"></div>
                    </div>
                </div>
            ))}
            <Image id='serviceOffered-logo-Left' src={logoleft} alt="logo" />
            <Image id='serviceOffered-logo-Rigth' src={logoleft} alt="logo" />
            
            
        </div>
        {type === 2 && <div className="serviceOffered_gradient"></div>}

    </div>
  )
}

export default ServicesOffered