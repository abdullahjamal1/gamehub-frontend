import { getJwt } from './authService';
import http from './httpService';

const apiEndPoint = "/games";

function gameUrl(id) {
    return `${apiEndPoint}/${id}`;
}
export function getGames() {
    return http.get(apiEndPoint);
}

export function getGameInfo(gameId) {
    return http.get(gameUrl(gameId));
}

export function getGame(gameId) {
    http.get(gameUrl(gameId) + "/file");
}

export function getGameImageCount(gameId) {
    return http.get(gameUrl(gameId) + "/images");
}

export function saveGame(
   title, description, genre_id) {

       genre_id = 2;
       const game = {title, description, genre_id};

    return http.post(apiEndPoint, game, { headers: { Authorization: getJwt() }});
    // const game_id = data.game_id;
}
export function postGameFiles(images, gameFile, game_id){

          const formData = new FormData();
    
      // Update the formData object
      formData.append(
        "images[]",
        images[0]
      );
      formData.append(
        "gameFile",
        gameFile
      );
    
  console.log(images);

    return http.post(apiEndPoint + "/file", formData,
     { headers: { Authorization: getJwt(), 'Content-Type': `multipart/form-data` }, params:{game_id}});
    
}

export function deleteGame(gameId) {
    return http.delete(gameUrl(gameId));
}


export function rateGame(gameId, rating) {
    http.put(gameUrl(gameId) + "/rate", {}, { params: { rating } });
}