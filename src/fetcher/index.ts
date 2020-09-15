import { request, logger, CONSTANTS, getLevel, CustomError } from '../common/utils'
import retryer from '../common/retryer'
import languageColor from '../../themes/language-bar.json'

export interface data {
	name: string
	size: number
	color: string
	recentSize: number
}

export async function fetchProfile(username: string) {
	if (!username) throw Error('Invalid Username')

	const response = await retryer(request, {login: username})

	return {
		username,
		xp: response.data.total_xp,
		recentXp: response.data.new_xp,
		level: getLevel(response.data.total_xp + response.data.new_xp)
	}
}

export async function fetchTopLanguages(username: string) {
	if (!username) throw Error("Invalid username");

	let res = await retryer(request, { login: username });

	let repoNodes = res.data.languages;

	// Remap nodes
	const list = []
	for (const key in repoNodes) {
		const item = repoNodes[key]
		list.push({
			name: key,
			color: key in languageColor ? languageColor[key as keyof typeof languageColor].color || '#000000' : '#000000',
			xp: item.xps,
			recentXp: item.new_xps + item.xps,
			lvl: Math.trunc(Math.floor(CONSTANTS.LEVEL_FACTOR * Math.sqrt(item.xps)))
		})
	}

	repoNodes = list
		.filter((node) => {
		return node.xp > 0;
		})
		.sort((a, b) => b.xp - a.xp)
		.reduce((acc, prev) => {
		return {
			...acc,
			[prev.name]: {
			name: prev.name,
			color: prev.color,
			size: prev.xp,
			recentSize: prev.recentXp
			},
		};
		}, {});

	const topLangs = Object.keys(repoNodes)
		// .slice(0, 5)
		.reduce((result: Record<string, any>, key) => {
		result[key] = repoNodes[key];
		return result;
		}, {});

	return topLangs as Record<string, data>
}
