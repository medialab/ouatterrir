import React from 'react';
import {NavLink as Link} from 'react-router-dom';

import medialabLogo from '../assets/medialab-logo.svg';
import zkmLogo from '../assets/zkm-logo.svg';


export default ({
  translate
}) => (
  <footer>
        <div className="columns">
          <div>
            <p>
              {translate('for-information-contact')}
            </p>
            <p>
              <a href="mailto:info@ouatterrir.fr">info@ouatterrir.fr</a>
            </p>
          </div>
          <div>
            <p>
              <Link to="/mentions"><span>{translate('legal-mentions')}</span></Link>
            </p>
            <p>
              <a target="blank" rel="noopener" href="https://github.com/medialab/ouatterrir">{translate('website-source-code')}</a>
            </p>
            <p>
              <a target="blank" rel="noopener" href="https://zkm.de/en/exhibition/2020/05/critical-zones">{translate('critical-zones-website')}</a>
            </p>
            <p>
              <a target="blank" rel="noopener" href="http://www.bruno-latour.fr">{translate('latour-website')}</a>
            </p>
            
          </div>
          <div className="logos-wrapper">
            <div className="logos-foreword">
              {translate('logo-foreword')} <a target="blank" rel="noopener" href="http://ouatterrir.fr/">Où atterrir ?</a>
            </div>
            <div className="logos-container">
                <a target="blank" className="logo" rel="noopener" href="https://medialab.sciencespo.fr">
                  <img src={medialabLogo} />
                </a>
                <a target="blank" className="logo" rel="noopener" href="https://zkm.de">
                  <img src={zkmLogo} />
                </a>
              </div>
          </div>
            
        </div>
      </footer>
)
