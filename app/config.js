const jsonfile = nwbridge.require('jsonfile');

export function loadConfig(path, callback) {
	jsonfile.readFile(path, function (err, obj) {
		if (err) {
			return callback(err);
		}

		callback(null, obj);
	});
}