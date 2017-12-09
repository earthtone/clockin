const test = require('tape');
const matrixify = require('../util/matrixify');

test('Matrixify Utility', function(assert){
	var a = Array.from(Array(9), (x, i) => i);	

	var expected = [ [0, 1, 2], [3, 4, 5], [6, 7, 8] ];
	var actual = matrixify(a, 3);

	assert.plan(7);
	
	assert.ok(Array.isArray(actual), 'takes a one-dimensional array');
	assert.deepEqual(expected, actual, 'returns a multi-dimenstional array');

	

	a = Array.from(Array(10), (x, i) => i);	

	expected = 2;
	actual = matrixify(a, 2);

	actual.forEach(arr => {
		assert.equal(expected, arr.length, 'with a sub-array of specified width');
	});

	assert.end();
});