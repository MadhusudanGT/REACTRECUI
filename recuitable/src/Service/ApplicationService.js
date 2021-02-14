import axios from 'axios';

// const USER_API_BASE_URL ="https://recruitermanagementsystem.herokuapp.com/appc";
const USER_API_BASE_URL ="https://recruitermanagementsystem.herokuapp.com/appc";

class ApplicationService {

    fetchUsers() {
        return axios.get(USER_API_BASE_URL+`/allapplication`);
    }

    AcceptUser(userId) {
        return axios.get(USER_API_BASE_URL+`/accept/${userId}`);
    }

    RejectUser(userId) {
        return axios.get(USER_API_BASE_URL+`/reject/${userId}`);
    }

    addUser(user) {
        return axios.post(USER_API_BASE_URL+`/create/`, user);
    }

    // editUser(user) {
    //     return axios.put(USER_API_BASE_URL + `/update/${user.id}`, user);
    // }

    FindByEmail(email) {
        return axios.get(USER_API_BASE_URL+`/findByEmail/${email}`);
    }

    findRegisteredApplication(userId) {
        return axios.get(USER_API_BASE_URL+`/registreed/${userId}`);
    }

}

export default new ApplicationService();