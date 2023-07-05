import http from "./http-common";

class BlogsService{
    fetchBlogers(){
        return http.get('/blogers');
    }

    fetchBloger(username){
        return http.get(`/blogers/${username}`);
    }
}

export default new BlogsService;