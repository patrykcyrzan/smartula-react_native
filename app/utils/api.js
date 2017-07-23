import {fetch} from "react-native";

const smartulaUrl = 'http://localhost:8080'

const endPoints = {
    authenticate: `${smartulaUrl}/user/auth`,
    getHives: `${smartulaUrl}/devices/hive`,
    refresh: '/users/auth/refresh',
};

/*let api = {
    getHives(token) {
        return fetch(endPoints.getHives, {
            headers: {
                'token': token
            }
        }).then((res) => res.json())
    },
    authenticate(username, password) {
        return fetch(endPoints.authenticate, {
            method: 'post',
            body: JSON.stringify({
                username: username,
                password: password,
            })
        }).then((res) => res.json())
    },
    getQualifyingResults(season, round) {
        const url = `${smartulaUrl}/results/season/${season}/round/${round}/qualifying`

        return fetch(url).then((res) => res.json())
    }
}*/

module.exports = api