import http from './httpService';
import { getJwt } from './authService';

const apiEndPoint = "/comments";

export function getComments(gameId, parent_id = -1) {
    return http.get(apiEndPoint + `/game/${gameId}?parent_id=${parent_id}`);
}

export function postComment(comment, gameId, parentId) {
    return http.post(apiEndPoint + `/game/${gameId}?parent_id=${parentId}`, comment, { headers: { 'Authorization': getJwt() } });
}

export function voteComment(commentId, vote) {
    http.put(apiEndPoint + `/${commentId}/vote`, {}, { params: { vote } });
}