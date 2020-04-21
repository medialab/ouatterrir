import React from 'react';
import Md from 'react-markdown';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';

import introFr from '!!raw-loader!../locales/texts/intro/fr.md';/* eslint import/no-webpack-loader-syntax : 0 */
import introEn from '!!raw-loader!../locales/texts/intro/en.md';/* eslint import/no-webpack-loader-syntax : 0 */

export default function({
  translate,
  lang
}) {
  return (
    <div>
      <Helmet>
        <title>{translate('website-title')}</title>
      </Helmet>
      <div className="question-container">
        <h1>{translate('website-title')}</h1>
        <Md source={lang === 'fr' ? introFr : introEn} />
        <Link className="important-link" to="questionnaire">
          {translate('questionnaire-prompt')}
        </Link>
      </div>
    </div>
  )
}