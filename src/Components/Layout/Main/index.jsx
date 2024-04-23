import React, { Suspense, lazy } from 'react'
import { useMainContext } from '../../../context/MainContext'
import './style.css'
import RigthContainerMain from '../../Others/RigthContainerMain'
import LeftContainerMain from '../../Others/LeftContainerMain'
const OrdersContainer = lazy(() => import('../../Others/ordersContainer'))


const Main = ({text}) => {
  const [state] = useMainContext();
  
  return (
    <div className='main_hero'>
        <div className="hero-section">
        <LeftContainerMain text={text} />

          <RigthContainerMain text={text.link} />
        </div>
        {
          state.showValues &&
          state.archiveTypeSelected.name !== 'Juramentada /Certificada' &&
          state.filePending.length !== 0 &&
          state.archiveTypeSelected?.name &&
          <OrdersContainer text={text.orders}  /> 
        }
    </div>
  )
}

export default Main