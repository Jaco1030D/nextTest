import React from 'react'
import Button from '../../Layout/Button'
import './style.css'
import Image from 'next/image'

const LeftContainerCompany = ({text}) => {
  return (
    <div className='leftContainerCompany-container'>
        <div className='leftContainerCompany_texts'>
            <h1>{text.title.p} <span>{text.title.s} </span> {text.title.t}</h1>
            <p>{text.subtitle}</p>
        </div>
        <div className='leftContainerCompany_buttons'>
            <Button text={text.textButton[0]} />
            <Button text={text.textButton[1]} type2 handleClick={'/'} />
        </div>
        <div className="leftContainerCompany_icons">
          {text.icons.map((item, index) => (
            <Image src={item} key={index} alt="selo qualidade" />
          ))}
        </div>
    </div>
  )
}

export default LeftContainerCompany