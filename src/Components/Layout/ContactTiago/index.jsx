import React from 'react'
import './style.css'

const ContactTiago = ({text}) => {
  return (
    <section className='contactTiago-container '>
        <div className="contactTiago-content ">
            <img src={text.img} width={'80px'} height={'80px'} alt="Tiago" />
            <div className="contactTiago_texts">
                <span>{text.title}</span>
                <p>{text.subtitle}</p>
            </div>
            <button className='contactTiago_button'>
              <a href="https://pages.magmatranslation.com/solicite-um-orcamento">Contato</a>
            </button>
        </div>
    </section>
  )
}

export default ContactTiago