var $ = window.jQuery

class MarvelApi {
	constructor (key) {  // para que todas las llamadas al api de marvel tengan la llave publica 
		this.key = key
		this.baseUrl = 'http://gateway.marvel.com:80/v1/public/'
	}

	findSeries (title) {
		let url = `${this.baseUrl}series?title=${title}&apikey=${this.key}`
		return Promise.resolve($.get(url))
		.then((res) => {
			return res.data.results[0]
		})
	}

	getResourceURI (resourceURI) {
		let url = `${resourceURI}?apikey=${this.key}`
		return Promise.resolve($.get(url))
		.then((res) => {
			return res.data.results[0]
		})
	}
}

window.MarvelApi = MarvelApi