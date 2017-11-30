const test = require('tape');
const Counter = require('../lib/counter');

test('Counter Class has a start method', function(assert){
	var c = new Counter();
	assert.ok(c.start);
	assert.equal(typeof c.start, 'function');

	assert.end();
});

test('Counter Class has  a stop method', function(assert){
	var c = new Counter();
	assert.ok(c.stop);
	assert.equal(typeof c.stop, 'function');

	assert.end();
});

test('Counter Class has a reset method', function(assert){
	var c = new Counter();
	assert.ok(c.reset);

	c.start();
	setTimeout(function(){
		c.stop();
		assert.ok(c.time() > 0);
		
		c.reset();
		assert.equal(c.time(), 0);
		assert.end();
	}, 1000);
});

test('Counter Class calculates time passing between start and stop', function(assert){
	var c = new Counter();
	var actual = c.time;
	var expected = 1000;

	c.start();	
	setTimeout(function(){
		c.stop();
		assert.ok(actual() >= expected);
		assert.end();
	}, expected);
});

test('Counter Class formats time passed', function(assert){
	var c = new Counter();
	var actual = c.formattedTime;
	var expected = 1000;
	
	c.start();
	setTimeout(function(){
		c.stop();
		assert.equal(typeof actual(c.time()), 'string');
		assert.ok(actual(c.time()).match(/\d\d:\d\d:\d\d\.\d/ig));
		assert.end();
	}, expected);
});