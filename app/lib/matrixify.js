module.exports = function matrixify(array, width){
	return array.reduce(function(rows, key, index){
		// console.log({rows, key, index});
		return (index % width === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows;
	}, []);
};