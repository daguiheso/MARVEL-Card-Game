var $ = window.jQuery

var key = 'apikey=f1527e7aae95ea7dc033527c850532d1'
var url = 'http://gateway.marvel.com:80/v1/public/series?title=avengers&apikey=f1527e7aae95ea7dc033527c850532d1'
Promise.resolve($.get(url))
.then(function (results) { // cuando acabe esta funcion
	var characters = results.data.results[0].characters.items
	var promises = []
	for (var i in characters) {
		var character = characters[i]
		var characterUrl = `${character.resourceURI}?${key}`
		promises.push(Promise.resolve($.get(characterUrl)))
	}
	return Promise.all(promises)
})
.then(function (characters) {
	console.log(characters);
})
.catch(function (err) {
	console.error(err)
})

