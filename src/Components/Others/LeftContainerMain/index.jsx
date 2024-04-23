import React from 'react'
import './style.css'
import FormArchive from '../FormArchive'

const LeftContainerMain = ({text}) => {
  return (
    <div className='main_left'>
      <div className="texts_left">
        <h1 className='title_left_container'>{text.title} <span>{text.span}</span> </h1>
        <p className='subtitle_left_container'>{text.description}</p>
      </div>
      <FormArchive text={text.formArchive} />
    </div>
  )
}

export default LeftContainerMain