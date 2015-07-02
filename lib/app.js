var $ = window.jQuery
var MarvelApi = window.MarvelApi

var key = 'f1527e7aae95ea7dc033527c850532d1'
var api = new MarvelApi(key)

api.findSeries('avengers')
.then((serie) => { 
	let serieImage = `url(${serie.thumbnail.path}.${serie.thumbnail.extension})`
	$('body').css('background-image', serieImage)
	var characters = serie.characters.items
	var promises = []
	for (let character of characters) {
		let promise = api.getResourceURI(character.resourceURI)
		promises.push(promise)
	}
	return Promise.all(promises)
})
.then((characters) => {
	$('.Card').each((i, item) => {
		let character = characters[i]
		let $this = $(item)
		let $name = $this.find('.Card-name')
		let $image = $this.find('.Card-image')
		let $description = $this.find('.Card-description')

		$name.text(character.name)
		$image.attr('src', `${character.thumbnail.path}.${character.thumbnail.extension}`)
		$description.text(character.description)
	})
	console.log(characters);
})
.catch((err) => {
	console.error(err)
})

