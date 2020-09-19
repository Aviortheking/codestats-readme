import { getColor, getProgress, trunc } from "../common/utils"
import Card, { CardOptions } from '../common/Card'
import React from 'react'
import FlexLayout from "../components/FlexLayout";
import { TopLanguage } from "../interfaces";

interface TopLanguagesOptions extends CardOptions {
	hide?: Array<string>
	language_count?: number
	card_width?: number
	layout?: string
	text_color?: string
}

export default class TopLanguagesCard extends Card {

	public constructor(
		private username: string,
		private langs: Array<TopLanguage>,
		private options: TopLanguagesOptions
	) {
		super(options)


		this.langs = this.langs
			.filter((item) => !(options.hide || []).includes(item.name))
			.slice(0, options.language_count || 5)


		this.height = 45 + (this.langs.length + 1) * 40
		this.width = 300
		if (options.card_width && !isNaN(options.card_width)) {
			this.width = options.card_width
		}

		const textColor = getColor('text_color', options.text_color, options.theme)
		this.title = "Most Used Languages"
		this.css = CompactTextNode.getCSS(textColor as string)
	}

	public render() {
		if (this.options.layout === 'compact') {
			this.width = this.width + 50
			this.height = 90 + Math.round(this.langs.length / 2) * 25
			return super.render(
				<svg x="25">
					<mask id="rect-mask">
					<rect x="0" y="0" width={this.width - 50} height="8" fill="white" rx="5" />
					</mask>
					<CompactProgressBar langs={this.langs} parentWidth={this.width} />
					{this.langs.map((el, index) => (
						<CompactTextNode key={index} index={index} lang={el} />
					))}
				</svg>
			)
		} else {
			return super.render(
				<svg x="25">
					<FlexLayout items={
						this.langs.map((el, index) => (
							<ProgressNode lang={el} parentWidth={this.width} />
						))
					}
						gap={40}
						direction="column"
					/>
				</svg>
			)
		}
	}
}

class CompactProgressBar extends React.Component<{
	langs: Array<TopLanguage>
	parentWidth: number
}> {
	public render() {

		let offset = 0
		const totalSize = this.props.langs.reduce((acc, curr) => acc + curr.xp, 0)

		return this.props.langs.map((lang, index) => {
			const percent = trunc((lang.xp / totalSize) * (this.props.parentWidth - 50), 2)
			const progress = percent < 10 ? percent + 10 : percent

			const output = (
				<rect
					key={index}
					mask="url(#rect-mask)"
					data-testid="lang-progress"
					x={offset}
					y="0"
					width={progress}
					height="8"
					fill={lang.color || "#858585"}
				/>
			)

			offset += percent
			return output
		})
	}
}

class CompactTextNode extends React.Component<{
	index: number
	lang: TopLanguage
}> {

	public static getCSS = (textColor: string) => `
		.lang-name {
			font: 400 11px 'Segoe UI', Ubuntu, Sans-Serif;
			fill: ${textColor};
		}
	`

	public render() {
		const index = this.props.index

		let x = 0
		let y = 12.5 * index + 25
		if (index % 2 !== 0) {
			x = 150
			y = 12.5 + 12.5 * index
		}

		return (
			<g transform={`translate(${x}, ${y})`}>
				<circle cx="5" cy="6" r="5" fill={this.props.lang.color} />
				<text data-testid="lang-name" x="15" y="10" className='lang-name'>
					{this.props.lang.name} {getProgress(this.props.lang.xp)}%
				</text>
			</g>
		)
	}
}


class ProgressNode extends React.Component<{
	lang: TopLanguage
	parentWidth: number
}> {

	private paddingRight = 60


	public render() {
		const width = this.props.parentWidth - this.paddingRight
		const progress1 = getProgress(this.props.lang.xp)
		const progress2 = getProgress(this.props.lang.xp - this.props.lang.recentXp)

		return (
			<>
				<text data-testid="lang-name" x="2" y="15" className="lang-name">{this.props.lang.name} {progress1}% {this.props.lang.recentXp >= 1 ? ' + ' + (trunc(progress1 - progress2, 2)) + '%' : ''}</text>
				<svg width={width}>
					<rect rx="5" ry="5" x="0" y="25" width={width} height="8" fill="#ddd" />
					{progress1 !== progress2 && (
						<rect
							height="8"
							fill="#f2b866"
							rx="5" ry="5" x="1" y="25"
							width={`${progress1}%`}
						/>
					)}
					{progress1 >= progress2 && (
						<rect
							height="8"
							fill={this.props.lang.color}
							rx="5" ry="5" x="0" y="25"
							data-testid="lang-progress"
							width={`${progress2}%`}
						/>
					)}

				</svg>
			</>
		)
	}
}
