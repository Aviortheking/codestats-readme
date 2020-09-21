import React from 'react'
import themes from '../../themes/themes.json'
import FlexLayout from '../components/FlexLayout'

import { getColor, parseBoolean } from './utils'

export interface CardOptions {
	title_color?: string
	bg_color?: string
	hide_border?: boolean
	hide_title?: boolean
	theme?: keyof typeof themes
}

export default class Card {

	public hideBorder = false
	public hideTitle = false
	public css = ''
	public paddingX = 25
	public paddingY = 35
	public animations = true
	public height = 100
	public width = 100
	public title = ''
	public colors: {
		titleColor?: string | Array<string>,
		bgColor?: string | Array<string>
	} = {}
	public titlePrefix?: JSX.Element

	constructor(options?: CardOptions) {
		if (options) {
			this.hideBorder = parseBoolean(options.hide_border)
			this.hideTitle = parseBoolean(options.hide_title)
			this.colors = {
				titleColor: getColor('title_color', options?.title_color, options?.theme),
				bgColor: getColor('bg_color', options?.bg_color, options?.theme)
			}
		}
	}

	renderTitle() {
		const titleText = (
			<text
				x="0"
				y="0"
				className="header"
			>{this.title}</text>
		)


		const prefixIcon = (
			<svg
				className="icon"
				x="0"
				y="-13"
				viewBox="0 0 16 16"
				version="1.1"
				width="16"
				height="16"
			>
				{this.titlePrefix}
			</svg>
		)
		return (
			<g
				transform={`translate(${this.paddingX}, ${this.paddingY})`}
			>
				<FlexLayout
					items={[this.titlePrefix && prefixIcon, titleText]}
					gap={25}
				/>
			</g>
		)
	}

	renderGradient() {
		if (typeof this.colors.bgColor !== 'object') return

		const gradients = this.colors.bgColor.slice(1)
		return typeof this.colors.bgColor === 'object' ?
			(
				<defs>
					<linearGradient
						id="gradient"
						gradientTransform={`rotate(${this.colors.bgColor[0]})`}
					>
						{gradients.map((grad, index) => {
							const offset = (index * 100) / (gradients.length - 1)
							return `<stop offset="${offset}%" stop-color="#${grad}" />`
						})}
					</linearGradient>
				</defs>
			) :
			''
	}

	render(body: JSX.Element) {
		return (
			<svg
				width={this.width}
				height={this.height - (this.hideTitle ? 30 : 0)}
				viewBox={`0 0 ${this.width} ${this.height}`}
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<style>{`
					.header {
						font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
						fill: ${this.colors.titleColor};
						animation: fadeInAnimation 0.8s ease-in-out forwards;
					}
					${this.css}

					/* Animations */
					@keyframes scaleInAnimation {
						from {
							transform: translate(-5px, 5px) scale(0);
						}
						to {
							transform: translate(-5px, 5px) scale(1);
						}
					}
					@keyframes fadeInAnimation {
						from {
							opacity: 0;
						}
						to {
							opacity: 1;
						}
					}
				`}</style>

				{this.renderGradient()}

				<rect
					x="0.5"
					y="0.5"
					rx="4.5"
					height="99%"
					stroke="#E4E2E2"
					width={this.width - 1}
					fill={
						typeof this.colors.bgColor === 'object' ?
							'url(#gradient)' :
							this.colors.bgColor
					}
					strokeOpacity={this.hideBorder ? 0 : 1}
				/>

				{this.hideTitle ? '' : this.renderTitle()}

				<g
					transform={`translate(0, ${
						this.hideTitle ? this.paddingX : this.paddingY + 20
					})`}
				>
					{body}
				</g>
			</svg>
		)
	}

}
