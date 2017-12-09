// const assert = require('assert');
const test = require('tape');
const extend = require('../util/this-extend');

test('Extend Utility', function(assert){
	var o = {
		param: true,
		string: 'word',
		num: 1
	};

	class ExampleClass {
		constructor(){
			this.extend = extend;
		}
	}
	var expected = Object.assign(o, { extend: extend });
	var actual = new ExampleClass();
	actual.extend(o);

	assert.plan(1);

	assert.deepEqual(expected, actual, 'extends a class with an object');	

	assert.end();
});