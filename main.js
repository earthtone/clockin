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

var mainWindow, current;

if(store.has('current')){
	current = new Invoice(store.get('current'));
} else {
	current = new Invoice(new Date());
	cacheData();	
}

app.on('ready', function(){
	mainWindow = new BrowserWindow({
		icon: path.join(__dirname, 'assets/icons/mac/icon.icns')
	});
	mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

ipcMain.on('open-window', function(event, target){
	let win = new BrowserWindow({ width: 320, height: 700});
	win.loadURL(`file://${__dirname}/app/views/${target}.html`);
});

ipcMain.on('add-new-job', function(event, job){
	current.jobs.push(job);
	cacheData();
	mainWindow.webContents.send('invoice-updated', current);
});

ipcMain.on('update-current-invoice', function(event, ...args){
	// console.log(args);
	var mod = {};
	mod[args[0]] = args[1];

	Object.assign(current, mod);
	cacheData();	
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

ipcMain.on('close-current-invoice', function(event, ...args){
	var archive_id = `${current.client.prefix}-${current.date.getFullYear()}-${current.id}`;
	current.closed = true;
	store.set(archive_id, current);
	
	current = new Invoice(new Date());
	store.set('current', current);

	store.openInEditor();
	mainWindow.webContents.send('invoice-updated', current);
});

ipcMain.on('open-new-invoice', function(event){
	current = new Invoice(new Date());
	mainWindow.webContents.send('invoice-updated', current);
});

function cacheData(){
	store.set('current', current);
	store.set('current.date_due', new Date(current.date_due).toJSON());
}

exports.current = current;
exports.store = store;