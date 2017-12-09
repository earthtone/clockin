const test = require('tape');
const randomHexValue = require('../util/random-hex-value');
const parseFormData = require('../util/parse-form-data');

test('Parse Form Data Utility', function(assert){
	var actual, expected;
	var $form = document.createElement('form');

	for(let i = 1; i <= 3; i++){
		let input = document.createElement('input');
		
		input.type = 'text';
		input.name = `input-0${i}`;
		input.value = randomHexValue(i);

		$form.appendChild(input);
	}

	var data = parseFormData($form, {
		param: true
	});

	assert.plan(5);

	actual = typeof data,
	expected = 'object';

	assert.equal(actual, expected, 'takes in a form and returns an object');

	actual = data['input-01'],
	expected = $form.querySelector('[name="input-01"]', 'parses data from input form element').value;

	assert.equal(actual, expected);

	actual = data['input-02'];
	expected = $form.querySelector('[name="input-02"]', 'parses data from input form element').value;

	assert.equal(actual, expected);

	actual = data['input-03'],
	expected = $form.querySelector('[name="input-03"]').value;

	assert.equal(actual, expected, 'combines form data with any additional options');

	actual = data.param;
	expected = true;

	assert.equal(actual, expected, 'combines form data with any additional options');

	assert.end();
});