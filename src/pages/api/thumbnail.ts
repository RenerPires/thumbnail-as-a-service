import { NextApiRequest, NextApiResponse } from "next";
import { getScreenshot } from "./_lib/chromium";
import getThumbnailTemplate from "./_lib/thumbTamplate";

const isDev = !process.env.AWS_REGION

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const title = String(req.query.title || '')

        if(!title)
            throw new Error('Title is required')

        const html = getThumbnailTemplate(title)

        const file = await getScreenshot(html, isDev)

        res.setHeader('Content-Type', 'image/png')
        res.setHeader('Cache-Control', 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000')
        
        res.end(file)
        return

    } catch(err) {
        console.error(err)
        res.status(400).send({error: `${err}`})
    }
}