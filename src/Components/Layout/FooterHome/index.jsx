import React from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';
import { useMainContext } from '../../../context/MainContext';


const FooterHome = ({text}) => {
  const [state] = useMainContext()
    const navigate = useNavigate()
    const handleClick = () => {
      window.scrollTo(0, 0);
      navigate('/' + state.languageSite + '/terms')
    }
  return (
    <div className="checkout-footer">
      <p>2008 - 2024 Magma Translation<sup>TM</sup></p>
      <p>{text.rights}</p>
      <p id='terms-link' onClick={handleClick}> {text.terms}</p>
      </div>
  )
}

export default FooterHome