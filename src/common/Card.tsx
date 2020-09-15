import React from 'react'

import { FlexLayout } from './utils'
import { getAnimations } from '../getStyles'

export default class Card {
	public hideBorder = false
	public hideTitle = false
	public css = ''
	public paddingX = 25
	public paddingY = 35
	public animations = true

	constructor(
		public width = 100,
		public height = 100,
		public colors: {titleColor?: string | Array<string>, textColor?: string | Array<string>, bgColor?: string | Array<string>, iconColor?: string | Array<string>} = {},
		public title = "",
		public titlePrefixIcon?: string
	) {}

	disableAnimations() {
		this.animations = false;
	}

	setCSS(value: string) {
		this.css = value;
	}

	setHideBorder(value: boolean) {
		this.hideBorder = value;
	}

	setHideTitle(value: boolean) {
		this.hideTitle = value;
		if (value) {
			this.height -= 30;
		}
	}

	setTitle(text: string) {
		this.title = text;
	}

	renderTitle() {
		const titleText = (
			<text
				x="0"
				y="0"
				className="header"
				data-testid="header"
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
				${this.titlePrefixIcon}
			</svg>
		)
		return (
			<g
				data-testid="card-title"
				transform={`translate(${this.paddingX}, ${this.paddingY})`}
			>
				{FlexLayout({
					items: [this.titlePrefixIcon && prefixIcon, titleText],
					gap: 25,
				})}
			</g>
		)
	}

	renderGradient() {
		if (typeof this.colors.bgColor !== "object") return;

		const gradients = this.colors.bgColor.slice(1);
		return typeof this.colors.bgColor === "object"
		? (
			<defs>
				<linearGradient
					id="gradient"
					gradientTransform={`rotate(${this.colors.bgColor[0]})`}
				>
					{gradients.map((grad, index) => {
					let offset = (index * 100) / (gradients.length - 1);
					return `<stop offset="${offset}%" stop-color="#${grad}" />`;
					})}
				</linearGradient>
			</defs>
		)
		: "";
	}

	render(body: JSX.Element) {
		return (
			<svg
				width={this.width}
				height={this.height}
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

					${
						process.env.NODE_ENV === "test" || !this.animations
						? ""
						: getAnimations()
					}
				`}</style>

				{this.renderGradient()}

				<rect
					data-testid="card-bg"
					x="0.5"
					y="0.5"
					rx="4.5"
					height="99%"
					stroke="#E4E2E2"
					width={this.width - 1}
					fill={
						typeof this.colors.bgColor === "object"
						? "url(#gradient)"
						: this.colors.bgColor
					}
					strokeOpacity={this.hideBorder ? 0 : 1}
				/>

				{this.hideTitle ? "" : this.renderTitle()}

				<g
					data-testid="main-card-body"
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
