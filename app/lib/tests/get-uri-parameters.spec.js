const test = require('tape');
const getURIParameters = require('../util/get-uri-parameters');

test('Get URI Parameters Utility', function(assert){
	var jocation = { search: '?param=true&string=word&num=2' };
	var expected = {
		param: true,
		string: 'word',
		num: 2
	};
	var actual = getURIParameters(jocation.search.substr(1));

	assert.plan(3);

	assert.equal(typeof jocation.search, 'string', 'takes a string');
	assert.equal(typeof actual, 'object', 'outputs an object');
	assert.deepEqual(Object.keys(actual), Object.keys(expected), 'outputs key/value pair for each parameter');

	assert.end();
});