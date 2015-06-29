var $ = window.jQuery
$.get('http://gateway.marvel.com:80/v1/public/series?title=avengers&apikey=f1527e7aae95ea7dc033527c850532d1')
.done(function (results) { // cuando acabe esta funcion
	var characters = results.data.results[0].characters.items
	debugger;
})