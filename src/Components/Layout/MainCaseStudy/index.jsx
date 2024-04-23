import React from 'react'
import elipse from './elipse.svg'
import './style.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import TextMainCaseStudy from '../../Others/TextMainCaseStudy copy';

const MainCaseStudy = ({text}) => {
  console.log(text);
  return (
    <div className='mainCaseStudy-container'> 
        <LazyLoadImage width={'617px'} src={text.img} alt="" />
        <img className='mainCaseStudy-elipse' src={elipse} alt="" />

        <TextMainCaseStudy text={text} />
    </div>
  )
}

export default MainCaseStudy