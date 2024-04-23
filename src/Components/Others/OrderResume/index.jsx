import React from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'

const OrderResume = ({text, translation, origin, value, finalDate, typeService, numWords, archiveType, arrayValues}) => {
  const navigate = useNavigate()

  const handleClick = async () => {
    navigate('/')
  }
  return (
    <div className='checkout-rigth'>
        <div className="content-checkout-rigth">
        <h2 className='title-rigth-container'>{text.title}</h2>

        <div className="languages-resume">
          <div className="item-resume title-item-resume">{text.subTitle}</div>
          <div className="item-resume">{text.item[0]} {origin} {text.item[1]}:</div>
          {translation.map((item, index) => (

          <div key={item} className="item-resume"><p className='language-item'>{item}</p> <p>R$ {arrayValues[index].toFixed(2)}</p></div>
          ))}
          <div className="item-resume"><p className='total-item-resume'>{text.total}</p> <p>R$ {value}</p></div>

        </div>

        <div className="deadline">
          <div className="item-resume">
            <p className='title-item-resume' >{text.time}</p> <p>{finalDate}h</p>
          </div>
        </div>

        <div className="data-documents">
          <div className="item-resume title-item-resume">{text.dataItem.title}</div>
          <div className="item-resume"><p>{text.dataItem.itens[0]}</p> <p className='title-item-resume' >{typeService}</p></div>
          <div className="item-resume"><p>{text.dataItem.itens[1]}</p> <p>{numWords}</p></div>
          <div className="item-resume"><p>{text.dataItem.itens[2]}</p> <p>{archiveType}</p></div>
        </div>

        <button className='btn-back' onClick={handleClick}>{text.button}</button>
        <br />
        </div>
    </div>
  )
}

export default OrderResume