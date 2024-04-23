import React, { Suspense, lazy, useState } from 'react'
import arrow from './arrow.svg'
import { useMainContext } from '../../../context/MainContext'
import arrowDown from './arrow-down.svg'
import './style.css'
import AttentionCard from '../../Layout/AttentionCard'
const InputArchive = lazy(() => import('../InputArchive'))
const InputSelect = lazy(() => import('../inputsSelect'))
const InputSelectMultiple = lazy(() => import('../inputSelectMultiple'))
const InputDrop = lazy(() => import('../InputDrop'))
const Modal = lazy(() => import('@mui/material/Modal'))

const FormArchive = ({text}) => {
  const [state, actions] = useMainContext()
  const [currentComponent, setCurrentComponent] = useState()
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    if (state.filePending.length > state.fileUpload.length) {
      return
    }
    setOpen(false)
  };
  const handleScroll = async () => {
    if (!state.archiveTypeSelected?.name) {
      handleOpen(4, text.popupMessage.error[0])
    } else 
    if (state.archiveTypeSelected.name === 'Juramentada /Certificada' || state.archiveTypeSelected.name === 'Sworn / Certified') {
      handleOpen(4)
    } else
    if (!state.selectValues.origin) {
      handleOpen(4, text.popupMessage.error[1])
    } else 
    if (state.selectValues.translation.length === 0) {
      handleOpen(4, text.popupMessage.error[2])
    } else
    if (state.filePending.length === 0) {
      handleOpen(4, text.popupMessage.error[3])
    } else
    {
      await actions.changeShowValues(true)

      setTimeout(() => {
        const elementoDestino = document.getElementById('container_values');
      const topPosition = elementoDestino.offsetTop;
      const windowHeight = window.innerHeight;
      const scrollPosition = topPosition - (windowHeight / 5);

      if (elementoDestino) {
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        })
      }
      },[500])
    }
    
  }

  const displayLanguages = (array, x) => {

    let display

    if (array.length > x) {

      const newLayout = array.slice(0, x)

      display = `${newLayout.join(", ")} +${array.length - x}`

    } else {

      display = array.join(", ")

    }

    return display
  }

  
  const handleOpen = (num, primaryText) => {
    const handleClick = () => {
      setOpen(false)
    }
    const elements = [
      <InputDrop text={text.textsInputDrop} setOpen={handleClose} />,
      <InputSelectMultiple text={text.inputSelectMultiple} handleClose={() => handleClick()}  />,
      <InputSelect text={text.inputSelect} handleClose={() => handleClick()}  />,
      <InputArchive text={text.archiveType} handleClose={() => handleClick()} />,
      <AttentionCard text={primaryText || text.popupMessage.errorJuramentada } title={text.popupMessage.title} />
      
    ]
    setCurrentComponent(elements[num])

    setOpen(true)
  }
  return (
    <div className="container-form">
      <div className="techdesolicitacao">

        <p className="p">{text.labelText[0]}</p>
        <div className="input-form flex-correction pointer" onClick={() => handleOpen(3)}>
        <div className="text-wrapper flex-correction-archive text-first" style={{color: '#000'}}> {state.archiveTypeSelected.name || text.inputText[0]}</div>
          <img className="img" width={'15px'} height={'15px'} alt="seta para baixo" src={arrow} />
        </div>

        <p className="p">{text.labelText[1]}</p>
        <div className="input-form flex-correction pointer" onClick={() => handleOpen(2)}>
          <div className="text-wrapper">{state.selectValues.origin || text.inputText[1]}</div>
          <img className="img" alt="seta para baixo" src={arrow} width={'15px'} height={'15px'} />
        </div>


        <p className="p">{text.labelText[2]}</p>
        <div className="input-form flex-correction pointer" onClick={() => handleOpen(1)}>
          <div className="text-wrapper">{(state.selectValues.translation && displayLanguages(state.selectValues.translation, 8)) || text.inputText[2]}</div>
          <img className="img" alt="seta para baixo" src={arrow} width={'15px'} height={'15px'} />
        </div>


        <p className="p">{text.labelText[3]}</p>
        <div className="input-form flex-correction pointer" onClick={() => handleOpen(0)}>
          <div className="text-wrapper">{state.filePending ? `${state.fileUpload.length} ` + text.inputText[3] : 'Clique para buscar'}</div>
          <img className="img" alt="seta para baixo" src={arrow} width={'15px'} height={'15px'} />
        </div>


      </div>
      {open && 
      <Suspense>
        <Modal
        open={open}
        onClose={handleClose}>
        <div>
            {currentComponent}
        </div>
        </Modal>
        </Suspense>
      }
      <button onClick={handleScroll} className='show-values_button'>{text.button} <img src={arrowDown} width={'8px'} height={'18px'} alt="seta para baixo" /></button>

    </div>
  )
}

export default FormArchive