import React from 'react'
import { useAuthentication } from '../../../hooks/useAuthentication'
import { useMainContext } from '../../../context/MainContext'

const LoggedComponentNavbar = ({setName}) => {
  const [state, actions] = useMainContext()

    const {logout} = useAuthentication()

    const handleClick = () => {
        logout()
        actions.setAccountInfo(null)
        setName('')
      }

  return (
    <li onClick={handleClick}>logout</li>
  )
}

export default LoggedComponentNavbar