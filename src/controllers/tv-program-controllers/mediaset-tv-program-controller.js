const axios = require("axios")

const DATA_SERVICE_URL = process.env.DATA_SERVICE_URL || "http://localhost:3040"
const MEDIASET_TV_PROGRAMS_WEEK_GET = `${DATA_SERVICE_URL}/api/tv-program/mediaset/week`

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

    async getWeekProgramsForChannel(req, res) {
        try {
            const channelId = req.params.channelId

            if (!channelId) {
                req.log.error("Invalid Request, no channel provided")
                return res.status(400).send({ error: { message: "Invalid Request" } })
            }

            const url = `${MEDIASET_TV_PROGRAMS_WEEK_GET}/${channelId}`
            req.log.info(`Calling data service: ${url}`)

            const response = await axios.get(url)

            if (response.status === 200) {
                req.log.info("Data service response is OK")

                const parsed = this.#parseMediasetPrograms(response.data.data, req.log)

                parsed.forEach((program) => {
                    program.channel_id = channelId
                })

                return res.send({ data: parsed })
            }
        } catch (error) {
            req.log.error(`Error getting week's programs for channel: ${error.message}`)
            res.status(500).send({
                error: { message: "Error getting week's programs for channel" },
            })
        }
    }
}

module.exports = MediasetTvProgramController
