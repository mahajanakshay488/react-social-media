import http from "./http-common";

class UserService {

    signup(credentials){
        return http.post('/signup', credentials);
    }

    login(credentials){
        return http.post('/login', credentials);
    }

    checkLogedin(){
        return http.get('/islogedin');
    }

    logout(){
        return http.get('/logout');
    }
    
    profile() {
        return http.get('/profile');
    }

    updateProfilepic(credentials) {
        return http.post('/upload/profilepic', credentials,{
            headers: {
                "Content-Type": "multipart/form-data",
              }
        });
    }
}

export default new UserService;
