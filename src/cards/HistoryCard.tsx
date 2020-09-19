import { formatDateNumber, getColorOfLanguage } from "../common/utils"
import Card, { CardOptions } from '../common/Card'
import React from 'react'
import FlexLayout from "../components/FlexLayout"

interface HistoryOptions extends CardOptions {
	width?: number
	height?: number
	layout?: 'horizontal'
	hide_legend?: boolean

	// Put language in Other
	hide?: Array<string>
	language_count?: number
}

export default class HistoryCard extends Card {

	private topLanguages: Array<string>

	public constructor(
		private username: string,
		private days: Array<{day: string, total: number, data: Array<{xp: number, language: string}>}>,
		private options: HistoryOptions
	) {
		super(options)

		this.height = 45 + (this.days.length + 1) * 40
		this.width = options.width ?? 500
		if (options.layout === 'horizontal') {
			this.width = 45 + (this.days.length + 1) * 40 + 100
			this.height = options.height ?? 300
		}

		const languagesToHide = options.hide || []

		let languageCount: Array<{language: string, xp: number}> = []
		for (const day of this.days) {
			for (const data of day.data) {
				let index = languageCount.findIndex((item) => item.language === data.language)
				if (index === -1) {
					index = languageCount.push({
						language: data.language,
						xp: 0
					}) - 1
				}
				languageCount[index].xp += data.xp
			}
		}
		this.topLanguages = languageCount
			.sort((a, b) => b.xp - a.xp)
			.map((item) => item.language)
			.filter((lang) => !languagesToHide.includes(lang))
		languagesToHide.push(...this.topLanguages.splice((options.language_count || 8 )))
		if (languagesToHide.length > 0) {
			this.topLanguages.push('Other')
		}

		for (const day of this.days) {
			const toRemove: Array<number> = []
			for (let i = 0; i < day.data.length; i++) {
				const element = day.data[i];
				if (languagesToHide.includes(element.language)) {
					const otherIndex = day.data.findIndex((el) => el.language === 'Other')
					if (otherIndex === -1) {
						day.data.push({
							language: 'Other',
							xp: element.xp
						})
					} else {
						day.data[otherIndex].xp += element.xp
					}
					toRemove.push(i)
				}
			}
			for (const index of toRemove.reverse()) {
				day.data.splice(index, 1)
			}
		}

		this.title = 'Code History Language breakdown'
		this.css = ProgressNode.getCSS('#000')
	}

	public render() {
		const totalTotal = this.days.reduce((prvs, crnt) => {
			if (prvs < crnt.total) {
				return crnt.total
			}
			return prvs
		}, 0)

		const legendWidth = Math.max(this.width * 20 / 100 + 60, 150)
		const historyWidth = this.width - legendWidth
		return super.render(
			<svg x="25">
				<FlexLayout items={[(() => {
					if (this.options.layout === 'horizontal') {
						return (
							<FlexLayout items={
								this.days.reverse().map((el, index) => (
									<VerticalProgressNode
										{...el}
										totalTotal={totalTotal} height={this.height - 120} />
								))
							}
								gap={40}
								// direction="column"
							/>
						)
					} else {
						return (
							<FlexLayout items={
								this.days.map((el, index) => (
									<ProgressNode
										{...el}
										totalTotal={totalTotal} width={historyWidth - 30} />
								))
							}
								gap={40}
								direction="column"
							/>
						)
					}
				})(), (
					<FlexLayout items={
						this.topLanguages.map((el, index) => (
							<>
								<rect rx="5" x="2" y="7" height="12" width="12" fill={getColorOfLanguage(el)} />
								<text x="18" y="18" className="lang-name" key={index}>{el}</text>
							</>
						))
					}
						gap={20}
						direction="column"
					/>
				)]}
				gap={this.options.layout === 'horizontal' ? this.width - 180 : historyWidth - 20}
				/>

			</svg>
		)
	}
}


