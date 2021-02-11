import axios from 'axios';

const USER_API_BASE_URL ="https://recruitermanagementsystem.herokuapp.com/jobc";
class JobService {

    fetchUsers() {
        return axios.get(USER_API_BASE_URL+`/alljob`);
    }

    fetchUserById(userId) {
        return axios.get(USER_API_BASE_URL+`/users/${userId}`);
    }

    deleteUser(userId) {
        return axios.delete(USER_API_BASE_URL+`users/${userId}`);
    }

    createjob(data) {
        return axios.post(USER_API_BASE_URL+`/create/`, data);
    }

    editUser(user) {
        return axios.put(USER_API_BASE_URL + `/update/${user.id}`, user);
    }

}

export default new JobService();