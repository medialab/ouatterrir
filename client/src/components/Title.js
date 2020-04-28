import React, { useEffect } from 'react';
import {
  Link,
  useLocation
} from 'react-router-dom';
import {useScroll} from '../helpers/hooks';
import cx from 'classnames';

export default function Title({
  translate,
}) {
  const location = useLocation();

  let {scrollY} = useScroll();

  useEffect(() => {
    scrollY = 0;
  }, [location.pathname])

  return (
    <h1 className={cx('site-title', {
        'in-home': location.pathname === '/',
        'in-questionnaire': location.pathname === '/questionnaire',
        'in-mentions': location.pathname === '/mentions',
        'in-top': scrollY < 100
      })}>
      <Link to="/" className="home-link"><span>{translate('website-title')}</span></Link>
    </h1>
  )
}