class ProgressNode extends React.Component<{
	day: string
	total: number
	totalTotal: number
	data: Array<{xp: number, language: string}>
	width: number
}> {

	public static getCSS = (textColor: string) => `
	.lang-name {
		font: 400 16px 'Segoe UI', Ubuntu, Sans-Serif;
		fill: ${textColor};
	}
	.xp-txt {
		font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif;
		fill: ${textColor};
	}
	.xp-txt-invert {
		font: 600 12px 'Segoe UI', Ubuntu, Sans-Serif;
		fill: white;
	}
	.subtitle {
		font: 400 14px 'Segoe UI', Ubuntu, Sans-Serif;
		fill: ${textColor};
	}
`


	public render() {
		let offset = 0
		const maskId = `mask-${this.props.day}`
		return (
			<>
				<text x="2" y="15" className="lang-name">{new Date(this.props.day).toDateString().substr(4, 6)}</text>
				<svg width={this.props.width}>
					<mask id={maskId}>
						<rect x="0" y="20" width={this.calcSize(this.props.total)} height="16" fill="white" rx="5" />
					</mask>
					<rect rx="5" ry="5" x="0" y="20" width={this.props.width} height="16" fill="#ddd" />
					{this.props.data.map((el, index) => {
						const color = getColorOfLanguage(el.language)
						offset += el.xp
						return (
							<rect
								key={index}
								mask={`url(#${maskId})`}
								height="16"
								fill={color}
								x={this.calcSize(offset - el.xp)} y="20"
								width={`${this.calcSize(el.xp)}px`}
							/>
						)
					})}
					{(() => {
						let size = this.calcSize(offset) + 6
						const txtSize = (this.props.total.toString().length + 3) * 8
						let classes = 'xp-txt'
						if (size + txtSize >= this.calcSize(this.props.totalTotal)) {
							size -= txtSize
							classes += ' xp-txt-invert'
						}
						return (
							<text x={size} y="33" className={classes}>{this.props.total} XP</text>
						)
					})()}

				</svg>
			</>
		)
	}

	protected calcSize(number: number) {
		return number * this.props.width / this.props.totalTotal
	}
}


class VerticalProgressNode extends React.Component<{
	day: string
	total: number
	totalTotal: number
	data: Array<{xp: number, language: string}>
	height: number
}> {
	public render() {
		let offset = this.props.totalTotal
		const maskId = `mask-${this.props.day}`

		return (
			<>
				<svg x="7" y="-20" height={this.props.height + 60}>
					<mask id={maskId}>
						<rect x="0" y={25 + this.calcSize(this.props.totalTotal - this.props.total)} width="16" height={this.calcSize(this.props.total)} fill="white" rx="5" />
					</mask>
					<rect rx="5" ry="5" x="0" y="25" width="16" height={this.props.height} fill="#ddd" />
					{this.props.data.map((el, index) => {
						const color = getColorOfLanguage(el.language)
						offset -= el.xp
						return (
							<rect
							key={index}
							mask={`url(#${maskId})`}
							width="16"
							fill={color}
							y={25 + this.calcSize(offset)}
							x="0"
							height={`${this.calcSize(el.xp)}px`}
							/>
							)
						})}
					{this.getXPTxt()}

				</svg>
				<text x="2" y={this.props.height + 18} className="subtitle">{new Date(this.props.day).toDateString().substr(4, 3)}</text>
				<text x="5" y={this.props.height + 34} className="subtitle">{formatDateNumber(new Date(this.props.day).getDate())}</text>
			</>
		)
	}

	protected calcSize(number: number) {
		return number * this.props.height / this.props.totalTotal
	}

	private getXPTxt() {
		const txtLength = (this.props.total.toString().length + 3) * 13
		let position = 25 + this.calcSize(this.props.totalTotal - this.props.total) - txtLength
		let classes = 'xp-txt'
		if (position <= 28) {
			position += txtLength + 16
			classes += ' xp-txt-invert'
		}
		return (
			<text transform={`rotate(90, 4, ${position})`} letterSpacing="5" y={position} x="4" rotate="-90" className={classes}>{this.props.total} XP</text>
		)
	}
}
