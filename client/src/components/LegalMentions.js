import React from 'react';
import {Helmet} from 'react-helmet';
import Md from 'react-markdown';

import mentionsFr1 from '!!raw-loader!../locales/texts/legal-mentions-1/fr.md';/* eslint import/no-webpack-loader-syntax : 0 */
import mentionsEn1 from '!!raw-loader!../locales/texts/legal-mentions-1/en.md';/* eslint import/no-webpack-loader-syntax : 0 */

import mentionsFr2 from '!!raw-loader!../locales/texts/legal-mentions-2/fr.md';/* eslint import/no-webpack-loader-syntax : 0 */
import mentionsEn2 from '!!raw-loader!../locales/texts/legal-mentions-2/en.md';/* eslint import/no-webpack-loader-syntax : 0 */

export default function({
  translate,
  lang
}) {
  return (
    <div className="mentions-container">
      <Helmet>
        <title>{translate('website-title')} | {translate('legal-mentions')}</title>
      </Helmet>
      <div>
        <Md source={lang === 'fr' ? mentionsFr1 : mentionsEn1} />
      </div>
      <div>
        <Md source={lang === 'fr' ? mentionsFr2 : mentionsEn2} />
      </div>
    </div>
  )
}