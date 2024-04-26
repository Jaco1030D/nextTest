import React from 'react'
import './style.css'
import Image from 'next/image'
import img1 from './img/img1.png'
import img2 from './img/img2.png'
import logo from './img/logo.png'
import seta from './img/seta.png'
import elipse from './img/elipse.png'
const text = {
    navbar: {
        items: [
            { text: 'Home' },
            { text: 'Para empresas' },
            { text: 'Log in' },
            { text: 'Contato' },
            { text: 'Orçamento Online' }
        ],
    },
    mainContent: {
        title: ['Serviço de Tradução', ' de excelência'],
        subtitle: 'Com mais de uma década de experiência, a Magma é uma marca confiável que trabalha com pequenas empresas e gigantes globais, como a Shopee e a ZF.',
        buttons: [
            {
                text: 'Fale com um Especialista'
            },
            {
                text: 'Orçamento Online'
            }
        ],
    },

};
const Component = () => {
  return (
    <div className='heroSection'>
        <nav>
            <div>

            <Image src={logo} width={'132px'} height={'34.4px'} alt='logo da empresa' />

            <div className='items-navbar'>
                <p>{text.navbar.items[0].text}</p>
                <p>{text.navbar.items[1].text}</p>
                <p>{text.navbar.items[2].text}</p>
                <span id='contact'>{text.navbar.items[3].text}</span>
                <span id='blue'>{text.navbar.items[4].text}</span>
            </div>
            </div>
        </nav>
        <div className='main'>
            <div className="main-content">
            <h1>{text.mainContent.title[0]} <br /> <span id='other'>{text.mainContent.title[1]}</span></h1>
            <p>
                {text.mainContent.subtitle}
            </p>

            <div className="buttons">
                <div className='button btn-first'>
                    <p>{text.mainContent.buttons[0].text}</p>
                    <div className='frame-green'>
                        <Image src={seta} alt='seta' width={'18.6px'} height={'20.27px'} />
                    </div>
                </div>
                <div className='button btn-secondery'>
                    <p>{text.mainContent.buttons[1].text}</p>
                    <div className='frame-green'>
                        <Image src={seta} alt='seta' width={'18.6px'} height={'20.27px'} />
                    </div>
                </div>
            </div>
            </div>
            <Image className='img-p' src={img1} alt='linhas e imagens' />
            <Image className='img-s' src={img2} alt='linhas e imagens' />
            <Image className='img-e' src={elipse} alt='circulos' />
        </div>
    </div>
  )
}

export default Component