const test = require('tape');
const crypto = require('crypto');

const Invoice = require('../lib/invoice');
const Job = require('../lib/job');

function setup(){
	var i = new Invoice(new Date());
	var j = new Job({
		job_id: '1001.11',
		invoice_id: i.invoice_number,
		description: 'web development of some sort',
		rate: 30
	});

	return { j, i };
}

test('Job Model has a date property', function(assert){
	var fixtures = setup();
	assert.ok(fixtures.j.date.toDateString);
	assert.end();
});

test('Job Model has a default description property', function(assert){
	var fixtures = setup();
	var actual = typeof fixtures.j.description,
		expected = 'string';

	assert.equal(actual, expected);
	assert.end();
});

test('Job Model has a default duration number', function(assert){
	var fixtures = setup();
	var actual = typeof fixtures.j.duration,
		expected = 'number';

	assert.equal(actual, expected);
	assert.end();
});

test('Job Model has a rate number', function(assert){
	var fixtures = setup();
	var actual = typeof fixtures.j.rate,
		expected = 'number';

	assert.equal(typeof fixtures.j.rate, 'number');
	assert.end();
});

test('Job Model has a job id', function(assert){
	var fixtures = setup();
	var actual = typeof fixtures.j.job_id,
		expected = 'string';

	assert.equal(actual, expected);
	assert.ok(fixtures.j.job_id.match(/[\d]/ig));
	assert.end();
});

test('Job Model has an invoice id', function(assert){
	var fixtures = setup();
	var expected = fixtures.i.invoice_number,
		actual = fixtures.j.invoice_id;

	assert.equal(actual, expected);
	assert.end();
});