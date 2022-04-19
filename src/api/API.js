import { httpClient, toFormData } from './httpClient';

class APIRouter {
    login = (data) => httpClient.post('/auth/login/email', toFormData(data));
    logout = () => httpClient.post('/me/user/logout');
    checkUserByToken = () => httpClient.get('/me/user/info');
    getPostList = () => httpClient.get('/post/analysis?per_page=12&page=1');
    getFavouriteList = () => httpClient.get('/me/user/favourite/post-analysis');
    addFavourite = (postId) => httpClient.post(`/me/user/favourite/post-analysis/${postId}`);
    deleteFavourite = (postId) => httpClient.delete(`/me/user/favourite/post-analysis/${postId}`);
}

export default new APIRouter();
