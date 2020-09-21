import { CodeStatsResponse } from '../interfaces'
import { CustomError } from './utils'

export default async function retryer<T = Promise<CodeStatsResponse>>(
	fetcher: (username: string) => T,
	data: string,
	retries = 0,
	err?: any
): Promise<T> {
	if (retries > 7) {
		throw new CustomError('Maximum retries exceeded' + err, 'MAX_RETRY')
	}
	try {
		return await fetcher(
			data
		)
	} catch (err) {
		return retryer(fetcher, data, ++retries, err)
	}
}
