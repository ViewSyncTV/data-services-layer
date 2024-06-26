/**
 * This nampespace defines the routes for accessing the data from the Movie and TvShow APIs
 * @namespace API.ProgramMetadata
 * @category API
 * @subcategory External Resources
 * @requires express
 */

const express = require("express")
const ProgramMetadataController = require("../controllers/program-metadata-controller")
const { asyncHandler } = require("../middleware/error_handler")
// eslint-disable-next-line no-unused-vars
const API = require("./router")

const router = express.Router()
const programMetadataController = new ProgramMetadataController()

/**
 * Base route of the Metadata API
 * @name Root
 * @route {GET} /api/program-metadata
 * @memberof API.ProgramMetadata
 */
router.get("/", (req, res) => {
    res.send("This is the program metadata API endpoint!")
})

/**
 * Search for movies given a query. <br>
 * The data is retrieved from the Adapter Layer and then parsed into the Movie object
 * @name MovieSearch
 * @route {GET} /api/program-metadata/movie/search/:query
 * @routeparam {string} :query - The query to search for
 * @memberof API.ProgramMetadata
 * @example
 * // Example of request
 * GET /api/program-metadata/movie/search/joker
 *
 * // Example of response
 * {
 *   "data": [
 *      {"id":475557,"title":"Joker","original_title":"Joker","description":"Arthur Fleck vive con l'anziana madre in un palazzone fatiscente e sbarca il lunario facendo pubblicità per la strada travestito da clown, in attesa di avere il giusto materiale per realizzare il desiderio di fare il comico. La sua vita, però, è una tragedia: ignorato, calpestato, bullizzato, preso in giro da da chiunque, ha sviluppato un tic nervoso che lo fa ridere a sproposito incontrollabilmente, rendendolo inquietante e allontanando ulteriormente da lui ogni possibile relazione sociale. Ma un giorno Arthur non ce la fa più e reagisce violentemente, pistola alla mano. Mentre la polizia di Gotham City dà la caccia al clown killer, la popolazione lo elegge a eroe metropolitano, simbolo della rivolta degli oppressi contro l'arroganza dei ricchi.","release_date":"2019-10-01","poster_path":"https://image.tmdb.org/t/p/original/y1AthYH1r2j4N4cYn2HdrEGgrnJ.jpg","original_language":"en"},
 *      {"id":146486,"title":"Joker","original_title":"Joker","description":"Nicke loves practical jokes. When his best friend Pelle is getting married, Nicke is hosting the bachelor party. It will start with the kidnapping of Pelle. Everything goes wrong when Pelle is kidnapped for real by a terrorist group.","release_date":"1991-11-01","poster_path":"https://image.tmdb.org/t/p/original/rY8eu4yQTwpZgz8BEVKfGIh8TUG.jpg","original_language":"sv"}
 *      ...
 *   ],
 * }
 */
router.get("/movie/search/:query", asyncHandler(programMetadataController.searchMovies))

/**
 * Search for tv-shows given a query. <br>
 * The data is retrieved from the Adapter Layer and then parsed into the TvShow object
 * @name TvShowSearch
 * @route {GET} /api/program-metadata/tv-show/search/:query
 * @routeparam {string} :query - The query to search for
 * @memberof API.ProgramMetadata
 * @example
 * // Example of request
 * GET /api/program-metadata/tv-show/search/breaking+bad
 *
 * // Example of response
 * {
 *   "data": [
 *      {"id":1396,"title":"Breaking Bad","original_title":"Breaking Bad","description":"Un insegnante di chimica con un cancro allo stadio terminale comincia a produrre e spacciare metanfetamina con un suo ex studente per assicurare un futuro alla famiglia.","poster_path":"https://image.tmdb.org/t/p/original/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg","original_language":"en"},
 *      ...
 *    ],
 * }
 */
router.get("/tv-show/search/:query", asyncHandler(programMetadataController.searchTvShows))

/**
 * Get the details of a movie given its id (the id is the one from the IMDB API). <br>
 * The data is retrieved from the Adapter Layer and then parsed into the Movie object
 * @name MovieDetails
 * @route {GET} /api/program-metadata/movie/:id
 * @routeparam {string} :id - The id of the movie
 * @memberof API.ProgramMetadata
 * @example
 * // Example of request
 * GET /api/program-metadata/movie/123
 *
 * // Example of response
 * {
 *   "data": {
 *      "id":123,"title":"Il Signore degli Anelli","original_title":"The Lord of the Rings","description":"Ambiziosa versione in animazione della saga (1954-55) di John Ronald Reuel Tolkien. Giovane hobbit della Terra di Mezzo deve gettare nel fuoco della montagna l'anello malefico del Signore delle Tenebre. Mille difficoltà lo attendono.","poster_path":"https://image.tmdb.org/t/p/original/w4YJrNjQfMEx2oal7Taskg6oa93.jpg","release_date":"1978-11-15","original_language":"en","genres":["Avventura","Animazione","Fantasy"],"vote_average":6.6
 *   }
 * }
 */
