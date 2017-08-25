import fetchival from 'fetchival';
import _ from 'lodash';

import * as sessionSelectors from '../session/selectors';
import apiConfig from './config';

export const exceptionExtractError = (exception) => {
    if (!exception.Errors) return false;
    let error = false;
    const errorKeys = Object.keys(exception.Errors);
    if (errorKeys.length > 0) {
        error = exception.Errors[errorKeys[0]][0].message;
    }
    console.log(error);
    return error;
};

export const fetchApi = (endPoint, payload = {}, method = 'get', headers = {
    'Content-Type': 'application/json'}) => {
    const accessToken = sessionSelectors.get().token;
    return fetchival(`${apiConfig.url}${endPoint}`, {
        headers: _.pickBy({
            ...(accessToken ? {
                token: accessToken,
            } : {
            }),
            ...headers,
        }, item => !_.isEmpty(item)),
    })[method.toLowerCase()](payload)
        .catch((e) => {
            if (e.response && e.response.json) {
                e.response.json().then((json) => {
                    if (json) throw json;
                    throw e;
                });
            } else {
                throw e;
            }
        });
};