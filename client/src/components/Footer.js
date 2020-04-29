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
              Project email
            </p>
            <p>
              Project contact
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
              <a target="blank" rel="noopener" href="https://www.bruno-latour.fr">{translate('latour-website')}</a>
            </p>
            <p className="logos-container">
              <a target="blank" className="logo" rel="noopener" href="https://medialab.sciencespo.fr">
                <img src={medialabLogo} />
              </a>
              <a target="blank" className="logo" rel="noopener" href="https://zkm.de">
                <img src={zkmLogo} />
              </a>
            </p>
          </div>
        </div>
      </footer>
)