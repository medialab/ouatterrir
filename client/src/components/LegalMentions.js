import React from 'react';
import {Helmet} from 'react-helmet';
import Md from 'react-markdown';

import mentionsFr from '!!raw-loader!../locales/texts/legal-mentions/fr.md';/* eslint import/no-webpack-loader-syntax : 0 */
import mentionsEn from '!!raw-loader!../locales/texts/legal-mentions/en.md';/* eslint import/no-webpack-loader-syntax : 0 */

export default function({
  translate,
  lang
}) {
  return (
    <div className="mentions-container">
      <Helmet>
        <title>{translate('website-title')} | {translate('legal-mentions')}</title>
      </Helmet>
      <h1>{translate('legal-mentions')}</h1>
      <Md source={lang === 'fr' ? mentionsFr : mentionsEn} />
    </div>
  )
}