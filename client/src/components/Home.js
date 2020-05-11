import React, {useEffect} from 'react';
import Md from 'react-markdown';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';

import Footer from './Footer';

import introLanding1Fr from '!!raw-loader!../locales/texts/intro-landing-1/fr.md';/* eslint import/no-webpack-loader-syntax : 0 */
import introLanding1En from '!!raw-loader!../locales/texts/intro-landing-1/en.md';/* eslint import/no-webpack-loader-syntax : 0 */

import introLanding2Fr from '!!raw-loader!../locales/texts/intro-landing-2/fr.md';/* eslint import/no-webpack-loader-syntax : 0 */
import introLanding2En from '!!raw-loader!../locales/texts/intro-landing-2/en.md';/* eslint import/no-webpack-loader-syntax : 0 */

// import introLanding3Fr from '!!raw-loader!../locales/texts/intro-landing-3/fr.md';/* eslint import/no-webpack-loader-syntax : 0 */
// import introLanding3En from '!!raw-loader!../locales/texts/intro-landing-3/en.md';/* eslint import/no-webpack-loader-syntax : 0 */

import introStep1Fr from '!!raw-loader!../locales/texts/intro-step-1/fr.md';/* eslint import/no-webpack-loader-syntax : 0 */
import introStep1En from '!!raw-loader!../locales/texts/intro-step-1/en.md';/* eslint import/no-webpack-loader-syntax : 0 */

import introStep2Fr from '!!raw-loader!../locales/texts/intro-step-2/fr.md';/* eslint import/no-webpack-loader-syntax : 0 */
import introStep2En from '!!raw-loader!../locales/texts/intro-step-2/en.md';/* eslint import/no-webpack-loader-syntax : 0 */

import introStep3Fr from '!!raw-loader!../locales/texts/intro-step-3/fr.md';/* eslint import/no-webpack-loader-syntax : 0 */
import introStep3En from '!!raw-loader!../locales/texts/intro-step-3/en.md';/* eslint import/no-webpack-loader-syntax : 0 */

// import part3Landing1Fr from '!!raw-loader!../locales/texts/part3-landing-1/fr.md';/* eslint import/no-webpack-loader-syntax : 0 */
// import part3Landing1En from '!!raw-loader!../locales/texts/part3-landing-1/en.md';/* eslint import/no-webpack-loader-syntax : 0 */

// import part3Landing2Fr from '!!raw-loader!../locales/texts/part3-landing-2/fr.md';/* eslint import/no-webpack-loader-syntax : 0 */
// import part3Landing2En from '!!raw-loader!../locales/texts/part3-landing-2/en.md';/* eslint import/no-webpack-loader-syntax : 0 */



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
        <h1 className="site-big-title">
          {translate('website-title')}
        </h1>
        {/* <div className="metadata">
          <p>
            <b>{translate('preparatory-exercises')}</b>
          </p>
          <p>
            {translate('proposition-from-collective')}
            <br/>
            <b>{translate('collective-name')}</b>
          </p>
          <p>
            {translate('launching-the')}
            <br/>
            <b>{translate('launching-date')}</b>
          </p>
        </div> */}
      </header>

      {/* part 1 */}
      <div className="columns">
        <div>
          <Md source={lang === 'fr' ? introLanding1Fr : introLanding1En} />
        </div>
        <div>
          <Md source={lang === 'fr' ? introLanding2Fr : introLanding2En} />
        </div>
        {/*<div>
          <Md source={lang === 'fr' ? introLanding3Fr : introLanding3En} />
        </div>*/}
      </div>

      {/* part 2 */}
      <ul className="steps">
        <li>
          <div>
            <h2>
              <span>1</span>
            </h2>
          </div>
          <div className="contents">
            <Md source={lang === 'fr' ? introStep1Fr : introStep1En} />
          </div>          
          <div>
            <Link className="button starter-button" to="questionnaire">
              <span>
                <span>{translate('prompt-activity-1')}</span>
                <span className="chevron">
                  <span />
                  <span />
                  <span />
                </span>
              </span>
            </Link>
          </div>
        </li>
        <li>
          <div>
            <h2>2</h2>
          </div>
          <div className="contents">
            <Md source={lang === 'fr' ? introStep2Fr : introStep2En} />
          </div>
          <div>
            <Link className="button starter-button disabled">
              <span>
                <span>{translate('prompt-activity-2')}</span>
                <span className="chevron">
                  <span />
                  <span />
                  <span />
                </span>
              </span>
            </Link>
          </div>
        </li>
        <li>
          <div>
            <h2>3</h2>
          </div>
          <div className="contents">
            <Md source={lang === 'fr' ? introStep3Fr : introStep3En} />
          </div>
          <div>
            <Link className="button starter-button disabled">
              <span>
                <span>{translate('prompt-activity-3')}</span>
                <span className="chevron">
                  <span />
                  <span />
                  <span />
                </span>
              </span>
            </Link>
          </div>
        </li>
      </ul>

      {/* part 3 */}
      {/* <div className="columns">
        <div>
          <Md source={lang === 'fr' ? part3Landing1Fr : part3Landing1En} />
        </div>
        <div>
          <Md source={lang === 'fr' ? part3Landing2Fr : part3Landing2En} />
        </div>
      </div> */}
      

      <Footer {...{translate}} />
    </>
  )
}
