import React from 'react'
import {
	kFormatter,
	encodeHTML,
	getProgress,
	getLevel,
	calculateCircleProgress,
	getColor
} from '../common/utils'
import icons from '../common/icons'
import Card, { CardOptions } from '../common/Card'
import FlexLayout from '../components/FlexLayout'

interface ProfileCardOptions extends CardOptions {
	hide?: Array<string>
	show_icons?: boolean
	hide_rank?: boolean
	line_height?: number
	icon_color?: string
	text_color?: string
}

export default class ProfileCard extends Card {

	private stats: Record<string, {
		icon: JSX.Element
		label: string
		value: number
	}>

	private defaults = {
		line_height: 25,
		hide: []
	}

	public constructor(
		private username: string,
		private xp: number,
		private recentXp: number,
		private options: ProfileCardOptions
	) {
		super(
			options
		)

		// This Element
		this.stats = {
			xp: {
				icon: icons.star,
				label: 'XP',
				value: xp
			},
			recent_xp: {
				icon: icons.commits,
				label: 'Recent xp',
				value: this.recentXp
			}
		}

		// Card Settings
		this.width = 495
		this.height = Math.max(
			45 + (Object.keys(this.stats).length + 1) * (this.options.line_height || this.defaults.line_height),
			options.hide_rank ? 0 : 120
		)

		this.title = `${encodeHTML(this.username)}${
			['x', 's'].includes(this.username.slice(-1)) ? '\'' : '\'s'
		} Code::Stats Profile`

		const textColor = getColor('text_color', options.text_color, options.theme)
		const iconColor = getColor('icon_color', options.icon_color, options.theme)

		if (!this.options.hide_rank) {
			this.css += RankCircle.getCSS(textColor, iconColor, getProgress(xp))
		}
		if ((this.options.hide || []) < Object.keys(this.stats)) {
			this.css += TextNode.getCSS(textColor, this.options.show_icons ? iconColor : undefined)
		}
	}

	public render() {
		return super.render(
			<>
				{!this.options.hide_rank && (
					<RankCircle xp={this.xp} />
				)}
				<svg x="0" y="0">
					<FlexLayout
						items={
							Object
								.keys(this.stats)
								.filter((item) => !(this.options.hide || []).includes(item))
								.map((el, index) => {
									const item = this.stats[el]
									return (
										<TextNode
											{...item}
											icon={this.options.show_icons ? item.icon : undefined}
											key={index}
											index={index}

										/>
									)
								})
						}
						gap={this.options.line_height || this.defaults.line_height}
						direction="column"
					/>
				</svg>
			</>
		)
	}

}

class RankCircle extends React.Component<{
	xp: number
}> {

	public static getCSS = (textColor: string, titleColor: string, progress: number) => `
		.rank-text {
			font: 800 24px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor};
			animation: scaleInAnimation 0.3s ease-in-out forwards;
		}

		.rank-circle-rim {
			stroke: ${titleColor};
			fill: none;
			stroke-width: 6;
			opacity: 0.2;
		}
		.rank-circle {
			stroke: ${titleColor};
			stroke-dasharray: 250;
			fill: none;
			stroke-width: 6;
			stroke-linecap: round;
			opacity: 0.8;
			transform-origin: -10px 8px;
			transform: rotate(-90deg);
			animation: rankAnimation 1s forwards ease-in-out;
		}

		@keyframes rankAnimation {
			from {
				stroke-dashoffset: ${calculateCircleProgress(0)};
			}
			to {
				stroke-dashoffset: ${calculateCircleProgress(progress)};
			}
		}
	`

	public render = () => (
		<g data-testid="rank-circle"
			transform="translate(400, 0)">
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
					lv {getLevel(this.props.xp)}
				</text>
			</g>
		</g>
	)

}

class TextNode extends React.Component<{
	icon?: JSX.Element
	label: string
	value: number
	index: number
}> {

	public static getCSS = (textColor: string, iconColor?: string) => `
		${
			iconColor ? `.icon {
				fill: ${iconColor};
				// display: block;
			}` : ''
		}
		.stagger {
			opacity: 0;
			animation: fadeInAnimation 0.3s ease-in-out forwards;
		}
		.stat {
			font: 600 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; fill: ${textColor};
		}
		.bold {
			font-weight: 700
		}
	`

	public render() {

		const delay = (this.props.index + 3 * 150)

		// Icon prefixing line
		const icon = this.props.icon ? (
			<svg data-testid="icon" className="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16">
				{this.props.icon}
			</svg>
		) : undefined

		return (
			<g
				className="stagger"
				style={{ animationDelay: `${delay}ms` }}
				transform="translate(25, 0)"
			>
				{icon}
				<text className="stat bold" x={this.props.icon ? 25 : undefined} y="12.5">{this.props.label}:</text>
				<text
					className="stat"
					x={this.props.icon ? 120 : 100}
					y="12.5"
				>{kFormatter(this.props.value)}</text>
			</g>
		)
	}

}
