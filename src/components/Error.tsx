import React from 'react'
import { encodeHTML } from '../common/utils'

export default class Error extends React.Component<{
	message: string
	secondaryMessage?: string
}> {

	public render = () => (
		<svg width="495" height="120" viewBox="0 0 495 120" fill="none" xmlns="http://www.w3.org/2000/svg">
			<style>{`
				.text { font: 600 16px 'Segoe UI', Ubuntu, Sans-Serif; fill: #2F80ED }
				.small { font: 600 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: #252525 }
				.gray { fill: #858585 }
			`}</style>
			<rect x="0.5" y="0.5" width="494" height="99%" rx="4.5" fill="#FFFEFE" stroke="#E4E2E2"/>
			<text x="25" y="45" className="text">Something went wrong! file an issue at https://dze.io/3nL29</text>
			<text data-testid="message" x="25" y="55" className="text small">
				<tspan x="25" dy="18">{encodeHTML(this.props.message)}</tspan>
				<tspan x="25" dy="18" className="gray">{this.props.secondaryMessage}</tspan>
			</text>
		</svg>
	)

}
