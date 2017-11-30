const extend = require('./this-extend');
const Counter = require('./counter');

class Job extends Counter{
	constructor(options){
		super(options.target);

		this.extend = extend;
		this.creation_date = new Date();

		this.extend(options);
	}

	get date(){
		var d = this.input_date || this.creation_date;
		return new Date(d);
	}

	get duration(){
		return this.time();
	}

	get hours(){
		return this.duration * 0.0000002777778;
	}

	set hours(val){
		return this.val;
	}

	get dollars(){
		var rate = parseFloat(this.rate.substr(1)),
			hrs = this.hours || this.input_hours;

		return (rate * hrs).toFixed(2);
	}
}

module.exports = Job;