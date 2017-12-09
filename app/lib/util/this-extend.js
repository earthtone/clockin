module.exports = function extend(options){
	for(let k in options){
		if(options.hasOwnProperty(k)){
			this[k] = options[k];
		}
	}

	return this;
};