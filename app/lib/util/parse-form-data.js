module.exports = function parseFormData(form, options){
	var i = new FormData(form), 
		o = options || {};

	for(let [k, v] of i.entries()){
		o[k] = v;
	}

	return o;
};