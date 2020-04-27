import React, {useEffect} from 'react';
import Md from 'react-markdown';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';

import introLanding1Fr from '!!raw-loader!../locales/texts/intro-landing-1/fr.md';/* eslint import/no-webpack-loader-syntax : 0 */
import introLanding1En from '!!raw-loader!../locales/texts/intro-landing-1/en.md';/* eslint import/no-webpack-loader-syntax : 0 */

import introLanding2Fr from '!!raw-loader!../locales/texts/intro-landing-2/fr.md';/* eslint import/no-webpack-loader-syntax : 0 */
import introLanding2En from '!!raw-loader!../locales/texts/intro-landing-2/en.md';/* eslint import/no-webpack-loader-syntax : 0 */

import introLanding3Fr from '!!raw-loader!../locales/texts/intro-landing-3/fr.md';/* eslint import/no-webpack-loader-syntax : 0 */
import introLanding3En from '!!raw-loader!../locales/texts/intro-landing-3/en.md';/* eslint import/no-webpack-loader-syntax : 0 */

import introLanding4Fr from '!!raw-loader!../locales/texts/intro-landing-4/fr.md';/* eslint import/no-webpack-loader-syntax : 0 */
import introLanding4En from '!!raw-loader!../locales/texts/intro-landing-4/en.md';/* eslint import/no-webpack-loader-syntax : 0 */

import introStep1Fr from '!!raw-loader!../locales/texts/intro-step-1/fr.md';/* eslint import/no-webpack-loader-syntax : 0 */
import introStep1En from '!!raw-loader!../locales/texts/intro-step-1/en.md';/* eslint import/no-webpack-loader-syntax : 0 */


import introStep2Fr from '!!raw-loader!../locales/texts/intro-step-2/fr.md';/* eslint import/no-webpack-loader-syntax : 0 */
import introStep2En from '!!raw-loader!../locales/texts/intro-step-2/en.md';/* eslint import/no-webpack-loader-syntax : 0 */

import introStep3Fr from '!!raw-loader!../locales/texts/intro-step-3/fr.md';/* eslint import/no-webpack-loader-syntax : 0 */
import introStep3En from '!!raw-loader!../locales/texts/intro-step-3/en.md';/* eslint import/no-webpack-loader-syntax : 0 */


export default function({
  translate,
  lang
}) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })
  return (
    <>
      <Helmet>
        <title>{translate('website-title')}</title>
      </Helmet>
      <header>
        <div className="metadata">
          <p>
            {translate('preparatory-exercises')}
          </p>
          <p>
            {translate('proposition-from-collective')}
            <br/>
            {translate('collective-name')}
          </p>
          <p>
            {translate('launching-the')}
            <br/>
            {translate('launching-date')}
          </p>
        </div>
      </header>

      {/* part 1 */}
      <div className="columns">
        <div>
          <Md source={lang === 'fr' ? introLanding1Fr : introLanding1En} />
        </div>
        <div>
        <Link className="button starter-button" to="questionnaire">
          <span>{translate('questionnaire-prompt')}</span>
          <span className="chevron">
            <span />
            <span />
            <span />
          </span>
        </Link>
          <Md source={lang === 'fr' ? introLanding2Fr : introLanding2En} />
        </div>
      </div>

      {/* part 2 */}
      <ul className="steps">
        <li>
          <h2>1</h2>
          <Md source={lang === 'fr' ? introStep1Fr : introStep1En} />
        </li>
        <li>
          <h2>2</h2>
          <Md source={lang === 'fr' ? introStep2Fr : introStep2En} />
        </li>
        <li>
          <h2>3</h2>
          <Md source={lang === 'fr' ? introStep3Fr : introStep3En} />
        </li>
      </ul>
      {/* part 3 */}
      <div className="columns">
        <div>
          <Md source={lang === 'fr' ? introLanding3Fr : introLanding3En} />
        </div>
        <div>
        <Link className="button starter-button" to="questionnaire">
          <span>{translate('questionnaire-prompt')}</span>
          <span className="chevron">
            <span />
            <span />
            <span />
          </span>
        </Link>
          <Md source={lang === 'fr' ? introLanding4Fr : introLanding4En} />
        </div>
      </div>

      <footer>
          <p>
            {translate('for-information-contact')}
          </p>
          <p>
            Project email
          </p>
          <p>
            Project contact
          </p>
      </footer>
    </>
  )
}