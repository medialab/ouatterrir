import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import Md from 'react-markdown';
import moment from 'moment';
import 'moment/locale/fr.js';
import {getEvents} from '../helpers/client';

import Footer from './Footer';

export default function({
  translate,
  match: {
    params: {
      showDrafts = false
    }
  },
  lang
}) {

  const [rawEvents, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const events = showDrafts === 'drafts' ? rawEvents : rawEvents.filter(e => !e.draft);

  useEffect(() => {
   getEvents()
   .then(({data}) => {
     setEvents(data);
   }) 
   .catch((e) => {
     console.error(e);
     setError(e);
   })
  }, [])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  });
  const now = new Date().getTime();
  const pastEvents = events.filter(event => event.end < now);
  const currentEvents = events.filter(event => event.end >= now);
  moment.locale(lang)
  const renderEventsList = evs => (
    <table className="events-list-container">
      <thead>
        <tr>
          <th>{translate('when')}</th>
          <th>{translate('event')}</th>
          <th>{translate('moderators')}</th>
        </tr>
      </thead>
      <tbody>
        {
          evs.map((event, index) => (
            <tr key={index}>
              <td className="dates-container">
                {moment(event.start).local().format(lang === 'fr' ? "dddd Do MMMM YYYY, HH:mm" : "dddd MMMM, Do YYYY, HH:mm")} — {moment(event.end).local().format('HH:mm')}
              </td>
              <td className="event-container">
                <h2>{event.title}</h2>
                <Md source={event.description} />
              </td>
              <td className="moderators-container">
                {
                  event.moderators.map((moderator, index) => <span key={index}>{moderator}</span>)
                }
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
  return (
    <div className="events-container">
      <Helmet>
        <title>{translate('website-title')} | {translate('events')}</title>
      </Helmet>
      <div className="events-content">
        {
          events.length ?
          <>
            <div className="current-events events-section">
              <h1>{translate('events')}</h1>
              {currentEvents.length ? renderEventsList(currentEvents) : <h3>{translate('no-events')}</h3>}
            </div>
            {
              pastEvents.length ? 
              <div className="past-events events-section">
                <h1>{translate('past-events')}</h1>
                {renderEventsList(pastEvents)}
              </div>
              : null
            }
            
          </>
        : error ?
            <div className="events-info">
              {translate('events-could-not-be-retrieved')}
            </div>
            :
            <div className="events-info">
              {translate('loading-events')}
            </div>
        }      
      </div>
      <Footer {...{translate}} />
    </div>
  )
}