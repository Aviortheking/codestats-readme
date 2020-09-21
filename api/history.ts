import { Request, Response } from 'express'
import ReactDOMServer from 'react-dom/server'
import { parseBoolean, prepareResponse, setCache, parseNumber, clampValue, parseArray } from '../src/common/utils'
import { fetchHistory } from '../src/fetcher'
import Error from '../src/components/Error'
import HistoryCard from '../src/cards/HistoryCard'
import themes from '../themes/themes.json'

export interface query {
	username: string
	days_count?: string
	cache_seconds?: string
	width?: string
	height?: string
	hide?: string
	language_count?: string
	layout?: 'horizontal'
	reverse_order?: string
	hide_legend?: string

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
		days_count,
		cache_seconds,
		width,
		height,
		language_count,
		hide,
		layout,
		reverse_order,
		hide_legend,

		// Master
		bg_color,
		hide_border,
		hide_title,
		theme,
		title_color
	} = req.query

	prepareResponse(res)
	console.log(theme)

	try {
		const data = await fetchHistory(username, clampValue(parseNumber(days_count) || 14, 1, 30))

		setCache(res, parseInt(cache_seconds || ''))

		return res.send(ReactDOMServer.renderToStaticMarkup(
			new HistoryCard(username, data, {
				hide_title: parseBoolean(hide_title),
				hide_border: parseBoolean(hide_border),
				title_color,
				hide_legend: parseBoolean(hide_legend),
				bg_color,
				layout,
				theme,
				reverse_order: parseBoolean(reverse_order),
				language_count: parseNumber(language_count),
				width: parseNumber(width),
				height: clampValue(parseNumber(height) || 300, 200),
				hide: parseArray(hide)
			}).render()
		))
	} catch (err) {
		return res.send(
			ReactDOMServer.renderToStaticMarkup(new Error(err).render())
		)
	}
}
