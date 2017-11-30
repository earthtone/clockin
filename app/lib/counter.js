function Counter(){
	var startAt = 0,
		stopAt = 0, 
		now = function(){
			return (new Date()).getTime();
		},
		pad = function(num, size){
			var s = '0000' + num;
			return s.substr(s.length - size);
		};

	this.start = () => {
		startAt = startAt ? startAt : now();
		this.timer = setInterval(redirect, 100, this);

		function redirect(w){
			return w.render();
		}
	};

	this.stop = () => {
		stopAt = startAt ? stopAt + now() - startAt : stopAt;
		startAt = 0;
		clearInterval(this.timer);
	};

	this.reset = function(){
		stopAt = startAt = 0;
	};

	this.time = function(){
		return stopAt + (startAt ? now() - startAt : 0);
	};

	this.formattedTime = () => {
		var h = 0,
			m = 0,
			s = 0,
			ms = 0;
		
		var current = this.time();

		ms = current % 1000;
		current = (current - ms) / 1000;

		s = current % 60;
		current = (current - s) / 60;

		m = current % 60;
		h = (current - m) / 60;

		return `${pad(h, 2)}:${pad(m, 2)}:${pad(s, 2)}.${pad(ms, 3)}`;
	};

	this.render = function(){
		if(this.target){
			this.target.innerHTML = this.formattedTime();
		}
	};
}

module.exports = Counter;
