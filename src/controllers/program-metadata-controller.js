const axios = require("axios")

// eslint-disable-next-line no-unused-vars
const Types = require("../types/types")

const ADAPTER_SERVICE_URL = process.env.ADAPTER_SERVICE_URL || "http://localhost:3040"

const PROGRAM_METADATA_MOVIE_SEARCH = `${ADAPTER_SERVICE_URL}/api/program-metadata/movie/search/{query}`
const PROGRAM_METADATA_TV_SHOW_SEARCH = `${ADAPTER_SERVICE_URL}/api/program-metadata/tv-show/search/{query}`

const PROGRAM_METADATA_MOVIE_DETAILS = `${ADAPTER_SERVICE_URL}/api/program-metadata/movie/{id}`
const PROGRAM_METADATA_TV_SHOW_DETAILS = `${ADAPTER_SERVICE_URL}/api/program-metadata/tv-show/{id}`

const PROGRAM_METADATA_MOVIE_RECOMMENDATIONS = `${ADAPTER_SERVICE_URL}/api/program-metadata/movie/recommendations/{id}`
const PROGRAM_METADATA_TV_SHOW_RECOMMENDATIONS = `${ADAPTER_SERVICE_URL}/api/program-metadata/tv-show/recommendations/{id}`

/**
 * Controller that handles the fetch of the program metadata
 * @memberof Controllers
 */
class ProgramMetadataController {
    constructor() {
        this.searchMovies = this.searchMovies.bind(this)
        this.searchTvShows = this.searchTvShows.bind(this)
        this.getMovieDetails = this.getMovieDetails.bind(this)
        this.getTvShowDetails = this.getTvShowDetails.bind(this)
        this.getTvShowRecommendations = this.getTvShowRecommendations.bind(this)
        this.getMovieRecommendations = this.getMovieRecommendations.bind(this)
    }

    /**
     * Search movie by query
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<Types.Movie[]>>} The list of movies compatible with the query
     * @throws Will throw an error if the request fails
     */
    async searchMovies(req, res) {
        const query = req.params.query
        const adaptedQuery = encodeURIComponent(query)

        var url = PROGRAM_METADATA_MOVIE_SEARCH.replace("{query}", adaptedQuery)
        req.log.info(`Calling adapter service: ${url}`)

        const response = await axios.get(url)

        req.log.info("Adapter service response is OK")

        var parsed = this.#parseSearchMovies(response.data.data, req.log)
        res.send({ data: parsed })
    }

    /**
     * Search tv show by query
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<Types.TVShow[]>>} The list of tv shows compatible with the query
     * @throws Will throw an error if the request fails
     */
    async searchTvShows(req, res) {
        const query = req.params.query
        const adaptedQuery = encodeURIComponent(query)

        var url = PROGRAM_METADATA_TV_SHOW_SEARCH.replace("{query}", adaptedQuery)
        req.log.info(`Calling adapter service: ${url}`)

        const response = await axios.get(url)

        req.log.info("Adapter service response is OK")

        var parsed = this.#parseSearchTvShows(response.data.data, req.log)
        res.send({ data: parsed })
    }

    /**
     * Get movie details by id
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<Types.Movie>>} The details of the movie
     * @throws Will throw an error if the request fails
     */
    async getMovieDetails(req, res) {
        const id = req.params.id

        var url = PROGRAM_METADATA_MOVIE_DETAILS.replace("{id}", id)
        req.log.info(`Calling adapter service: ${url}`)

        const response = await axios.get(url)

        req.log.info("Adapter service response is OK")
        var parsed = this.#parseMovieDetails(response.data.data, req.log)
        res.send({ data: parsed })
    }

    /**
     * Get tv show details by id
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<Types.TVShow>>} The details of the tv show
     * @throws Will throw an error if the request fails
     */
    async getTvShowDetails(req, res) {
        const id = req.params.id

        var url = PROGRAM_METADATA_TV_SHOW_DETAILS.replace("{id}", id)
        req.log.info(`Calling adapter service: ${url}`)

        const response = await axios.get(url)

        req.log.info("Adapter service response is OK")
        var parsed = this.#parseTvShowDetails(response.data.data, req.log)
        res.send({ data: parsed })
    }

    /**
     * Get tv show recommendations by id
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<Types.TVShow[]>>} The list of tv shows recommended
     * @throws Will throw an error if the request fails
     */
    async getTvShowRecommendations(req, res) {
        const id = req.params.id

        var url = PROGRAM_METADATA_TV_SHOW_RECOMMENDATIONS.replace("{id}", id)
        req.log.info(`Calling adapter service: ${url}`)

        const response = await axios.get(url)

        req.log.info("Adapter service response is OK")
        var parsed = this.#parseSearchTvShows(response.data.data, req.log)
        res.send({ data: parsed })
    }

    /**
     * Get movie recommendations by id
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<Types.Movie[]>>} The list of movies recommended
     * @throws Will throw an error if the request fails
     */
    async getMovieRecommendations(req, res) {
        const id = req.params.id

        var url = PROGRAM_METADATA_MOVIE_RECOMMENDATIONS.replace("{id}", id)
        req.log.info(`Calling adapter service: ${url}`)

        const response = await axios.get(url)

        req.log.info("Adapter service response is OK")
        var parsed = this.#parseSearchMovies(response.data.data, req.log)
        res.send({ data: parsed })
    }

