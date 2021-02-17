import jwtDecode from 'jwt-decode';
import httpService from "./httpService";

const apiEndPoint = "auth/login";
const tokenKey = "token";

httpService.setJwt(getJwt());

export async function login(username, password) {

    // let instance = httpService.create();
    // delete instance.defaults.headers.common['Authorization'];

    const { data: jwt } = await httpService.post(apiEndPoint, { username, password });
    localStorage.setItem(tokenKey, jwt.jwt);

    // instance.defaults.headers.common['Authorization'] = jwt.jwt;

}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function isUsernameUnique(username) {
    return httpService.get("/user/username?username=" + username);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (error) {
        return null
    }
}

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export default {
    login,
    loginWithJwt,
    logout,
    getCurrentUser,
    getJwt,
    isUsernameUnique
}