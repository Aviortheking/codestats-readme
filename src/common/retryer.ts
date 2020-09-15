import { CustomError, request } from './utils'
import { AxiosPromise } from 'axios';

const retryer = async <T = AxiosPromise<{error: string}>>(fetcher: (variables: {login: string}) => T, variables: {login: string}, retries = 0): Promise<T> => {
	if (retries > 7) {
		throw new CustomError("Maximum retries exceeded", 'MAX_RETRY');
	}
	try {
		let response = await fetcher(
			variables
		)

		return response;
	} catch (err) {
		return retryer(fetcher, variables, 1 + retries);
	}
};

export default retryer
