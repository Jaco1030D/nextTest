import React from 'react'
import './style.css'
import { useMainContext } from '../../../context/MainContext'
import carro from './icons/carro.svg';
import '../FormArchive/style-modal.css'
import circumMedicalCase from './icons/circum_medical-case.svg';
import iconMidias from './icons/icon midias.svg';
import iconApp from './icons/iconapp.svg';
import iconConciencia from './icons/iconciencia.svg';
import iconEnergia from './icons/iconenergia.svg';
import iconEngenharia from './icons/iconengenharia.svg';
import iconOirLearning from './icons/iconoir_learning.svg';
import icons8Buy from './icons/icons8_buy.svg';
import iconSoftweare from './icons/iconsoftweare.svg';
import iconTecnica from './icons/icontecnica.svg';
import iconTurismo from './icons/iconturismo.svg';
import mala from './icons/mala.svg';
import megafone from './icons/megafone.svg';
import iconClosedCaptioning from './icons/icon _Closed Captioning_.svg';
import iconGameConsole from './icons/icon _Game console_.svg';
import iconJustice from './icons/icon _Justice_.svg';
import iconUsdCircle from './icons/icon _usd-circle_.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';


const icons = [
  iconApp,
  carro,
  iconConciencia,
  icons8Buy,
  iconEnergia,
  iconEngenharia,
  iconUsdCircle,
  iconGameConsole,
  mala,
  iconJustice,
  iconClosedCaptioning,
  megafone,
  circumMedicalCase,
  iconMidias,
  iconSoftweare,
  iconTecnica,
  iconOirLearning,
  iconTurismo,
];

const InputArchive = ({handleClose, text}) => {
    const [state, action] = useMainContext()

    const handleClick = (item, index) => {
        action.changeArchiveType({...item, index})
        handleClose()
    }
    
  return (
    <div className="archivesTypes">
      <div className="content-list-archive">
        <div className={`header-list-archive ${!state.archiveTypeSelected.name && 'selected'}`}>
            <p>{text.title}</p>
        </div>
        {state.languageSite !== 'us' && state.archiveTypes && state.archiveTypes.map((item, index) => (
            <div key={item.name} onClick={() => handleClick(item, index)} className={`item-list-archive ${state.archiveTypeSelected.name === item.name && 'selected'}`}>
                <div className='img-container'>
                  <LazyLoadImage src={icons[index]} alt={`icon-para-${item.name}`} />
                </div>
                <p>{text.types[index]}</p>
            </div>
        ))}
        {state.languageSite === 'us' && state.archiveTypesUS && state.archiveTypesUS.map((item, index) => (
            <div key={item.name} onClick={() => handleClick(item, index)} className={`item-list-archive ${state.archiveTypeSelected.name === item.name && 'selected'}`}>
                <div className='img-container'>
                  <LazyLoadImage src={icons[index]} alt={`icon-para-${item.name}`} />
                </div>
                <p>{text.types[index]}</p>
            </div>
        ))}
        
      </div>
    </div>
  )
}

export default InputArchive