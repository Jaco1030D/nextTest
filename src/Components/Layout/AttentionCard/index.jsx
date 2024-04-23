import React from 'react'
import './style.css'

const AttentionCard = ({text, title}) => {
  return (
    <div className="warning-container">
        <div class="warning-content">
            <span class="warning-icon">&#9888;</span>
            <h2>{title}:</h2>
            <p>{text}</p>
        </div>
    </div>
  )
}

export default AttentionCard