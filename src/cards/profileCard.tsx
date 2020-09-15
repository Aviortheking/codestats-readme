import { kFormatter, getCardColors, FlexLayout, encodeHTML, getProgress } from '../common/utils'
import { getStyles } from '../getStyles'
import icons from '../common/icons'
import Card from '../common/Card'
import React from 'react'
import themes from '../../themes'

const createTextNode = ({
	icon,
	label,
	value,
	index,
	showIcons
}: {
	icon: JSX.Element,
	label: string,
	value: number,
	index: number,
	showIcons: boolean
}) => {
	const kValue = kFormatter(value);
	const staggerDelay = (index + 3) * 150;

	const iconSvg = showIcons
		? (
			<svg data-testid="icon" className="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16">
				{icon}
			</svg>
		)
		: undefined
	return (
		<g className="stagger" style={{animationDelay: `${staggerDelay}ms`}} transform="translate(25, 0)">
			{iconSvg}
			<text className="stat bold" x={showIcons ? 25 : undefined} y="12.5">{label}:</text>
			<text
				className="stat"
				x={showIcons ? 120 : 100}
				y="12.5"
			>{kValue}</text>
		</g>
	)
};

interface Options {
	hide?: Array<string>
	show_icons?: boolean
	hide_title?: boolean
	hide_border?: boolean
	hide_rank?: boolean
	line_height?: number
	title_color?: string
	icon_color?: string
	text_color?: string
	bg_color?: string
	theme?: keyof typeof themes
}

export default (stats: {username: string, xp: number, recentXp: number, level: number}, options: Options = { hide: [] }) => {
	const {
		username,
		xp,
		recentXp,
		level
	} = stats;
	const {
		hide = [],
		show_icons = false,
		hide_title = false,
		hide_border = false,
		hide_rank = false,
		line_height = 25,
		title_color,
		icon_color,
		text_color,
		bg_color,
		theme = "default",
	} = options;

	const lheight = line_height

	// returns theme based colors with proper overrides and defaults
	const { titleColor, textColor, iconColor, bgColor } = getCardColors({
		title_color,
		icon_color,
		text_color,
		bg_color,
		theme,
	});

	// Meta data for creating text nodes with createTextNode function
	const STATS = {
	  xp: {
		icon: icons.star,
		label: "XP",
		value: xp,
		id: "xp",
	},
	recent_xp: {
		icon: icons.commits,
		label: 'Recent xp',
		value: recentXp,
		id: "recent_xp",
	  },
	};

	// filter out hidden stats defined by user & create the text nodes
	const statItems = Object.keys(STATS)
		.filter((key) => !hide.includes(key))
		.map((key, index) =>
			// create the text nodes, and pass index so that we can calculate the line spacing
			createTextNode({
				...STATS[key],
				index,
				showIcons: show_icons
			})
		);

	// Calculate the card height depending on how many items there are
	// but if rank circle is visible clamp the minimum height to `150`
	let height = Math.max(
		45 + (statItems.length + 1) * lheight,
		hide_rank ? 0 : 120
	);

	// Conditionally rendered elements
	const rankCircle = hide_rank
		? undefined
		: (
			<g data-testid="rank-circle"
				transform={`translate(400, 0)`}>
				<circle className="rank-circle-rim" cx="-10" cy="8" r="40" />
				<circle className="rank-circle" cx="-10" cy="8" r="40" />
				<g className="rank-text">
					<text
						x="-4"
						y="0"
						alignmentBaseline="central"
						dominantBaseline="central"
						textAnchor="middle"
					>
						lv {level}
					</text>
				</g>
			</g>
		)

	const progress = getProgress(xp + recentXp);
	const cssStyles = getStyles({
		titleColor,
		textColor,
		iconColor,
		show_icons,
		progress,
	});

	const apostrophe = ["x", "s"].includes(username.slice(-1)) ? "" : "s";
	const card = new Card(
		495,
		height,
		{
			titleColor,
			textColor,
			iconColor,
			bgColor,
		},
		`${encodeHTML(username)}'${apostrophe} Code::stats Profile`
	)

	card.setHideBorder(hide_border);
	card.setHideTitle(hide_title);
	card.setCSS(cssStyles);

	return card.render(
		<>
			{rankCircle}
			<svg x="0" y="0">
				{FlexLayout({
					items: statItems,
					gap: lheight,
					direction: "column",
				})}
			</svg>
		</>
	)
}
