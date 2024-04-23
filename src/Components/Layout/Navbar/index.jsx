import { Link, Outlet, useLocation } from 'react-router-dom'
import 'boxicons'
import logo from '../../../img/logo.webp'
import { lazy, useEffect, useState } from 'react';
import './style.css'
import { useMainContext } from '../../../context/MainContext';
import userImage from './User.svg'
const LoggedComponentNavbar = lazy(() => import('../../Others/LoggedComponentNavbar'))
let textsNavbar
if (window.location.pathname.includes("/us")) {
  console.log('aqui');
  ({ textsNavbar } = require('../../../constants/index_us.js'));

} else {
  ({ textsNavbar } = require('../../../constants'));
}

console.log(textsNavbar);

const Navbar = ({hiddenNavbar, setName, name, isAdmin}) => {
  const [state, actions] = useMainContext()
  const [u, setU] = useState()
  const [openMenu, setOpenMenu] = useState(false)
  const userLanguage = navigator.language || navigator.userLanguage;
  console.log(userLanguage);
  const locate = useLocation()

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu)
  }
  const handleClick = (language) => {
    actions.changeLanguageSite(language);
    actions.resetInfosArchive()
  }
  useEffect(() => {
    if (state.languageSite === 'us') {
      ({ textsNavbar } = require('../../../constants/index_us.js'));

      setU(true)
    } else {
      ({ textsNavbar } = require('../../../constants'));

      setU(false)
    }
  },[state.languageSite])
  return (
    <>
    <header style={{display: hiddenNavbar && 'none', background: `${locate.pathname.includes('/checkout') ? '#fff' : '' }`}} >
      <Link to={'/'}>
        <img src={logo} alt="logo" width={'132px'} height={'35px'} />
      </Link>

      { locate.pathname.includes('/checkout') ? (
        <div className='user-mobile'>
          <img src={userImage} alt="logo" />
          <p>{state.user?.displayName || name}</p>
        </div>
      ) : (

      <>
      <label className='icon-mobile' onClick={handleOpenMenu}>
        <box-icon name={`${openMenu ? 'x' : 'menu'}`}></box-icon>
      </label>

      <nav className={`${openMenu && 'open-dropMenu'}`}>
        {isAdmin ? (
          <ul>
            <li>
              <Link to='/admin'>Todos pedidos</Link>
            </li>
            <li>
              <Link to={'/' + state.languageSite + '/config'}>Configurações</Link>
            </li>
            <LoggedComponentNavbar setName={setName} />

          </ul>
        ) : (

          <ul>
            <li>
              <Link to={'/' + state.languageSite + '/'}>{textsNavbar[0]}</Link>
            </li>
            <li>
              <Link to={'/' + state.languageSite + '/empresas'} >{textsNavbar[1]}</Link>
            </li>
            {state.user ? (
              <>
              <li>
              <Link to={'/' + state.languageSite + '/order'}>{textsNavbar[2]}</Link>

              </li>
              <LoggedComponentNavbar setName={setName} />
              </>
            ) : (
              <li>
                <Link to={'/' + state.languageSite + '/login'}>Log in</Link>
              </li>
            )}
            {!userLanguage.toLowerCase().includes('us') && !state.languageSite.includes('us') &&  
            <li onClick={() => handleClick('us')}>
              <p>Mudar para inglês</p>
            </li>
            }
            {!userLanguage.toLowerCase().includes('us') && state.languageSite.includes('us') &&
            <li onClick={() => handleClick('pt')}>
              <p>Change to Portuguese</p>
            </li>
            }
            <li id='contrast-contact'>
              <a href="https://pages.magmatranslation.com/solicite-um-orcamento">{textsNavbar[3]}</a>
            </li>
            {locate.pathname === '/' + state.languageSite + '/empresas' &&  
            <li id='contrast'>
              <Link to={'/' + state.languageSite + '/'}>{textsNavbar[4]}</Link>
            </li>
            }
            
          </ul>
        )}
        
      </nav>
      </>
      )}
    </header>
    <Outlet />
    </>

  );
};

export default Navbar;