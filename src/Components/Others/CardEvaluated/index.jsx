import React from 'react'
import './style.css'
import Image from 'next/image'


const CardEvaluated = ({text, type, scale}) => {
  return (
    <div className={`cardProject ${type === 1 ? 'type1' : 'type2'} ${scale && 'scale'}`}>
        <Image
        alt={text.title || text.name}
        src={text.img}
        />
            {type === 1 && (
                <div className='cardProject_texts'>
                    <span>{text.title}</span>
                    <p>{text.subTitle}</p>
                </div>
            )}
            {type === 2 && (
                <div className='cardProject_texts_type2'>
                    <span>{text.name}</span>
                    <p>{text.numWords}</p>
                    <p id='percent'>{text.percent}</p>
                </div>
            )}
        
    </div>
  )
}

export default CardEvaluated