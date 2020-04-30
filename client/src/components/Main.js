import React from 'react';
import {
  useLocation
} from 'react-router-dom';
import cx from 'classnames';

export default function Nav({
  children
}) {
  const location = useLocation();

  return (
    <main className={cx({
      'in-home': location.pathname === '/',
      'in-questionnaire': location.pathname === '/questionnaire',
    })}>
      {children}
    </main>
  )
}