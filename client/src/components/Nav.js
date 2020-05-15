import React, {useState} from 'react';
import {
  NavLink as Link,
  useLocation
} from 'react-router-dom';
import {useScroll} from '../helpers/hooks';
import cx from 'classnames';

import Title from './Title';

export default function Nav({
  lang,
  handleQuestionnaireClick,
  handleSwitchLang,
  translate,
}) {
  const location = useLocation();

  const {scrollY} = useScroll();

  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }
  return (
    <nav className={cx({
      'in-home': location.pathname === '/',
      'in-questionnaire': location.pathname === '/questionnaire',
      'in-mentions': location.pathname === '/mentions',
      'in-top': scrollY < 100,
      'is-open': isOpen
      })}>
      <Title
        {
          ...{
            lang,
            translate,
          }
        }
      />

      <ul>
        <li className="link-container">
          <Link onClick={handleQuestionnaireClick} to="/questionnaire">
            <span className="label-container">
              <span>1 —&nbsp;</span><span>{translate('nav-1')}</span>
            </span>
          </Link>
        </li>
        <li className="link-container">
          <Link onClick={handleQuestionnaireClick} to="/events">
            <span className="label-container">
              <span>2 —&nbsp;</span><span>{translate('nav-2')}</span>
            </span>
          </Link>
        </li>
        <li className="link-container">
          <span className="label-container">
            <span>1 —&nbsp;</span><span>{translate('nav-3')}</span>
          </span>
        </li>
      </ul>
      
      <ul className="lang-toggler-wrapper">
        <li>
          <span className="lang-toggler" onClick={handleSwitchLang}>
            <span>
              <span>{lang === 'fr' ? <b>fr</b> : 'fr'}</span>
              <span>/</span>
            </span>
            <span>{lang === 'fr' ? 'en' : <b>en</b>}</span>
          </span>
        </li>
      </ul>
      <ul className="burger-wrapper">
        <li onClick={toggleIsOpen} className="burger-container">
          <div></div>
          <div></div>
          <div></div>
        </li>
      </ul>
    </nav>
  )
}