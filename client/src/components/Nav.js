import React from 'react';
import {
  NavLink as Link,
  useLocation
} from 'react-router-dom';
import {useScroll} from '../helpers/hooks';
import cx from 'classnames';

export default function Nav({
  lang,
  handleQuestionnaireClick,
  handleSwitchLang,
  translate,
}) {
  const location = useLocation();

  const {scrollY} = useScroll();
  return (
    <nav className={cx({
      'in-home': location.pathname === '/',
      'in-questionnaire': location.pathname === '/questionnaire',
      'in-mentions': location.pathname === '/mentions',
      'in-top': scrollY < 100
      })}>

      <ul>
        <li>
          <Link onClick={handleQuestionnaireClick} to="/questionnaire"><span>{translate('nav-1')}</span></Link>
        </li>
        <li>
          <span>{translate('nav-2')}</span>
        </li>
        <li>
          <span>{translate('nav-3')}</span>
        </li>
        <li>
          <span>{translate('nav-4')}</span>
        </li>
      </ul>
      
      <ul>
        <li>
          <span className="lang-toggler" onClick={handleSwitchLang}>
            <span>{lang === 'fr' ? <b>fr</b> : 'fr'}</span>
            <span>/</span>
            <span>{lang === 'fr' ? 'en' : <b>en</b>}</span>
          </span>
        </li>
      </ul>
    </nav>
  )
}