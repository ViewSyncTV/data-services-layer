const axios = require("axios")

const ADAPTER_SERVICE_URL = process.env.ADAPTER_SERVICE_URL || "http://localhost:3040"
const PROGRAM_METADATA_MOVIE_SEARCH = `${ADAPTER_SERVICE_URL}/api/program-metadata/movie/search/{query}`
const PROGRAM_METADATA_TV_SHOW_SEARCH = `${ADAPTER_SERVICE_URL}/api/program-metadata/tv-show/search/{query}`

class ProgramMetadataController {
    constructor() {
        this.searchMovies = this.searchMovies.bind(this)
        this.searchTvShows = this.searchTvShows.bind(this)
    }

    async searchMovies(req, res) {
        try {
            const query = req.params.query
            const adaptedQuery = encodeURIComponent(query)

            var url = PROGRAM_METADATA_MOVIE_SEARCH.replace("{query}", adaptedQuery)
            req.log.info(`Calling adapter service: ${url}`)

            const response = await axios.get(url)

            if (response.status == 200) {
                req.log.info("Adapter service response is OK")

                var parsed = this.#parseSearchMovies(response.data.data, req.log)
                res.send({ data: parsed })
            }
        } catch (error) {
            req.log.error(`Error searching movies: ${error.message}`)
            res.status(500).send({
                error: { message: "Error searching movies" },
            })
        }
    }

    async searchTvShows(req, res) {
        try {
            const query = req.params.query
            const adaptedQuery = encodeURIComponent(query)

            var url = PROGRAM_METADATA_TV_SHOW_SEARCH.replace("{query}", adaptedQuery)
            req.log.info(`Calling adapter service: ${url}`)

            const response = await axios.get(url)

            if (response.status == 200) {
                req.log.info("Adapter service response is OK")

                var parsed = this.#parseSearchTvShows(response.data.data, req.log)
                res.send({ data: parsed })
            }
        } catch (error) {
            req.log.error(`Error searching tv-shows: ${error.message}`)
            res.status(500).send({
                error: { message: "Error searching tv-shows" },
            })
        }
    }

    #parseSearchMovies(data, logger) {
        try {
            if (!data) {
                logger.error("Invalid Request, no data provided")
                return []
            }

            let movies = []

            for (let movie of data.results) {
                try {
                    movies.push({
                        id: movie?.id,
                        title: movie?.title,
                        original_title: movie?.original_title,
                        description: movie?.overview,
                        release_date: movie?.release_date,
                        poster_path: movie?.poster_path,
                        original_language: movie?.original_language,
                    })
                } catch (error) {
                    logger.error(`Error parsing search movie: ${error.message}`)
                }
            }

            logger.info(`Parsed ${movies.length} movies`)
            return  movies
        } catch (error) {
            logger.error(`Error parsing search movies: ${error.message}`)
            return []
        }
    }

    #parseSearchTvShows(data, logger) {
        try {
            if (!data) {
                logger.error("Invalid Request, no data provided")
                return []
            }

            let movies = []

            for (let movie of data.results) {
                try {
                    movies.push({
                        id: movie?.id,
                        title: movie?.name,
                        original_title: movie?.original_name,
                        description: movie?.overview,
                        poster_path: movie?.poster_path,
                        original_language: movie?.original_language,
                    })
                } catch (error) {
                    logger.error(`Error parsing search tv-show: ${error.message}`)
                }
            }

            logger.info(`Parsed ${movies.length} movies`)
            return  movies
        } catch (error) {
            logger.error(`Error parsing search tv-shows: ${error.message}`)
            return []
        }
    }
}

module.exports = ProgramMetadataController