    /**
     * Parse the search movies response into a list of movies
     * @param {object} data - The data object from the response
     * @param {Types.Logger} logger - The logger object
     * @returns {Types.Movie[]} The list of movies
     * @access private
     */
    #parseSearchMovies(data, logger) {
        try {
            if (!data) {
                throw new Error("Invalid Request, no data provided")
            }

            /** @type {Types.Movie[]} */
            let movies = []

            for (let movie of data.results) {
                try {
                    movies.push({
                        id: movie?.id,
                        title: movie?.title,
                        original_title: movie?.original_title,
                        description: movie?.overview,
                        release_date: movie?.release_date,
                        poster_path:
                            movie?.poster_path?.length > 0
                                ? `https://image.tmdb.org/t/p/original${movie?.poster_path}`
                                : "",
                        original_language: movie?.original_language,
                    })
                } catch (error) {
                    logger.error(`Error parsing search movie: ${error.message}`)
                }
            }

            logger.info(`Parsed ${movies.length} movies`)
            return movies
        } catch (error) {
            logger.error(`Error parsing search movies: ${error.message}`)
            return []
        }
    }

    /**
     * Parse the search tv-shows response into a list of tv-shows
     * @param {object} data - The data object from the response
     * @param {Types.Logger} logger - The logger object
     * @returns {Types.TVShow[]} The list of tv-shows
     * @access private
     */
    #parseSearchTvShows(data, logger) {
        try {
            if (!data) {
                throw new Error("Invalid Request, no data provided")
            }

            /** @type {Types.TVShow[]} */
            let tvShows = []

            for (let tvShow of data.results) {
                try {
                    tvShows.push({
                        id: tvShow?.id,
                        title: tvShow?.name,
                        original_title: tvShow?.original_name,
                        description: tvShow?.overview,
                        poster_path:
                            tvShow?.poster_path?.length > 0
                                ? `https://image.tmdb.org/t/p/original${tvShow?.poster_path}`
                                : "",
                        original_language: tvShow?.original_language,
                    })
                } catch (error) {
                    logger.error(`Error parsing search tv-show: ${error.message}`)
                }
            }

            logger.info(`Parsed ${tvShows.length} tvShows`)
            return tvShows
        } catch (error) {
            logger.error(`Error parsing search tv-shows: ${error.message}`)
            return []
        }
    }

    /**
     * Parse the movie details response into a movie object
     * @param {object} data - The data object from the response
     * @param {Types.Logger} logger - The logger object
     * @returns {Types.Movie} The movie object
     * @access private
     */
    #parseMovieDetails(data, logger) {
        try {
            if (!data) {
                throw new Error("Invalid Request, no data provided")
            }

            let movie = {
                id: data?.id,
                title: data?.title,
                original_title: data?.original_title,
                description: data?.overview,
                poster_path:
                    data?.poster_path?.length > 0
                        ? `https://image.tmdb.org/t/p/original${data?.poster_path}`
                        : "",
                release_date: data?.release_date,
                original_language: data?.original_language,
                genres: data?.genres?.map((genre) => genre.name),
                vote_average: data?.vote_average,
            }

            return movie
        } catch (error) {
            logger.error(`Error parsing movie details: ${error.message}`)
            return {}
        }
    }

    /**
     * Parse the tv-show details response into a tv-show object
     * @param {object} data - The data object from the response
     * @param {Types.Logger} logger - The logger object
     * @returns {Types.TVShow} The tv-show object
     * @access private
     */
    #parseTvShowDetails(data, logger) {
        try {
            if (!data) {
                throw new Error("Invalid Request, no data provided")
            }

            let tvShow = {
                id: data?.id,
                title: data?.name,
                original_title: data?.original_name,
                description: data?.overview,
                poster_path:
                    data?.poster_path?.length > 0
                        ? `https://image.tmdb.org/t/p/original${data?.poster_path}`
                        : "",
                original_language: data?.original_language,
                first_air_date: data?.first_air_date,
                last_air_date: data?.last_air_date,
                number_of_episodes: data?.number_of_episodes,
                number_of_seasons: data?.number_of_seasons,
                genres: data?.genres?.map((genre) => genre.name),
                in_production: data?.in_production,
                languages: data?.languages,
                origin_country: data?.origin_country,
                vote_average: data?.vote_average,
                seasons: data?.seasons?.map((season) => {
                    return {
                        id: season?.id,
                        name: season?.name,
                        overview: season?.overview,
                        season_number: season?.season_number,
                        episode_count: season?.episode_count,
                        air_date: season?.air_date,
                        poster_path:
                            season?.poster_path?.length > 0
                                ? `https://image.tmdb.org/t/p/original${season?.poster_path}`
                                : "",
                    }
                }),
            }

            return tvShow
        } catch (error) {
            logger.error(`Error parsing tv-show details: ${error.message}`)
            return {}
        }
    }
}

module.exports = ProgramMetadataController
