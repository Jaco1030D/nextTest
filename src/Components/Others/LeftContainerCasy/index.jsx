import React from 'react'
import './style.css'
import Button from '../../Layout/Button'

const LeftContainerCasy = ({text}) => {
  return (
    <div className='leftContainerCase-container'>
      <div className="leftContainerCase_texts">
        <h2>{text.title}</h2>
        <span>{text.subtitle}</span>
        <p>{text.paragraph}</p>
      </div>

      <div className='leftContainerCompany_buttons'>
            <Button text={text.buttons[0]} />
            <Button text={text.buttons[1]} type2 handleClick={'/'} />
        </div>
    </div>
  )
}

export default LeftContainerCasy