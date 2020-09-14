import { renderError, clampValue, parseBoolean, parseArray, CONSTANTS} from '../src/common/utils'
import fetchTopLanguages from '../src/fetchers/top-languages-fetcher'
import renderTopLanguages from '../src/cards/top-languages-card'
import blacklist from '../src/common/blacklist'
import { Request, Response } from 'express';
import ReactDOMServer from 'react-dom/server'
import themes from '../themes';

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
		show_level,
		theme,
		cache_seconds,
		layout,
	} = req.query;

	res.setHeader("Content-Type", "image/svg+xml");

	if (blacklist.includes(username)) {
		return res.send(renderError("Something went wrong"));
	}

	try {
		const topLangs = await fetchTopLanguages(username);

		const cacheSeconds = clampValue(
		parseInt(cache_seconds || CONSTANTS.TWO_HOURS + '', 10),
		CONSTANTS.TWO_HOURS,
		CONSTANTS.ONE_DAY
		);

		res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);

		return res.send(ReactDOMServer.renderToStaticMarkup(
		renderTopLanguages(topLangs, {
			hide_title: parseBoolean(hide_title),
			hide_border: parseBoolean(hide_border),
			card_width: parseInt(card_width || '', 10),
			hide: parseArray(hide),
			language_count: parseInt(language_count || '6'),
			title_color,
			text_color,
			bg_color,
			show_level,
			theme,
			layout,
		}))
		);
	} catch (err) {
		return res.send(
			ReactDOMServer.renderToStaticMarkup(renderError(err.message, err.secondaryMessage))
		);
	}
};
