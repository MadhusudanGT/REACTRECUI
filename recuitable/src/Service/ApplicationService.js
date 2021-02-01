import axios from 'axios';

const USER_API_BASE_URL ="http://localhost:8080/appc";

class ApplicationService {

    // fetchUsers() {
    //     return axios.get(USER_API_BASE_URL+`/getall`);
    // }

    // fetchUserById(userId) {
    //     return axios.get(USER_API_BASE_URL+`/users/${userId}`);
    // }

    // deleteUser(userId) {
    //     return axios.delete(USER_API_BASE_URL+`users/${userId}`);
    // }

    addUser(user) {
        return axios.post(USER_API_BASE_URL+`/create/`, user);
    }

    // editUser(user) {
    //     return axios.put(USER_API_BASE_URL + `/update/${user.id}`, user);
    // }

}

export default new ApplicationService();