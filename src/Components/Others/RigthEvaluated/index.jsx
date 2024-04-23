import React from 'react'
import './style.css'
import logo from './logo.png'
import CardEvaluated from '../CardEvaluated'
import Image from 'next/image'

const RigthEvaluated = ({text}) => {
  return (
    <div className='rigthEvaluated-container'>
        <div className="rigthEvaluated-first-column">
            {text.firstColumn.map((item, index) => (
                <CardEvaluated key={index} text={item} type={1} />
                
            ))}

            <CardEvaluated text={text.featured} scale type={2} />
        </div>
        <div className="rigthEvaluated-second-column">
            {text.secondColumn.map((item, index) => (
                <CardEvaluated key={index} text={item} type={2} />
                
            ))}
            <div className="rigthEvaluated-second-column_message">
                {text.description}
                <Image src={logo} className='rigthEvaluated-second-column_message_logo' alt="logo" />
            </div>
        </div>
    </div>
  )
}

export default RigthEvaluated