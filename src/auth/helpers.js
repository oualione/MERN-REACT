export const isAuth = () => {
    var jwt = localStorage.getItem('jwt');
        if(jwt){
            return JSON.parse(jwt);
        }
        return false;
}