router.get("/movie/:id", asyncHandler(programMetadataController.getMovieDetails))

/**
 * Get the details of a tv-show given its id (the id is the one from the TMDB API). <br>
 * The data is retrieved from the Adapter Layer and then parsed into the TvShow object
 * @name TvShowDetails
 * @route {GET} /api/program-metadata/tv-show/:id
 * @routeparam {string} :id - The id of the tv-show
 * @memberof API.ProgramMetadata
 * @example
 * // Example of request
 * GET /api/program-metadata/tv-show/123
 *
 * // Example of response
 * {
 *   "data": {
 *      "id":123,"title":"Starting Over","original_title":"Starting Over","description":"","poster_path":"https://image.tmdb.org/t/p/original/dfoTgMdVKF08Sqp4AeLlMcLaVV7.jpg","original_language":"en","first_air_date":"2003-09-09","last_air_date":"2004-11-05","number_of_episodes":235,"number_of_seasons":2,"genres":[],"in_production":false,"languages":[],"origin_country":["US"],"vote_average":8.5,"seasons":[{"id":358,"name":"Stagione 1","overview":"","season_number":1,"episode_count":195,"air_date":"2003-09-08","poster_path":""},{"id":359,"name":"Stagione 2","overview":"","season_number":2,"episode_count":40,"air_date":"2004-09-13","poster_path":""
 *   }
 * }
 */
router.get("/tv-show/:id", asyncHandler(programMetadataController.getTvShowDetails))

/**
 * Get the recommendations of a tv-show given its id (the id is the one from the TMDB API). <br>
 * The data is retrieved from the Adapter Layer and then parsed into the TvShow object
 * @name TvShowRecommendations
 * @route {GET} /api/program-metadata/tv-show/recommendations/:id
 * @routeparam {string} :id - The id of the tv-show
 * @memberof API.ProgramMetadata
 * @example
 * // Example of request
 * GET /api/program-metadata/tv-show/recommendations/123
 *
 * // Example of response
 * {
 *   "data": [{
 *      "id":123,"title":"Starting Over","original_title":"Starting Over","description":"","poster_path":"https://image.tmdb.org/t/p/original/dfoTgMdVKF08Sqp4AeLlMcLaVV7.jpg","original_language":"en","first_air_date":"2003-09-09","last_air_date":"2004-11-05","number_of_episodes":235,"number_of_seasons":2,"genres":[],"in_production":false,"languages":[],"origin_country":["US"],"vote_average":8.5,"seasons":[{"id":358,"name":"Stagione 1","overview":"","season_number":1,"episode_count":195,"air_date":"2003-09-08","poster_path":""},{"id":359,"name":"Stagione 2","overview":"","season_number":2,"episode_count":40,"air_date":"2004-09-13","poster_path":""
 *   }]
 * }
 */
router.get(
    "/tv-show/recommendations/:id",
    asyncHandler(programMetadataController.getTvShowRecommendations),
)

/**
 * Get the recommendations of a movie given its id (the id is the one from the TMDB API). <br>
 * The data is retrieved from the Adapter Layer and then parsed into the Movie object
 * @name MovieRecommendations
 * @route {GET} /api/program-metadata/movie/recommendations/:id
 * @routeparam {string} :id - The id of the movie
 * @memberof API.ProgramMetadata
 * @example
 * // Example of request
 * GET /api/program-metadata/movie/recommendations/123
 *
 * // Example of response
 * {
 *   "data": [{
 *     "id":123,"title":"Il Signore degli Anelli","original_title":"The Lord of the Rings","description":"Ambiziosa versione in animazione della saga (1954-55) di John Ronald Reuel Tolkien. Giovane hobbit della Terra di Mezzo deve gettare nel fuoco della montagna l'anello malefico del Signore delle Tenebre. Mille difficoltà lo attendono.","poster_path":"https://image.tmdb.org/t/p/original/w4YJrNjQfMEx2oal7Taskg6oa93.jpg","release_date":"1978-11-15","original_language":"en","genres":["Avventura","Animazione","Fantasy"],"vote_average":6.6
 *   }]
 * }
 */
router.get(
    "/movie/recommendations/:id",
    asyncHandler(programMetadataController.getMovieRecommendations),
)

module.exports = router
