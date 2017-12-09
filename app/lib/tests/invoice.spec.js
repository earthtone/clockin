const test = require('tape');
const randomHexValue = require('../util/random-hex-value');

const Job = require('../job');
const Invoice = require('../invoice');


var vendor = {
	name: 'Tonio Hubilla', 
	street_addr: '13/4-10 VIEW STREET',
	town_city: 'Arncliffe',
	state_province: 'NSW',
	country: 'Australia',
	post_code: '2205',
	email_addr: 'tonio.hubilla@gmail.com',
	phone_num: '+1 (732) 713-0781',
};

var client = {
	name: 'At Point of Care, LLC',
	prefix: 'POC'
};

test('Invoice Class returns and object', function(assert){
	var x = new Invoice(),
		expected = 'object',
		actual = typeof x;

	assert.equal(expected, actual);
	assert.end();
});

test('Invoice Class contains client data', function(assert){
	var actual = new Invoice(),
		expected = client;

	assert.deepEqual(expected, actual.client);
	assert.end();
});

test('Invoice Class contains vendor data', function(assert){
	var actual = new Invoice(),
		expected = vendor;

	assert.deepEqual(expected, actual.vendor);
	assert.end();
});

test('Invoice Class is writeable and configurable', function(assert){
	var actual = new Invoice({
			client: {
				name: 'International Business Machines',
				prefix: 'IBM'
			}
		}),
		expected = {
			name: 'International Business Machines',
			prefix: 'IBM'
		};

	assert.deepEqual(expected, actual.client);
	assert.end();
});

test('Invoice Class contains a date property', function(assert){
	var actual = new Invoice();
	var expected = new Date().toDateString();

	assert.equal(actual.date.toDateString(), expected);
	assert.end();
});

test('Invoice Class contains a date_due property', function(assert){
	var actual = new Invoice();
	var x = new Date();
	var expected = x;
	expected.setDate(x.getDate() + 30);

	assert.equal(actual.date_due, expected.toDateString());
	assert.notEqual(actual.date.toDateString(), actual.date_due); 
	assert.end();
});

test('Invoice Class contains an array of jobs', function(assert){
	var actual = new Invoice();
	var job = new Job({
		rate: 30,
		jobnum: '5004.D',
		description: 'web'
	});

	actual.jobs.push(job);
	assert.ok(Array.isArray(actual.jobs));
	assert.equal(job, actual.jobs[0]);	
	assert.end();
});

test('Invoice Class adds jobs without affecting other parameters', function(assert){
	var expected = new Date();
	var actual = new Invoice();
	var job = new Job({
		rate: 30,
		jobnum: '5004.D',
		description: 'web'
	});

	assert.equal(expected.getDate(), actual.date.getDate());

	actual.jobs.push(job);
	assert.equal(expected.getDate(), actual.date.getDate());
	assert.end();
});

test('Invoice Class creates an invoice number with the current year and client prefix', function(assert){
	var actual = new Invoice();
	var expected = new RegExp(`${actual.client.prefix}-${actual.date.getFullYear()}`);

	assert.ok(actual.invoice_number.match(expected));
	assert.end();
});

test('Invoice Class updates its invoice number if set externally', function(assert){
	var hex = randomHexValue(7),
		expected = `ECP-1984-${hex}`,
		actual = new Invoice();

	assert.notEqual(actual.invoice_number, expected);

	actual.invoice_number = expected;
	assert.equal(actual.invoice_number.split('-')[0], expected.split('-')[0]);
	assert.equal(actual.invoice_number.split('-')[2], expected.split('-')[2]);
	assert.end();
});
