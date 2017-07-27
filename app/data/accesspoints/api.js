import { fetchApi } from '../../services/api';

const endPoints = {
    getAccessPoints: '/devices/accesspoint',
    getAllLatestMeasurements: '/measurement/latest/all'
};

export const getAllLatestMeasurements = (payload) => fetchApi(endPoints.getAllLatestMeasurements, payload, 'get');