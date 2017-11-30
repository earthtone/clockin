const test = require('tape');
const arrayify = require('../lib/arrayify');

test('Arrayify Utility', function(assert){
	var o = {
		param: true,
		string: 'true',
		num: 0
	};

	var actual = arrayify(o);

	assert.plan(4);

	assert.equal(typeof actual, typeof [], 'takes an object and returns an array');
	assert.equal(actual[0], o.param, 'retains boolean values of object parameter');
	assert.equal(actual[1], o.string, 'retains string values of object parameter');
	assert.equal(actual[2], o.num, 'retains number values of object parameter');

	assert.end();
});
