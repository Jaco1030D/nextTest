"use client"

import React from 'react'
import { useRouter } from 'next/navigation';
import './style.css'

const Button = ({text, handleClick, type2}) => {
  const router = useRouter();

    const handleSubmit = () => {
      if (!handleClick) {
        window.location.href = 'https://pages.magmatranslation.com/solicite-um-orcamento'
      } else {

        window.scrollTo(0, 0);
        router(handleClick)
      }
    }
  return (
    <button className={`button-action ${type2 && 'button-type2'}`} onClick={handleSubmit}>
        {text}
    </button>
    )
}

export default Button