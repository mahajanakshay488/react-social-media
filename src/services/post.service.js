import http from "./http-common";

class PostService {
    
    addPost(credentials){
        return http.post('/post',credentials,{
            headers: {
                "Content-Type": "multipart/form-data",
              }
        });
    }

    fetchPosts(){
        return http.get('/allpost');
    }

    fetchPost(postid){
        return http.get(`/allpost/${postid}`);
    }

    likePost(postid){
        return http.get(`/post/react/${postid}`);
    }

    addComment(postid, credentials){
        return http.post(`/post/comment/${postid}`, credentials);
    }

    fetchComments(postid){
        return http.get(`/comments/${postid}`);
    }

    
}

export default new PostService;