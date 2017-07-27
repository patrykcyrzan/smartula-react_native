import { fetchApi } from '../../services/api';

const endPoints = {
	get: '/devices/hive',
};

export const get = payload => fetchApi(endPoints.get, payload, 'get');
