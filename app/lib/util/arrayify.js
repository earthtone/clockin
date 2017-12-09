module.exports = function(data){
	var result = [];

	for(let k in data){
		result.push(data[k]);
	}

	return result;
};