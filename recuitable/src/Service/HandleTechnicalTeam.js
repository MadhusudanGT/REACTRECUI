import axios from 'axios';


const USER_API_BASE_URL ="https://recruitermanagementsystem.herokuapp.com/rc";
class TechnicalTeamService {

    fetchUsers() {
        return axios.get(USER_API_BASE_URL+`/getall`);
    }

    fetchUserById(userId) {
        return axios.get(USER_API_BASE_URL+`/users/${userId}`);
    }

    deleteUser(userId) {
        return axios.delete(USER_API_BASE_URL+`users/${userId}`);
    }

    create(data) {
        return axios.post(USER_API_BASE_URL+`/create/`, data);
    }

    editUser(user) {
        return axios.put(USER_API_BASE_URL + `/update/${user.id}`, user);
    }

}

export default new TechnicalTeamService();