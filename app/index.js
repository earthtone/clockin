const ipc = require('electron').ipcRenderer;
const main = require('electron').remote.require('./main');
const store = main.store;
const current = main.current;

const InvoiceForm = require('./views/components/invoice-form');
// const randomHex = require('./lib/random-hex-value');

var $form;

window.addEventListener('load', function init(){
	window.store = store;
	window.current = current;
	$form = new InvoiceForm(current);
	document.querySelector('#app-container').appendChild($form);	
});

document.querySelectorAll('.opn-btn').forEach(button => {
		button.addEventListener('click', e => {
			e.preventDefault();
			button.parentNode.classList.toggle('w3-show');
			ipc.send('open-window', e.target.dataset.target);
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
	// closeCurrentInvoice();	
	ipc.send('close-current-invoice');
})

document.querySelector('#open-menu').addEventListener('click', e => {
	e.preventDefault();
	document.querySelector('.w3-dropdown-content').classList.toggle('w3-show');
});

ipc.on('invoice-updated', updateCurrentInvoice);

function updateCurrentInvoice(sender, arg){
	if(arg){
		delete arg.date;
	}

	current.extend(arg);
	updateForm();
}

function updateForm(){
	$form = new InvoiceForm(current);
	document.querySelector('#app-container').replaceChild($form, document.querySelector('#invoice-form'));
	return Promise.resolve();
}