class TvProgramController {
    async parseMediasetPrograms(req, res) {
        try {
            const data = req.body

            if (!data) {
                req.log.error("Invalid Request, no data provided")
                return res.status(400).send({ error: { message: "Invalid Request" } })
            }

            let programs = []

            for (let entry of data.entries) {
                for (let listing of entry.listings) {
                    req.log.info(listing)
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

            return res.send({ data: programs })
        } catch (error) {
            req.log.error(`Error parsing mediaset's programs: ${error.message}`)
            res.status(500).send({ error: { message: "Error parsing mediaset's programs" } })
        }
    }
}

module.exports = TvProgramController
