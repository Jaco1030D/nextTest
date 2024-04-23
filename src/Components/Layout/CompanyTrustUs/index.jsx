import React from 'react'
import './style.css'
import Button from '../Button'
import CompanyTrustContent from '../../Others/CompanyTrustContent'

const CompanyTrustUs = ({text, icons, gradient = false, alternative, textButton}) => {
  return (
    <div className={`company-trust-container ${gradient && 'gradient'} ${alternative && 'backgroundcolorwhite'}`}>
        {gradient && (
          <div className='company-trust_gradient '></div>    
        )}
        <CompanyTrustContent icons={icons} text={text} />

        {alternative && <div className='button-container'>
            <Button text={textButton} />
          </div>}
    </div>
  )
}

export default CompanyTrustUs