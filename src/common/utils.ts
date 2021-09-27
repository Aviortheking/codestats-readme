import fetch from 'node-fetch'
import { Response } from 'express'
import wrap from 'word-wrap'
import themes from '../../themes/themes.json'
import { CodeStatsResponse } from '../interfaces'
import languageColor from '../../themes/language-bar.json'

/**
 * Encode a string to escape HTML
 *
 * https://stackoverflow.com/a/48073476/10629172
 * @param str the string to encode
 */
export function encodeHTML(str: string) {
	return str
		.replace(/[\u00A0-\u9999<>&](?!#)/gim, (i) => {
			return '&#' + i.charCodeAt(0) + ';'
		})
}

export function kFormatter(num: number) {
	return Math.abs(num) > 999 ?
		trunc(num / 1000) + 'k' :
		num
}

/**
 * Transform the `value` query string into a Boolean
 * @param value the value to transform
 */
export function parseBoolean(value: boolean | string | undefined) {
	return value === 'true' || value === '' || value === true
}

export function parseArray(str: string | undefined) {
	if (!str) return []
	return str.split(',')
}

export function clampValue(number: number, min: number, max?: number) {
	return Math.max(min, max ? Math.min(number, max) : number)
}

export async function request(username: string): Promise<CodeStatsResponse> {
	const resp = await fetch(
		`https://codestats.net/api/users/${username}`
	)
	return resp.json()
}

export async function profileGraphRequest<T>(body: string): Promise<T> {
	const resp = await fetch(
		'https://codestats.net/profile-graph',
		{
			body,
			method: 'POST'
		}
	)
	return resp.json()
}

export function getColor(
	color: keyof typeof themes.default,
	replacementColor?: string,
	theme: keyof typeof themes = 'default'
) {
	return '#' + (replacementColor ? replacementColor : themes[theme][color])
}

export function wrapTextMultiline(text: string, width = 60, maxLines = 3) {
	const wrapped = wrap(encodeHTML(text), { width })
		.split('\n') // Split wrapped lines to get an array of lines
		.map((line) => line.trim()) // Remove leading and trailing whitespace of each line

	const lines = wrapped.slice(0, maxLines) // Only consider maxLines lines

	// Add "..." to the last line if the text exceeds maxLines
	if (wrapped.length > maxLines) {
		lines[maxLines - 1] += '...'
	}

	// Remove empty lines if text fits in less than maxLines lines
	return lines.filter(Boolean)
}

export const CONSTANTS = {
	THIRTY_MINUTES: 1800,
	TWO_HOURS: 7200,
	FOUR_HOURS: 14400,
	ONE_DAY: 86400,
	LEVEL_FACTOR: 0.025
}

export const SECONDARY_ERROR_MESSAGES = {
	MAX_RETRY: 'Make sure your profile is not private'
}

export class CustomError extends Error {

	public secondaryMessage: string

	constructor(message: string, public type: keyof typeof SECONDARY_ERROR_MESSAGES) {
		super(message)
		this.secondaryMessage = SECONDARY_ERROR_MESSAGES[type] || 'adsad'
	}

	static MAX_RETRY = 'MAX_RETRY'
	static USER_NOT_FOUND = 'USER_NOT_FOUND'

}

/**
 * Return the level depending on the xp
 *
 * https://codestats.net/api-docs
 * @param xp the xp count
 */
export function getLevel(xp: number): number {
	return Math.trunc(Math.floor(CONSTANTS.LEVEL_FACTOR * Math.sqrt(xp)))
}

/**
 * Return the progress (0-99)% til next level
 * @param xp Xp number
 */
export function getProgress(xp: number): number {
	const currentLvl = getLevel(xp)
	return trunc((CONSTANTS.LEVEL_FACTOR * Math.sqrt(xp) - currentLvl) * 100, 2)
}

export function getPercent(number: number, total: number) {
	return trunc(number * 100 / total, 2)
}


/**
 * Round a number without moving it to a string and reparsing it
 *
 * https://stackoverflow.com/a/29494612/7335674
 * @param number the number to truncate
 * @param digits the number of digits after the dot
 */
export function trunc(number: number, digits = 0) {
	const pow = Math.pow(10, digits)
	return Math.round(number * pow) / pow
}

export function parseNumber(number: string | number | undefined): number | undefined {
	if (typeof number === 'undefined' || typeof number === 'number') {
		return number
	}
	const n = parseFloat(number)
	if (isNaN(n)) {
		return undefined
	}
	return n
}


export function calculateCircleProgress(percent: number, radius = 40) {
	const c = Math.PI * radius * 2

	percent = clampValue(percent, 0, 100)

	return ((100 - percent) / 100) * c
}

/**
 * Prepare the response
 * @param res the response object
 */
export function prepareResponse(res: Response) {
	res.setHeader('Content-Type', 'image/svg+xml')
}

/**
 * set the cache in the response
 * @param res the Response object
 * @param cache The cache time in seconds
 */
export function setCache(res: Response, cache = CONSTANTS.THIRTY_MINUTES) {
	if (isNaN(cache)) {
		cache = CONSTANTS.THIRTY_MINUTES
	}
	const clampedCache = clampValue(cache, CONSTANTS.THIRTY_MINUTES, CONSTANTS.ONE_DAY)

	res.setHeader('Cache-Control', `public, stale-while-revalidate, max-age=${clampedCache} s-maxage=${clampedCache}`)

}


export function lowercaseTrim(str: string) {
	return str.toLowerCase().trim()
}


export function formatDateNumber(number: number): string {
	if (number < 10) {
		return '0' + number
	}
	return number + ''
}

export function formatDate(date: Date): string {
	return `${date.getFullYear()}-${formatDateNumber(date.getMonth() + 1)}-${formatDateNumber(date.getDate())}`
}


export function getColorOfLanguage(name: string): string {
	return name in languageColor ? languageColor[name as keyof typeof languageColor].color || '#3e4053' : '#3e4053'
}
