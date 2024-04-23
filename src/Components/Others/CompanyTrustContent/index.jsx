import Image from 'next/image';
import React from 'react'


const CompanyTrustContent = ({text, icons}) => {
  return (
    <div className="company-trust-content ">
            <h2>{text}</h2>
            <div className="company-trust_logo ">
                {icons.map((item, index) => (
                    <div key={index} className='company-trust_logo-item'>
                        <Image
                        alt='logo-company'
                        width={'100px'}
                        src={item}
                        />
                    </div>
                ))}
            </div>
        </div>
  )
}

export default CompanyTrustContent