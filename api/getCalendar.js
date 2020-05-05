const {calendarIcalURL} = require('config-secrets');
const ical = require('ical');
const axios = require('axios');
const path = require('path');

/**
 * Parses description html data of a google calendar event
 * according to a template we have defined
 * @param {str} str 
 */
const parseDescription = str => {
	const parts = str.replace(/<br>/g, '\n')
	.replace(/<[^>]*>/g, '')
	.split('---');
	const description = parts[1].trim();
	const props = parts[0].split('\n').map(t => t.split(':'))
	.filter(t => t[0].trim().length)
	.reduce((res, [key, value]) => ({
		...res,
		[key.trim()]: key.includes('moderators') ? value.split(',').map(t => t.trim()) : value.trim()
	}), {})
	return {
		description,
		...props
	}
}

const getCalendar = () => {
	return new Promise((resolve, reject) => {
		axios(calendarIcalURL)
		.then(({data: str}) => {
			let data;
			try {
				data = ical.parseICS(str)
				const events = [];
				for (key in data) {
					const obj = data[key];
					if (obj.type === 'VEVENT') {
						events.push({
							title: obj.summary,
							start: new Date(obj.start).getTime(),
							end: new Date(obj.end).getTime(),
							...parseDescription(obj.description)
						})
					}
				}
				return resolve(events);
			} catch(e) {
				reject(e);
			}
		})
		.catch(reject)
	})
	
}

module.exports = getCalendar;