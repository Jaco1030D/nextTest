import React, { useEffect, useRef, useState } from 'react'
import './style.css';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useUpdateDocument } from '../../../hooks/useUpdateDocument';
import { useNavigate } from 'react-router-dom';
import button from './Button.svg'
import { useMainContext } from '../../../context/MainContext';
import arrow from './Arrow.svg'

const getFullName = (abbre, abbreviations) => abbreviations[abbre] || abbre;

const getFullNameLanguage = (languageWithAbreviation, abbreviations) => {
  const arrayLanguage = languageWithAbreviation.split(' ')

  if (arrayLanguage.length === 1) {
    return languageWithAbreviation
  }

  const language = arrayLanguage[0]

  const subLanguage = arrayLanguage[arrayLanguage.length - 1]

  const fullNameLanguageTypes = getFullName(subLanguage, abbreviations)

  return `${language} - ${fullNameLanguageTypes}`
}
const SmallRectangle = ({ textLayout, withBorder, title, icon, numOrder, showDropdown, text, finalized = false, handleDonwload, languageSetings, arrayOriginArchives, archivesTranslated, openModal }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [open, setOpen] = useState()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dropdownRef = useRef(null);

    const handleClcik = async (array) => {
      setDropdownVisible(!isDropdownVisible)
      await handleDonwload(array)
    }

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setDropdownVisible(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    return (
      <div
        className={`small-rectangle ${withBorder ? 'with-border' : ''}`}
        ref={dropdownRef}
      >
        <div className={`content-test ${showDropdown && isDropdownVisible ? 'with-dropdown' : ''}`}>
          <span>{title}</span>
          
        </div>
        <div className="white-part">
          {showDropdown && isDropdownVisible && (
            <div className="dropdown">
              <div onClick={() => handleClcik(arrayOriginArchives)}>{textLayout.downloads[0]}</div>
              {finalized && <div onClick={() => handleClcik(archivesTranslated)}>{textLayout.downloads[1]}</div>}
            </div>
          )}
          {showDropdown && (
              <div className="button-arquivos" onClick={() => setDropdownVisible(!isDropdownVisible)}>
              Download
              </div>
          )}
          {openModal && (
            <Modal
            open={open}
            onClose={handleClose}  
            >
              <div className="destinoidiomas">
      <div className="div-order">
        <div className="container-inputSelect order">
        <p>{textLayout.utils[0]} {getFullNameLanguage(languageSetings.origin, textLayout.abbreviations)} {textLayout.utils[1]}:</p>
          <div className="content-inputSelect">
            {languageSetings.translation && languageSetings.translation.map((item, index) => (
              <div key={index} className='languages_group pointer'>
              <div className='header_language_languages_group'><span className='name-language'>{getFullNameLanguage(item, textLayout.abbreviations)}</span> </div>
              
            </div>
            )
            )}
          </div>

        </div>
          <div className="busca">
            <p className="frasehero">{textLayout.titlePopup} {numOrder}</p>
            <img className="img pointer" alt="Button" onClick={handleClose} src={button} />
            <div className="separator" />
            
          </div>
      </div>
    </div>
            </Modal>
          )}
          {!showDropdown && openModal && <span className= 'rectangle-icon pointer' onClick={handleOpen}>{text} <img src={icon} alt="" /> </span>}
      
          {!showDropdown && !openModal && <span>{text}</span>}
        </div>
      </div>
    );
  };
const OrderCard = ({order, name, text}) => {
  const [status, setStatus] = useState()
  const [state, actions] = useMainContext()
  const {updateDocument} = useUpdateDocument("archives")
  const navigate = useNavigate()

    const rectangles = [
        { withBorder: true, title: text.subTlite[0], text: order.numOrder },
        { withBorder: false, title: text.subTlite[1], icon: arrow, text: <div><p>{order.languageSetings.origin} &gt; <br/> {order.languageSetings.translation[0]}</p></div>, languageSetings: order.languageSetings, openModal: true, numOrder: order.numOrder },
        { withBorder: true, title: text.subTlite[2], text: <div><p className='typeService'>{order.typeService}</p><p className='numWords'>{order.numWords} {text.word}</p></div> },
        { withBorder: false, title: text.subTlite[3], showDropdown: true, text: '', finalized: order?.finalized, arrayOriginArchives: order.archivesURL, archivesTranslated: order.archivesTranslated},
        { withBorder: true, title: text.subTlite[4], text: `${order.finalDate}h`},
        { withBorder: false, title: text.subTlite[5], text: order.archiveType },
        { withBorder: false, title: text.subTlite[6], text: status },
        { withBorder: true, title: text.subTlite[7], text: <div><p className='typeService'>R$</p><p className='numWords'>{order.value}</p></div> },
      ];
    const getAPIInfos = async () => {
        const response = await axios.post("/.netlify/functions/api", {
            id_payment: order.paymentInfos.id_payment
          })

          return response.data
    }
    const handleDownload = async (downloadURL, fileName) => {
      const response = await axios.get(downloadURL, { responseType: 'blob' })
  
      console.log(response);
  
      const blobUrl = URL.createObjectURL(response.data);
  
      const link = document.createElement('a');
  
      link.href = blobUrl;
  
      link.download = fileName || order.file;
  
      document.body.appendChild(link);
  
      link.click();
  
      document.body.removeChild(link);
    }

    const handlePay = () => {
      actions.changeCartItems(order)
      navigate('/checkout/'+order.paymentInfos.clientSecret)
    }
    const multipleDownload = async (array) => {
      array.forEach(element => {
        handleDownload(element.downloadArchive, element.name)
      });
    }
      useEffect(() => {

        if (order.paymentInfos.status === 'succeeded' && !order.finalized) {

          setStatus(<div className='status-actual in-progress' >{text.orderStatus[1]}</div>)

        } else if(order.paymentInfos.status === 'succeeded' && order.finalized) {

          setStatus(<div className='status-actual finalized' >{text.orderStatus[2]}</div>)

        } else {
          getAPIInfos().then(res => {
            if (res.status === 'succeeded') {
              setStatus(<div className='status-actual in-progress' >{text.orderStatus[1]}</div>)

              axios.post("/.netlify/functions/sendEmail", {
                  name: order.user.displayName || name,
                  email: order.user.email,
                  order: order,
                  fromUser: true,
                  finalized: false
              })
              axios.post("/.netlify/functions/sendEmail", {
                  name: order.user.displayName || name,
                  email: order.user.email,
                  order: order,
                  fromUser: false,
                  finalized: false
              })
              

              updateDocument(order.id, {paymentInfos: {...order.paymentInfos, status: 'succeeded'}})
            } else {
              setStatus(<div className='status-actual button-start' onClick={handlePay}>{text.orderStatus[0]}</div>)
            }
          })
        }
        
      },[order])

    
      return (
        <div className="container-test">
          {rectangles.map((rectangle, index) => (
            <SmallRectangle
              key={index}
              withBorder={rectangle.withBorder}
              title={rectangle.title}
              showDropdown={rectangle.showDropdown}
              text={rectangle.text}
              finalized = {rectangle.finalized}
              arrayOriginArchives = {rectangle.arrayOriginArchives}
              handleDonwload={multipleDownload}
              archivesTranslated= {rectangle.archivesTranslated}
              openModal={rectangle.openModal}
              languageSetings={rectangle.languageSetings}
              numOrder={rectangle.numOrder}
              icon={rectangle.icon}
              textLayout={text}
            />
          ))}
          <div className="large-rectangle">
          </div>
        </div>
      );
}

export default OrderCard