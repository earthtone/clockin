const os = require('os');
const fs = require('fs');
const path = require('path');

const electron = require('electron');
const { app, BrowserWindow, ipcMain, shell } = electron;

const Store = require('electron-store');
const Invoice = require('./app/lib/invoice');

const store = new Store({
	name: 'timekeeper-store'
});

var mainWindow, current = [];

if(!getCurrent().length){
	createInvoice();
}

app.on('ready', function(){
	mainWindow = new BrowserWindow({
		icon: path.join(__dirname, 'assets/icons/mac/icon.icns')
	});
	mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

ipcMain.on('create-new-invoice', function(event){
	createInvoice();
	exports.current = getCurrent();
	event.sender.send('invoice-updated');
});

ipcMain.on('open-window', function(event, target, id){
	let win = new BrowserWindow({ width: 320, height: 700});
	win.loadURL(`file://${__dirname}/app/views/${target}.html`);
	
	setTimeout(() => win.webContents.send('edit-current-invoice', id), 500);
});

ipcMain.on('add-new-job', function(event, job, doc){
	var current = store.get(doc);
	current.jobs.push(job);
	store.set(doc, current);
	
	exports.current = getCurrent();
	mainWindow.webContents.send('invoice-updated', current);
});

ipcMain.on('update-current-invoice', function(event, ...args){
	var o = store.get(args[0]);
	o[args[1]] = args[2];

	var n = new Invoice(o);
	store.set(n.invoice_number, n);
	o.closed = true;
	store.set(args[0], o);

	let updated_current = getCurrent();
	
	exports.current = updated_current;
	mainWindow.webContents.send('invoice-updated');
});

ipcMain.on('print-to-pdf', function(event){
	let pdfPath = path.join(os.tmpdir(), 'print.pdf');
	let win = BrowserWindow.fromWebContents(event.sender);

	win.webContents.printToPDF({}, function(err, data){
		if(err){ 
			throw err;
		}

		fs.writeFile(pdfPath, data, function(err){
			if(err){
				throw err;
			}

			shell.openExternal('file://' + pdfPath);
			event.sender.send('wrote-pdf', pdfPath);
		});
	});
});

ipcMain.on('close-current-invoice', function(event, key){
	var o = store.get(key);
	o.closed = true;

	var i_date = new Date();
	var d_date = new Date();
	d_date.setDate(i_date.getDate() + 30);

	o.date = i_date.toJSON();
	o.due_date = d_date.toJSON();
	
	store.set(key, o);

	exports.current = getCurrent();
	mainWindow.webContents.send('invoice-updated', current);
});

function createInvoice(){
	let val = new Invoice();
	let key = val.invoice_number;
	
	store.set(key, val);
}

function getCurrent(){
	var current = [];

	for(let [k, v] of store){
		if(!v.closed){
			current.push(v);
		}
	}	

	return current;
}

exports.store = store;
exports.current = getCurrent();