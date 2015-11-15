exports.addData = function( document ) {
	tmp = document.temp;
	tm = document.tm;
	metrics = {
		"time": tm,
		"y": tmp
	}
};

exports.aggregate = function() {
	return metrics;
}

exports.reset = function() {
	temp = 0;
}
