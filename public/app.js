'use strict';

var $ = window.jQuery;
var MarvelApi = window.MarvelApi;

var key = 'f1527e7aae95ea7dc033527c850532d1';
var api = new MarvelApi(key);

api.findSeries('avengers').then(function (serie) {
	var serieImage = 'url(' + serie.thumbnail.path + '.' + serie.thumbnail.extension + ')';
	$('body').css('background-image', serieImage);
	var characters = serie.characters.items;
	var promises = [];
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = characters[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var character = _step.value;

			var promise = api.getResourceURI(character.resourceURI);
			promises.push(promise);
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator['return']) {
				_iterator['return']();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return Promise.all(promises);
}).then(function (characters) {
	return characters.filter(function (character) {
		return !!character.thumbnail;
	});
}).then(function (characters) {
	$('.Card').each(function (i, item) {
		var character = characters[i];
		var $this = $(item);
		var $name = $this.find('.Card-name');
		var $image = $this.find('.Card-image');
		var $description = $this.find('.Card-description');

		$name.text(character.name);
		$image.attr('src', character.thumbnail.path + '.' + character.thumbnail.extension);
		$description.text(character.description);
	});
	console.log(characters);
})['catch'](function (err) {
	console.error(err);
});