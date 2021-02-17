import { getJwt } from './authService';
import http from './httpService';

const apiEndPoint = '/genres';

function genreUrl(id) {
    return `${apiEndPoint}/${id}`;
}

export function getGenres() {
    return http.get(apiEndPoint);
}

export function postGenre(genre) {
    return http.post(apiEndPoint, genre, { headers: { Authorization: getJwt() } });
}

export function deleteGenre(id) {
    return http.delete(genreUrl(id), genre, { headers: { Authorization: getJwt() } });
}

export function updateGenre(id, genre) {
    return http.put(genreUrl(id), {}, { headers: { Authorization: getJwt() } });
}