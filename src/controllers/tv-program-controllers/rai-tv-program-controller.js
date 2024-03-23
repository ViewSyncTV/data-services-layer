const axios = require("axios")

const DATA_SERVICE_URL = process.env.DATA_SERVICE_URL || "http://localhost:3040"
const RAI_TV_PROGRAMS_TODAY_GET = `${DATA_SERVICE_URL}/api/tv-program/rai/today`

class RaiTvProgramController {
    constructor() {
        this.getTodayProgramsForChannel = this.getTodayProgramsForChannel.bind(this)
    }

    #parseDateTime(dateStr) {
        if (!dateStr) {
            return null
        }

        const parts = dateStr.split(" ")

        // Split the date part into day, month, and year
        const dateParts = parts[0].split("/")
        const day = parseInt(dateParts[0], 10)
        const month = parseInt(dateParts[1], 10) - 1 // Months are zero-indexed in JavaScript
        const year = parseInt(dateParts[2], 10)

        // Split the time part into hours, minutes, and seconds
        const timeParts = parts[1].split(":")
        const hours = parseInt(timeParts[0], 10)
        const minutes = parseInt(timeParts[1], 10)

        // Create a new Date object
        const date = new Date(year, month, day, hours, minutes)
        return date
    }

    #addDurationToDate(date, duration) {
        if (!date || !duration) {
            return null
        }

        const [hours, minutes, seconds] = duration.split(":").map(Number)
        const newDate = new Date(date)
        newDate.setHours(newDate.getHours() + hours)
        newDate.setMinutes(newDate.getMinutes() + minutes)
        newDate.setSeconds(newDate.getSeconds() + seconds)
        return newDate
    }

    #parseRaiPrograms(data, logger) {
        try {
            if (!data) {
                logger.error("Invalid Request, no data provided")
                return []
            }
            let programs = []
            for (let event of data.events) {
                try {
                    const startTimeStr = event?.date + " " + event?.hour
                    const startTime = this.#parseDateTime(startTimeStr)
                    const endTime = this.#addDurationToDate(startTime, event?.duration)

                    programs.push({
                        title: event?.name,
                        description: event?.description,
                        channel_id: event?.channel,
                        channel: event?.channel,
                        start_time: startTime.toISOString().toLocaleString("it-IT"),
                        end_time: endTime.toISOString().toLocaleString("it-IT"),
                    })
                } catch (error) {
                    logger.error(`Error parsing rai program: ${error.message}`)
                }
            }

            logger.info(`Parsed ${programs.length} programs`)
            return programs
        } catch (error) {
            logger.error(`Error parsing rai's programs: ${error.message}`)
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

            const url = `${RAI_TV_PROGRAMS_TODAY_GET}/${channelId}`
            req.log.info(`Calling data service: ${url}`)

            const response = await axios.get(url)

            if (response.status === 200) {
                req.log.info("Data service response is OK")
                const parsed = this.#parseRaiPrograms(response.data.data, req.log)

                return res.send({ data: parsed })
            }
        } catch (error) {
            req.log.error(`Error getting today's programs for channel: ${error.message}`)
            res.status(500).send({
                error: { message: "Error getting today's programs for channel" },
            })
        }
    }
}

module.exports = RaiTvProgramController
