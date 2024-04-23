import React from 'react'
import './style.css'
import FeedBackCard from '../../Others/FeedBackCard'

const FeedBackCaseStudy = ({texts}) => {
  return (
    <div className='feedBackCaseStudy'>
          <div className='company-trust_gradient '> </div>    

        <FeedBackCard texts={texts} />
    </div>
  )
}

export default FeedBackCaseStudy