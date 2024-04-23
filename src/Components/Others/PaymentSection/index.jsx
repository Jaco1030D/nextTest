import './style.css'
import padlock from './padlock.svg'
import padlockbuy from './padlock-buy.svg'
import pci from './pci.svg'
import CardPayment from '../../Layout/CardPayment'

const PaymentSection = ({text, value, setDocument, handleClick, archivesURL, setArchivesURL, name}) => {
  return (
    <div className='container-payment-section'>
        <h2 className='title-paymant-section'>{text.title} </h2>
          <CardPayment value={parseFloat(value)} name={name} setDocument={setDocument} handleClick={handleClick} archivesURL={archivesURL} setArchivesURL={setArchivesURL}/>

      <div className="texts">
        <div className="pad-lock">
          <img src={padlock} alt="" />
          <p>{text.description}</p>
        </div>
        <div className="pad-lock-buy">
          <img src={padlockbuy} alt="" />
          <div className="pad-lock-buy-texts">
            <span>{text.subTitle}</span>
            <p>{text.text}</p>
          </div>
          <img src={pci} alt="" />
        </div>
      </div>
    </div>
  )
}

export default PaymentSection