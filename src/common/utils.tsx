import React from 'react'

import axios from 'axios'
import wrap from 'word-wrap'
import themes from '../../themes'

export const renderError = (message: string, secondaryMessage = "") => {
	return (
		<svg width="495" height="120" viewBox="0 0 495 120" fill="none" xmlns="http://www.w3.org/2000/svg">
			<style>{`
				.text { font: 600 16px 'Segoe UI', Ubuntu, Sans-Serif; fill: #2F80ED }
				.small { font: 600 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: #252525 }
				.gray { fill: #858585 }
			`}</style>
			<rect x="0.5" y="0.5" width="494" height="99%" rx="4.5" fill="#FFFEFE" stroke="#E4E2E2"/>
			<text x="25" y="45" className="text">Something went wrong! file an issue at https://git.io/JJmN9</text>
			<text data-testid="message" x="25" y="55" className="text small">
			<tspan x="25" dy="18">{encodeHTML(message)}</tspan>
			<tspan x="25" dy="18" className="gray">{secondaryMessage}</tspan>
			</text>
		</svg>
	)
};

// https://stackoverflow.com/a/48073476/10629172
export function encodeHTML(str: string) {
	return str
		.replace(/[\u00A0-\u9999<>&](?!#)/gim, (i) => {
		return "&#" + i.charCodeAt(0) + ";";
		})
		.replace(/\u0008/gim, "");
}

export function kFormatter(num: number) {
	return Math.abs(num) > 999
		? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
		: Math.sign(num) * Math.abs(num);
}

export function isValidHexColor(hexColor: string) {
	return new RegExp(
		/^([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{4})$/
	).test(hexColor);
}

export function parseBoolean(value: string | undefined) {
	if (value === "true") {
		return true;
	} else {
		return false;
	}
}

export function parseArray(str: string | undefined) {
	if (!str) return [];
	return str.split(",");
}

export function clampValue(number: number, min: number, max: number) {
	return Math.max(min, Math.min(number, max));
}

export function isValidGradient(colors: Array<string>) {
	return isValidHexColor(colors[1]) && isValidHexColor(colors[2]);
}

export function fallbackColor(color: string, fallbackColor: Array<string>| string) {
	let colors = color.split(",");
	let gradient = null;

	if (colors.length > 1 && isValidGradient(colors)) {
		gradient = colors;
	}

	return (
		(gradient ? gradient : isValidHexColor(color) && `#${color}`) ||
		fallbackColor
	);
}

export function request(data?: any, headers?: any) {
	return axios({
		url: "https://api.github.com/graphql",
		method: "post",
		headers,
		data,
	});
}

export function codeStatsRequest(data?: any) {
	return axios({
		url: "https://codestats.net/api/users/" + data.login,
		method: "get",
	});
}

/**
 *
 * @param {String[]} items
 * @param {Number} gap
 * @param {string} direction
 *
 * @description
 * Auto layout utility, allows us to layout things
 * vertically or horizontally with proper gaping
 */
export function FlexLayout({ items, gap, direction }: {items: Array<JSX.Element | string | undefined>, gap: number, direction?: string}) {
	// filter() for filtering out empty strings
	return items.filter(Boolean).map((item, i) => {
		let transform = `translate(${gap * i}, 0)`;
		if (direction === "column") {
		transform = `translate(0, ${gap * i})`;
		}
		return (
			<g key={i} transform={transform}>{item}</g>
		);
	});
}

// returns theme based colors with proper overrides and defaults
export function getCardColors({
  title_color,
  text_color,
  icon_color,
  bg_color,
  theme,
  fallbackTheme = "default",
}: {title_color?: string, text_color?: string, icon_color?: string, bg_color?: string, theme?: keyof typeof themes, fallbackTheme?: keyof typeof themes}) {
  const defaultTheme = themes[fallbackTheme];
  const selectedTheme = themes[theme as 'default'] || defaultTheme;

  // get the color provided by the user else the theme color
  // finally if both colors are invalid fallback to default theme
  const titleColor = fallbackColor(
    title_color || selectedTheme.title_color,
    "#" + defaultTheme.title_color
  );
  const iconColor = fallbackColor(
    icon_color || selectedTheme.icon_color,
    "#" + defaultTheme.icon_color
  );
  const textColor = fallbackColor(
    text_color || selectedTheme.text_color,
    "#" + defaultTheme.text_color
  );
  const bgColor = fallbackColor(
    bg_color || selectedTheme.bg_color,
    "#" + defaultTheme.bg_color
  );

  return { titleColor, iconColor, textColor, bgColor };
}

export function wrapTextMultiline(text: string, width = 60, maxLines = 3) {
  const wrapped = wrap(encodeHTML(text), { width })
    .split("\n") // Split wrapped lines to get an array of lines
    .map((line) => line.trim()); // Remove leading and trailing whitespace of each line

  const lines = wrapped.slice(0, maxLines); // Only consider maxLines lines

  // Add "..." to the last line if the text exceeds maxLines
  if (wrapped.length > maxLines) {
    lines[maxLines - 1] += "...";
  }

  // Remove empty lines if text fits in less than maxLines lines
  const multiLineText = lines.filter(Boolean);
  return multiLineText;
}

export const noop = () => {};
// return console instance based on the environment
export const logger =
  process.env.NODE_ENV !== "test" ? console : { log: noop, error: noop };

export const CONSTANTS = {
  THIRTY_MINUTES: 1800,
  TWO_HOURS: 7200,
  FOUR_HOURS: 14400,
  ONE_DAY: 86400,
  LEVEL_FACTOR: 0.025,
};

export const SECONDARY_ERROR_MESSAGES = {
	MAX_RETRY:
		"Please add an env variable called PAT_1 with your github token in vercel",
	USER_NOT_FOUND: "Make sure the provided username is not an organization",
};

export class CustomError extends Error {
	public secondaryMessage: string

	constructor(message: string, public type: keyof typeof SECONDARY_ERROR_MESSAGES) {
		super(message);
		this.secondaryMessage = SECONDARY_ERROR_MESSAGES[type] || "adsad";
	}

	static MAX_RETRY = "MAX_RETRY";
	static USER_NOT_FOUND = "USER_NOT_FOUND";
}
