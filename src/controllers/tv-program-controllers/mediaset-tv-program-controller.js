const axios = require("axios")

const DATA_SERVICE_URL = process.env.DATA_SERVICE_URL || "http://localhost:3040"
const MEDIASET_TV_PROGRAMS_TODAY_GET = `${DATA_SERVICE_URL}/api/tv-program/mediaset/today`

class TvProgramController {
    constructor() {
        this.getTodayProgramsForChannel = this.getTodayProgramsForChannel.bind(this)
    }

    #parseMediasetPrograms(data, logger) {
        try {
            if (!data) {
                logger.error("Invalid Request, no data provided")
                return []
            }

            let programs = []

            for (let entry of data.entries) {
                for (let listing of entry.listings) {
                    programs.push({
                        name: listing.mediasetlisting$epgTitle,
                        description: listing?.description,
                        id_channel: listing?.program?.mediasetprogram$publishInfo?.channel,
                        channel: listing?.program?.mediasetprogram$publishInfo?.description,
                        start_time: listing?.startTime,
                        end_time: listing?.endTime,
                    })
                }
            }

            logger.info(`Parsed ${programs.length} programs`)
            return programs
        } catch (error) {
            logger.error(`Error parsing mediaset's programs: ${error.message}`)
            return []
        }
    }

    async getTodayProgramsForChannel(req, res) {
        try {
            const channelId = req.params.channelId

            if (!channelId) {
                req.log.error("Invalid Request, no channel provided")
                return res.status(400).send({ error: { message: "Invalid Request" } })
            }

            const url = `${MEDIASET_TV_PROGRAMS_TODAY_GET}/${channelId}`
            req.log.info(`Calling data service: ${url}`)

            const response = await axios.get(url)

            if (response.status === 200) {
                req.log.info("Data service response is OK")
                const parsed = this.#parseMediasetPrograms(response.data.data, req.log)

                return res.send({data: parsed})
            }
        } catch (error) {
            req.log.error(`Error getting today's programs for channel: ${error.message}`)
            res.status(500).send({
                error: { message: "Error getting today's programs for channel" },
            })
        }
    }
}

module.exports = TvProgramController
