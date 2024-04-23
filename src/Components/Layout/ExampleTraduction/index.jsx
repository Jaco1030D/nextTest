import './style.css'
import Button from '../Button'
import Image from 'next/image'

const ExampleTraduction = ({text}) => {
  return (
    <section className='exampleTraduction-container'>
        <div className="exampleTraduction_texts">
            <h2>{text.title}</h2>
            <p>{text.subtitle}</p>
        </div>
        <div className="exampleTraduction-content">
            {text.cards.map((item, index) => (

            <div key={index} className="exampleTraduction-card">
                <Image src={item.img} width={'26px'} alt="" />
                <span>{item.title}</span>
                <p>{item.subTitle}</p>
            </div>
            ))}
            
        </div>

        <Button text={text.button} />
    </section>
  )
}

export default ExampleTraduction