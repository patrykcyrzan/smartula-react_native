import { fetchApi } from '../api';

const endPoints = {
    authenticate: '/user/auth',
    /*revoke: '/users/auth/revoke',
    refresh: '/users/auth/refresh',*/
};

export const authenticate = (username, password) => fetchApi(endPoints.authenticate, {username, password }, 'post', {
    'Content-Type': 'application/json'
});

//'Content-Type': 'application/json',

