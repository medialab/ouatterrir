const {calendarIcal} = require('config');
const ical = require('ical');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const TARGET_FILE_PATH = path.resolve(`${__dirname}/../client/src/assets/calendar.json`);

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

axios(calendarIcal)
.then(({data: str}) => {
	const data = ical.parseICS(str)
	const events = [];
	for (key in data) {
		const obj = data[key];
		// console.log(obj)
		if (obj.type === 'VEVENT') {
			events.push({
				title: obj.summary,
				start: new Date(obj.start).getTime(),
				end: new Date(obj.end).getTime(),
				...parseDescription(obj.description)
			})
		}
	}
	return new Promise((res, rej) => {
		fs.writeFile(TARGET_FILE_PATH, JSON.stringify(events, null, 2), 'utf8', err => {
			if (err) rej(err)
			res()
		})
	})
})
.then(() => {
	console.log('done updating calendar');
})
.catch(console.log)