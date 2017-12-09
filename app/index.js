const html = require('bel');
const EventEmitter = require('events');
var bus = new EventEmitter();

const ipc = require('electron').ipcRenderer;
const main = require('electron').remote.require('./main');
const store = main.store;

const InvoiceForm = require('./views/components/invoice-form');

window.addEventListener('load', function init(){
	window.store = store;
	updateInvoices();
});

document.querySelector('#open-menu').addEventListener('click', toggleMenu);
document.querySelector('#create-doc').addEventListener('click', function(e){
	e.preventDefault();
	ipc.send('create-new-invoice');
	toggleMenu();
});

document.querySelectorAll('.opn-btn').forEach(button => {
	button.addEventListener('click', e => {
		e.preventDefault();
		button.parentNode.classList.toggle('w3-show');
		
		ipc.send('open-window', e.target.dataset.target, document.querySelector('button.current').dataset.target);
	});
});

document.querySelector('.print-btn').addEventListener('click', e => {
	e.preventDefault();
	e.target.parentNode.classList.toggle('w3-show');
	ipc.send('print-to-pdf');
});

document.querySelector('.close-invoice-btn').addEventListener('click', e => {
	e.preventDefault();
	e.target.parentNode.classList.toggle('w3-show');
	
	ipc.send('close-current-invoice', document.querySelector('button.current').dataset.target);
});



ipc.on('invoice-updated', updateInvoices);

function updateInvoices(){
	var current = main.current;

	var o = document.querySelector('#app-container');
	var n = html`<main id="app-container">
		<nav id="tab-list">
			${current.map((invoice, i) => {
					let id = `${invoice.client.prefix}-${new Date(invoice.date).getFullYear()}-${invoice.id}`;
					
					return html`<button class="tab ${i === 0 ? 'current' : ''}" data-target=${id}>${id}</button>`;
			})}
		</nav>
		${current.map(invoice => new InvoiceForm(invoice))}
	</main>`;
	
	document.body.replaceChild(n, o);
	bus.emit('dom:updated');
}

bus.on('dom:updated', function(){
	document.querySelectorAll('.tab').forEach(tab => {
		if(tab.classList.contains('current')){
			document.querySelector(`#${tab.dataset.target}`).classList.add('current');	
		} 

		tab.addEventListener('click', function(e){
			e.preventDefault();
			document.querySelectorAll('.current').forEach(n => n.classList.remove('current'));

			/* eslint-disable no-invalid-this */
			this.classList.add('current');
			document.querySelector(`#${this.dataset.target}`).classList.add('current');
			/* eslint-enable no-invalid-this */
		});
	});
});

function toggleMenu(e){
	if(e) {
		e.preventDefault()
	}

	document.querySelector('.w3-dropdown-content').classList.toggle('w3-show');
}