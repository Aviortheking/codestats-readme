import { parseBoolean, prepareResponse, setCache, parseNumber, clampValue, parseArray} from '../src/common/utils'
import { fetchHistory } from '../src/fetcher'
import { Request, Response } from 'express'
import ReactDOMServer from 'react-dom/server'
import Error from '../src/components/Error'
import HistoryCard from '../src/cards/HistoryCard'

export interface query {
	username: string
	hide_title?: string
	hide_border?: string
	title_color?: string
	bg_color?: string
	days_count?: string
	cache_seconds?: string
	width?: string
	height?: string
	hide?: string
	language_count?: string
	layout?: 'horizontal'
}

export default async (req: Request<unknown, unknown, unknown, query>, res: Response) => {
	const {
		username,
		hide_title,
		hide_border,
		title_color,
		bg_color,
		days_count,
		cache_seconds,
		width,
		height,
		language_count,
		hide,
		layout
	} = req.query;

	prepareResponse(res)

	try {
		const data = await fetchHistory(username, clampValue(parseNumber(days_count) || 14, 1, 30));

		setCache(res, parseInt(cache_seconds || ''))

		return res.send(ReactDOMServer.renderToStaticMarkup(
			new HistoryCard(username, data, {
				hide_title: parseBoolean(hide_title),
				hide_border: parseBoolean(hide_border),
				title_color,
				bg_color,
				layout,
				language_count: parseNumber(language_count),
				width: parseNumber(width),
				height: clampValue(parseNumber(height) || 300, 200),
				hide: parseArray(hide)
			}).render()
		))
	} catch (err) {
		return res.send(
			ReactDOMServer.renderToStaticMarkup(new Error(err).render())
		);
	}
};
