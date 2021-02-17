import { getJwt } from './authService';
import http from './httpService';
const apiEndPoint = "/auth/register";

export function register(user) {
    return http.post(apiEndPoint, {
        email: user.username,
        password: user.password,
        name: user.name
    });
}

function userUrl(id) {
    return `/users/${id}`;
}

export function getUser(id) {
    return http.get(userUrl(id));
}

export function getAllUsers() {
    return http.get("/users");
}

export function deleteUser(id) {
    return http.delete(userUrl(id), {}, { headers: { Authorization: getJwt() } });
}

export function updateUser(id, user) {
    return http.put(userUrl(id), user, { headers: { Authorization: getJwt() } });
}