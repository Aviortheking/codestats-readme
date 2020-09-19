import { parseBoolean, parseArray, prepareResponse, setCache, parseNumber} from '../src/common/utils'
import { fetchTopLanguages } from '../src/fetcher'
import TopLanguagesCard from '../src/cards/TopLanguagesCard'
import { Request, Response } from 'express';
import ReactDOMServer from 'react-dom/server'
import themes from '../themes/themes.json';
import Error from '../src/components/Error';

export interface query {
	username: string
	hide?: string
	hide_title?: string
	hide_border?: string
	card_width?: string
	title_color?: string
	text_color?: string
	bg_color?: string
	language_count?: string
	show_level?: string
	theme?: keyof typeof themes
	cache_seconds?: string
	layout?: string
}

export default async (req: Request<unknown, unknown, unknown, query>, res: Response) => {
	const {
		username,
		hide,
		hide_title,
		hide_border,
		card_width,
		title_color,
		text_color,
		bg_color,
		language_count,
		theme,
		cache_seconds,
		layout,
	} = req.query;

	prepareResponse(res)

	try {
		const topLangs = await fetchTopLanguages(username)

		setCache(res, parseInt(cache_seconds || ''))

		return res.send(ReactDOMServer.renderToStaticMarkup(
			new TopLanguagesCard(username, topLangs.langs, {
				hide: parseArray(hide),
				language_count: parseNumber(language_count),
				card_width: parseNumber(card_width),
				layout,
				text_color,
				theme,
				title_color,
				bg_color,
				hide_border: parseBoolean(hide_border),
				hide_title: parseBoolean(hide_title)
			}).render()
		))
	} catch (err) {
		return res.send(
			ReactDOMServer.renderToStaticMarkup(new Error(err).render())
		)
	}
}
