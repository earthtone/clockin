const html = require('bel');
const extend = require('./this-extend');
const hex = require('./random-hex-value');

/** 
	UI Component 
	@class
*/
function View(config){
	if(!config.id){
		this.id = hex(7);
	}

	if(!config.parentNode){
		throw new Error('No Parent Node');
	}

	this.classList = [];
	this.data = {};
	this.extend = extend;

	this.extend(config);
	return this;
}

/**
	Mount Component to Parent DOM Node
	@param { function } callback - callback function
	@param { array } args - arguments for callback function
*/
View.prototype.mount = function(callback, ...args){
	const $el = this.render();

	if(this.parentNode.firstChild && this.parentNode.firstChild.id == this.id){
		this.update();
	} else {
		this.parentNode.appendChild($el);
	}

	if(callback){
		setTimeout(() => callback(...args), 50);
	}
};

/**
	Update Component with Update State
	@param { DOM } target - target parent DOM node
	@param { function } callback - callback function
	@param { array } args - arguments for callback function
*/
View.prototype.update = function(callback, ...args){
	var o = this.parentNode.querySelector(`#${this.id}`),
		n = this.render();

	this.parentNode.replaceChild(n, o);

	if(callback){
		setTimeout(() => callback(...args), 50);
	}
};

/** HTML Output */
View.prototype.render = function(){
	return html`<div id="${this.id}" class="${this.classList.join(' ')}">
		${this.data && this.data.textContent ? this.data.textContent : 'This is a View Component'}
	</div>`;
};

/**
	Escape String Containing HTML
	@param { string } string - source string containing HTML
*/
View.prototype.escape = function(string, ...classList){
	var $el = document.createElement('div');
	$el.innerHTML = string;

	if(classList){
		classList.forEach(className => $el.classList.add(className));
	}

	return $el;
};

module.exports = View;