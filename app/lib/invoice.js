// const crypto = require('crypto');
const extend = require('./this-extend');
const randomHexValue = require('./random-hex-value');

class Invoice {
	constructor(config){
		this.extend = extend;
		this.date = new Date();
		this.id = randomHexValue(7);
		this.jobs = [];
		this.closed = false;

		this.vendor = {
			name: 'Tonio Hubilla', 
			street_addr: '13/4-10 VIEW STREET',
			town_city: 'Arncliffe',
			state_province: 'NSW',
			country: 'Australia',
			post_code: '2205',
			email_addr: 'tonio.hubilla@gmail.com',
			phone_num: '+1 (732) 713-0781',
		};

		this.client = {
			name: 'At Point of Care, LLC',
			prefix: 'POC'
		};

		if(config){
			if(config.date && typeof config.date === 'string'){
				this.extend(Object.assign(config, {
					date: new Date()
				}));	
			} else {
				this.extend(config);
			}
		}
	}

	get date_due(){
		var due = new Date();
		due.setDate(this.date.getDate() + 30);
		return due.toDateString();
	}

	get invoice_number(){
		
		return `${this.client.prefix}-${this.date.getFullYear()}-${this.id}`;
	}

	set invoice_number(value){
		this.client.prefix = value.split('-')[0];
		this.id = value.split('-')[2];
	}
}

module.exports = Invoice;
