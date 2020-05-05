import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet';
import Md from 'react-markdown';
import events from '../assets/calendar.json';

import Footer from './Footer';

export default function({
  translate,
  lang
}) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  });
  const now = new Date().getTime();
  const pastEvents = events.filter(event => event.end < now);
  const currentEvents = events.filter(event => event.end >= now);
  console.log({currentEvents})
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
                {new Date(event.start).toDateString()} — {new Date(event.end).toDateString()}
              </td>
              <td className="event-container">
                <h2>{event.title}</h2>
                <Md source={event.description} />
              </td>
              <td className="moderators-container">
                {
                  event.moderators.map(moderator => <span key={moderator}>{moderator}</span>)
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
        <div className="current-events events-section">
          <h1>{translate('events')}</h1>
          {renderEventsList(currentEvents)}
        </div>
        <div className="past-events events-section">
          <h1>{translate('past-events')}</h1>
          {renderEventsList(pastEvents)}
        </div>
      </div>
      
      <Footer {...{translate}} />
    </div>
  )
}