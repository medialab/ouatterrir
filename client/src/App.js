import React, {useState, useEffect} from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Questionnaire from './components/Questionnaire';
import Home from './components/Home';
import LegalMentions from './components/LegalMentions';
import Events from './components/Events';
import Nav from './components/Nav';
import Main from './components/Main';

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

export default function App() {
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
        <Nav
          {...{
            lang,
            handleQuestionnaireClick,
            handleSwitchLang,
            translate,
          }}
        />
        
        <Main>
          <Switch>
            <Route exact path="/">
              <Home {...{translate, lang}} />
            </Route>
            <Route path="/questionnaire">
              <Questionnaire {...{translate, lang, eventListener}} />
            </Route>
            <Route path="/events">
              <Events {...{translate, lang}} />
            </Route>
            <Route path="/mentions">
              <LegalMentions {...{translate, lang}} />
            </Route>
          </Switch>
        </Main>
        
      </div>
    </Router>
  );
}
