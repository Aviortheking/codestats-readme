import { parseBoolean, parseArray, prepareResponse, setCache} from '../src/common/utils'
import { fetchProfile } from '../src/fetcher'
import { Request, Response } from 'express';
import ReactDOMServer from 'react-dom/server'
import themes from '../themes/themes.json';
import ProfileCard from '../src/cards/ProfileCard';
import Error from '../src/components/Error';

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
		cache_seconds
	} = req.query;

	prepareResponse(res)

	try {
		const data = await fetchProfile(username);

		setCache(res, parseInt(cache_seconds || ''))

		return res.send(ReactDOMServer.renderToStaticMarkup(
			new ProfileCard(data.username, data.xp, data.recentXp, {
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
			}).render()
		))
	} catch (err) {
		return res.send(
			ReactDOMServer.renderToStaticMarkup(new Error(err).render())
		);
	}
};
