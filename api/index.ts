import { Request, Response } from 'express'
import ReactDOMServer from 'react-dom/server'
import { parseBoolean, parseArray, prepareResponse, setCache, parseNumber } from '../src/common/utils'
import { fetchProfile } from '../src/fetcher'
import themes from '../themes/themes.json'
import ProfileCard from '../src/cards/ProfileCard'
import Error from '../src/components/Error'

export interface query {
	username: string
	hide?: string
	hide_rank?: string
	show_icons?: string
	line_height?: string
	icon_color?: string
	text_color?: string
	cache_seconds?: string

	// Mater
	bg_color?: string
	hide_border?: string
	hide_title?: string
	theme?: keyof typeof themes
	title_color?: string
}

export default async (req: Request<unknown, unknown, unknown, query>, res: Response) => {
	const {
		username,
		hide,
		hide_rank,
		show_icons,
		line_height,
		icon_color,
		text_color,
		cache_seconds,

		// Master
		bg_color,
		hide_border,
		hide_title,
		theme,
		title_color

	} = req.query

	prepareResponse(res)

	try {
		const data = await fetchProfile(username)

		setCache(res, parseInt(cache_seconds || '', 10))

		return res.send(ReactDOMServer.renderToStaticMarkup(
			new ProfileCard(data.username, data.xp, data.recentXp, {
				hide: parseArray(hide),
				show_icons: parseBoolean(show_icons),
				hide_title: parseBoolean(hide_title),
				hide_border: parseBoolean(hide_border),
				hide_rank: parseBoolean(hide_rank),
				line_height: parseNumber(line_height),
				title_color,
				icon_color,
				text_color,
				bg_color,
				theme
			}).render()
		))
	} catch (err) {
		return res.send(
			ReactDOMServer.renderToStaticMarkup(new Error(err as any).render())
		)
	}
}
