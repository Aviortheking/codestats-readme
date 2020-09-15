import { renderError, parseBoolean, parseArray, CONSTANTS} from '../src/common/utils'
import { fetchProfile } from '../src/fetcher'
import renderStatsCard from '../src/cards/profileCard'
import blacklist from '../src/common/blacklist'
import { Request, Response } from 'express';
import ReactDOMServer from 'react-dom/server'
import themes from '../themes';

export interface query {
	username: string
	hide?: string
	hide_title?: string
	hide_border?: string
	hide_rank?: string
	show_icons?: string
	line_height?: string
	title_color?: string
	icon_color?: string
	text_color?: string
	bg_color?: string
	theme?: keyof typeof themes
	cache_seconds?: string
}

export default async (req: Request<unknown, unknown, unknown, query>, res: Response) => {
	const {
		username,
		hide,
		hide_title,
		hide_border,
		hide_rank,
		show_icons,
		line_height,
		title_color,
		icon_color,
		text_color,
		bg_color,
		theme,
	} = req.query;

	res.setHeader("Content-Type", "image/svg+xml");

	if (blacklist.includes(username)) {
		return res.send(renderError("Username is in blacklist"));
	}

	try {
		const data = await fetchProfile(username);

		const cacheSeconds = CONSTANTS.TWO_HOURS

		res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);

		return res.send(ReactDOMServer.renderToStaticMarkup(
		renderStatsCard(data, {
			hide: parseArray(hide),
			show_icons: parseBoolean(show_icons),
			hide_title: parseBoolean(hide_title),
			hide_border: parseBoolean(hide_border),
			hide_rank: parseBoolean(hide_rank),
			line_height: line_height ? parseInt(line_height , 10) : undefined,
			title_color,
			icon_color,
			text_color,
			bg_color,
			theme,
		}))
		);
	} catch (err) {
		return res.send(
			ReactDOMServer.renderToStaticMarkup(renderError(err.message, err.secondaryMessage))
		);
	}
};
