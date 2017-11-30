/* eslint-disable quotes */
module.exports = function getURIParameters(string) {
	var result = JSON.parse('{"' + string.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value); });
	
	for(let k in result){
		if(result[k].match(/true/ig)){
			result[k] = true;
		} else if (result[k].match(/false/ig)){
			result[k] = false;
		} else if (result[k].match(/[0-9]^/ig)){
			result[k] = parseInt(result[k]);
		}
	}

	return result;
};
