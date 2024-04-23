import React from 'react'
import './style.css'
import Image from 'next/image';

const FooterCompany = ({text, alternative}) => {
  return (
    <div className='footerCompany margintop0'>
        {!alternative && <div className='company-trust_gradient '> </div> }
        <Image src={text.logo} width={'185px'} className='index' alt="logo" />
        <p className='paragraph index'>{text.paragraph}</p>
        <p className='rights index'>{text.rights}</p>
    </div>
  )
}

export default FooterCompany