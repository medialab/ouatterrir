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
      'in-top': scrollY < 100
      })}>

      <ul>
        <li className="title-placeholder">
          {translate('website-title')}
        </li>
        <li>
          <Link to="/mentions"><span>{translate('legal-mentions')}</span></Link>
        </li>
        <li>
          <Link onClick={handleQuestionnaireClick} to="/questionnaire"><span>{translate('questionnaire')}</span></Link>
        </li>
      </ul>
      
      <ul>
        
        <li>
          <span className="lang-toggler" onClick={handleSwitchLang}>
            {lang === 'fr' ? <b>fr</b> : 'fr'}/{lang === 'fr' ? 'en' : <b>en</b>}
          </span>
        </li>
      </ul>
    </nav>
  )
}