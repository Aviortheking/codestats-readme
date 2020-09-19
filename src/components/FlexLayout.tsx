import React from 'react'

export default class FlexLayout extends React.Component<{
	items: Array<JSX.Element | string | undefined>
	gap: number
	direction?: 'column'
}> {
	public render() {
		return this.props.items.filter(Boolean).map((item, index) => (
			<g key={index} transform={this.getGap(index)}>{item}</g>
		))
	}

	private getGap(index: number) {
		const gap = this.props.gap * index
		let transform = `translate(${gap}, 0)`
		if (this.props.direction === 'column') {
			transform = `translate(0, ${gap})`
		}
		return transform
	}
}
