const test = require('tape');
const View = require('../view');

test('View Class', function(assert){
	var component =  new View({
		id: 'component-view',
		parentNode: document.body,
		classList: ['component', 'demo', 'arbitrary'],
		data: {
			textContent: 'Hello World!'
		}
	});
	
	var $body = document.body, 
		actual,
		$el;

	assert.plan(11);

	// Init
	assert.comment('On Init');
	assert.equal(component.id, 'component-view', 'takes config options and updates itself');

	var v = new View({ parentNode: $body });
	assert.ok(v.id);

	assert.throws(function(){
		new View();
	}, Error, 'throws error if no parent node given');

	// Mount Method
	assert.comment('Mount Method');

	actual = component.render();
	assert.equal(actual.toString(), '[object HTMLDivElement]', 'has a render method which returns valid DOM Nodes');

	component.mount();

	assert.ok($body.querySelector('#component-view'), 'appends component to its parentNode');

	// Update Method
	assert.comment('Update Method');
	$body.innerHTML = '';
	component.mount();

	$el = $body.querySelector('#component-view');
	assert.equal($el.textContent.trim(), 'Hello World!', 'after initial mount');
		
	component.data.textContent = 'Goodbye World!';
	component.update();

	$el = $body.querySelector('#component-view');
	assert.equal($el.textContent.trim(), 'Goodbye World!', 'replaces component on parent node');


	// Escape Method
	assert.comment('Escape Method');

	var inner = '<h1>Hello World</h1>';
	actual = component.escape(inner, 'class-name', 'second-class-name');

	assert.equal(typeof inner, 'string', 'HTML in a string literal');
	assert.equal(actual.toString(), '[object HTMLDivElement]', 'returns a DOM Node');
	assert.ok(actual.classList.contains('class-name'), 'adds classes');
	assert.ok(actual.classList.contains('second-class-name'), 'adds classes');

	assert.end();
});