import React, {useState, useEffect} from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink as Link
} from "react-router-dom";

import Questionnaire from './components/Questionnaire';
import Home from './components/Home';
import LegalMentions from './components/LegalMentions';

import frLocale from './locales/fr';
import enLocale from './locales/en';

const locales = {
  fr: frLocale,
  en: enLocale
};

const EventListener = function() {
  this.subscribers = []
  this.addSubscriber = (fn) => {
    this.subscribers.push(fn)
  }
  this.onEvent = function(key, payload) {
    this.subscribers.forEach(subscriber => {
      subscriber(key, payload)
    })
  }
}

export default function BasAppicExample() {
  /**
   * Get initial lang
   */
  let initialLang = 'fr';
  const localLang = localStorage.getItem('mayday/lang');
  const browserLang = navigator.language || navigator.userLanguage;
  if (localLang) {
    initialLang = localLang
  }
  else if (browserLang) {
    initialLang = browserLang === 'fr' ? 'fr' : 'en';
  }

  const [lang, setLang] = useState(initialLang);

  /**
   * Save lang change to local storage
   */
  useEffect(() => {
    localStorage.setItem('mayday/lang', lang);
  }, [lang]);

  const handleSwitchLang = () => {
    if (lang === 'fr') {
      setLang('en');
    } else {
      setLang('fr');
    }
  }
  /**
   * Set translate fn to use throughout the app
   */
  const locale = locales[lang];
  const translate = id => {
    return locale[id] || id;
  }

  const [eventListener] = useState(new EventListener())

  const handleQuestionnaireClick = () => {
    eventListener.onEvent('questionnaireClick')
  }


  return (
    <Router>
      
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/" className="home-link"><span>{translate('website-title')}</span></Link>
            </li>
            <li>
              <Link onClick={handleQuestionnaireClick} to="/questionnaire"><span>{translate('questionnaire')}</span></Link>
            </li>
            <li>
              <Link to="/mentions"><span>{translate('legal-mentions')}</span></Link>
            </li>
            <li>
              <span style={{cursor: 'pointer'}} onClick={handleSwitchLang}>
                {lang === 'fr' ? <b>fr</b> : 'fr'}/{lang === 'fr' ? 'en' : <b>en</b>}
              </span>
            </li>
          </ul>
        </nav>

        <main>
          <Switch>
            <Route exact path="/">
              <Home {...{translate, lang}} />
            </Route>
            <Route path="/questionnaire">
              <Questionnaire {...{translate, lang, eventListener}} />
            </Route>
            <Route path="/mentions">
              <LegalMentions {...{translate, lang}} />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}
