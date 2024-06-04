const axios = require("axios")

// eslint-disable-next-line no-unused-vars
const Types = require("../types/types")

const ADAPTER_SERVICE_URL = process.env.ADAPTER_SERVICE_URL || "http://localhost:3040"
const TV_PROGRAM_LAST_UPDATE_GET = `${ADAPTER_SERVICE_URL}/api/db/tv-program/get-last-update`
const TV_PROGRAM_INSERT = `${ADAPTER_SERVICE_URL}/api/db/tv-program/insert`
const TV_PROGRAM_TODAY_GET = `${ADAPTER_SERVICE_URL}/api/db/tv-program/today`
const TV_PROGRAM_WEEK_GET = `${ADAPTER_SERVICE_URL}/api/db/tv-program/week`
const TV_PROGRAM_RAI_CHANNEL_LIST_GET = `${ADAPTER_SERVICE_URL}/api/db/tv-program/rai-channel-list`
const TV_PROGRAM_MEDIASET_CHANNEL_LIST_GET = `${ADAPTER_SERVICE_URL}/api/db/tv-program/mediaset-channel-list`
const FAVORITE_GET_URL = `${ADAPTER_SERVICE_URL}/api/db/tv-program/favorites/:userMail`
const FAVORITE_URL = `${ADAPTER_SERVICE_URL}/api/db/tv-program/favorite`

/**
 * Controller that handles the database operations
 * @class
 * @memberof Controllers
 */
class DbController {
    /**
     * Get the last update date of the table TV Program on the database
     * @function
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<?string>>} The last update date of the TV program table
     * @throws Will throw an error if the database response is an error
     */
    async getLastTvProgramUpdate(req, res) {
        req.log.info(`Calling adapter service: ${TV_PROGRAM_LAST_UPDATE_GET}`)

        const response = await axios.get(TV_PROGRAM_LAST_UPDATE_GET)

        req.log.info("Adapter service response is OK")
        res.send({ data: response.data.data })
    }

    /**
     * Insert a TV program into the database
     * @async
     * @param {Types.Request<Types.TvProgram[]>} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<any>>} Ok response or error
     * @throws Will throw an error if the database response is an error
     */
    async insertTvProgram(req, res) {
        try {
            var data = req.body

            req.log.info(`Calling adapter service: ${TV_PROGRAM_INSERT}`)
            const response = await axios.post(TV_PROGRAM_INSERT, data.data)

            if (response.status === 200) {
                req.log.info("Adapter service response is OK")
                res.send({ data: response.data.data })
            } else {
                throw new Error("Invalid response from adapter service")
            }
        } catch (error) {
            req.log.error(`Error inserting tv program: ${error.message}`)
            res.status(500).send({
                error: { message: "Error inserting tv program" },
            })
        }
    }

    /**
     * Get today's TV program from the database
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<Types.TvProgram[]>>} The list of TV programs for today
     * @throws Will throw an error if the database response is an error
     */
    async getTodayTvPrograms(req, res) {
        try {
            req.log.info(`Calling adapter service: ${TV_PROGRAM_TODAY_GET}`)
            const response = await axios.get(TV_PROGRAM_TODAY_GET)

            if (response.status === 200) {
                req.log.info("Adapter service response is OK")
                res.send({ data: response.data.data })
            } else {
                throw new Error("Invalid response from adapter service")
            }
        } catch (error) {
            req.log.error(`Error getting today's tv programs: ${error.message}`)
            res.status(500).send({
                error: { message: "Error getting today's tv programs" },
            })
        }
    }

    /**
     * Get week's TV programs from the database
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<Types.TvProgram[]>>} The list of TV programs for the week
     * @throws Will throw an error if the database response is an error
     */
    async getWeekTvPrograms(req, res) {
        try {
            req.log.info(`Calling adapter service: ${TV_PROGRAM_WEEK_GET}`)
            const response = await axios.get(TV_PROGRAM_WEEK_GET)

            if (response.status === 200) {
                req.log.info("Adapter service response is OK")
                res.send({ data: response.data.data })
            } else {
                throw new Error("Invalid response from adapter service")
            }
        } catch (error) {
            req.log.error(`Error getting week's tv programs: ${error.message}`)
            res.status(500).send({
                error: { message: "Error getting week's tv programs" },
            })
        }
    }

    /**
     * Get the list of channels that Rai broadcasts
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<Types.TvChannel[]>>} The list of Rai channels
     * @throws Will throw an error if the database response is an error
     */
    async getRaiChannelList(req, res) {
        try {
            req.log.info(`Calling adapter service: ${TV_PROGRAM_RAI_CHANNEL_LIST_GET}`)
            const response = await axios.get(TV_PROGRAM_RAI_CHANNEL_LIST_GET)

            if (response.status === 200) {
                req.log.info("Adapter service response is OK")
                res.send({ data: response.data.data })
            } else {
                throw new Error("Invalid response from adapter service")
            }
        } catch (error) {
            req.log.error(`Error getting Rai channel list: ${error.message}`)
            res.status(500).send({
                error: { message: "Error getting Rai channel list" },
            })
        }
    }

    /**
     * Get the list of channels that Mediaset broadcasts
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<Types.TvChannel[]>>} The list of Mediaset channels
     * @throws Will throw an error if the database response is an error
     */
    async getMediasetChannelList(req, res) {
        try {
            req.log.info(`Calling adapter service: ${TV_PROGRAM_MEDIASET_CHANNEL_LIST_GET}`)
            const response = await axios.get(TV_PROGRAM_MEDIASET_CHANNEL_LIST_GET)

            if (response.status === 200) {
                req.log.info("Adapter service response is OK")
                res.send({ data: response.data.data })
            } else {
                throw new Error("Invalid response from adapter service")
            }
        } catch (error) {
            req.log.error(`Error getting Mediaset channel list: ${error.message}`)
            res.status(500).send({
                error: { message: "Error getting Mediaset channel list" },
            })
        }
    }

    /**
     * Get the list of favorite Tv programs for the user.
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<Types.Favorite[]>>} The list of favorite Tv programs
     * @throws Will throw an error if the request fails
     */
    async getFavorites(req, res) {
        const userEmail = req.params.userMail
        const url = FAVORITE_GET_URL.replace(":userMail", userEmail)

        req.log.info(`Calling adapter service: ${url}`)
        const response = await axios.get(url)

        req.log.info("Adapter service response is OK")
        res.send({ data: response.data.data })
    }

    /**
     * Add a Tv program to the user's favorites.
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse>} The response
     * @throws Will throw an error if the request fails
     */
    async addFavorite(req, res) {
        const url = FAVORITE_URL
        req.log.info(`Calling adapter service: ${url}`)

        const response = await axios.post(url, req.body)

        req.log.info("Adapter service response is OK")
        res.send(response.data)
    }

    /**
     * Remove a Tv program from the user's favorites.
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse>} The response
     * @throws Will throw an error if the request fails
     */
    async removeFavorite(req, res) {
        const url = FAVORITE_URL
        req.log.info(`Calling adapter service: ${url}`)

        const response = await axios.delete(url, req.body)

        req.log.info("Adapter service response is OK")
        res.send(response.data)
    }
}

module.exports = DbController
