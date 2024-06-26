const axios = require("axios")

// eslint-disable-next-line no-unused-vars
const Types = require("../../types/types")

const DATA_SERVICE_URL = process.env.DATA_SERVICE_URL || "http://localhost:3040"
const MEDIASET_TV_PROGRAMS_WEEK_GET = `${DATA_SERVICE_URL}/api/tv-program/mediaset/week`

/**
 * Controller that fetches all the informations abouth the Mediaset TV programs
 * @memberof Controllers
 */
class MediasetTvProgramController {
    constructor() {
        this.getWeekProgramsForChannel = this.getWeekProgramsForChannel.bind(this)
    }

    #parseMediasetPrograms(data, logger) {
        try {
            if (!data) {
                logger.error("Invalid Request, no data provided")
                return []
            }

            let programs = []

            for (let entry of data) {
                for (let listing of entry.listings) {
                    try {
                        programs.push({
                            title: listing.mediasetlisting$epgTitle,
                            description: listing?.description,
                            channel_id: listing?.program?.mediasetprogram$publishInfo?.channel,
                            channel: listing?.program?.mediasetprogram$publishInfo?.description,
                            category: listing?.program?.tags
                                ?.filter((tag) => tag?.scheme == "category")
                                .map((tag) => this.#adaptCategory(tag?.title))[0],
                            start_time: new Date(listing?.startTime)
                                .toISOString()
                                .toLocaleString("it-IT"),
                            end_time: new Date(listing?.endTime)
                                .toISOString()
                                .toLocaleString("it-IT"),
                        })
                    } catch (error) {
                        logger.error(`Error parsing mediaset program: ${error.message}`)
                    }
                }
            }

            logger.info(`Parsed ${programs.length} programs`)
            return programs
        } catch (error) {
            logger.error(`Error parsing mediaset's programs: ${error.message}`)
            return []
        }
    }

    #adaptCategory(category) {
        if (!category) {
            return ""
        }

        /* eslint-disable indent */
        switch (category) {
            case "Film":
                return "Film"
            case "Serie TV":
            case "Fiction":
                return "TV Show"
            default:
                return category
        }
        /* eslint-enable indent */
    }

    /**
     * Get week programs for a specific channel of the Mediaset list of channels
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<Types.TvProgram>>} The list of programs for the channel
     * @throws Will throw an error if the request fails
     */
    async getWeekProgramsForChannel(req, res) {
        const channelId = req.params.channelId

        const url = `${MEDIASET_TV_PROGRAMS_WEEK_GET}/${channelId}`
        req.log.info(`Calling data service: ${url}`)

        const response = await axios.get(url)

        req.log.info("Data service response is OK")

        const parsed = this.#parseMediasetPrograms(response.data.data, req.log)

        parsed.forEach((program) => {
            program.channel_id = channelId
        })

        return res.send({ data: parsed })
    }
}

module.exports = MediasetTvProgramController
