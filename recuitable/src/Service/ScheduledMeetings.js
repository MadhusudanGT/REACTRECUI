import axios from 'axios';

const USER_API_BASE_URL ="https://recruitermanagementsystem.herokuapp.com/Scheduled";

class JobService {

    fetchUsers() {
        return axios.get(USER_API_BASE_URL+`/getall`);
    }

    fetchUserById(userId) {
        return axios.get(USER_API_BASE_URL+`/getmeetingid/${userId}`);
    }

    deleteUser(userId) {
        return axios.delete(USER_API_BASE_URL+`delete/${userId}`);
    }

    create(data) {
        return axios.post(USER_API_BASE_URL+`/create/`, data);
    }

    editUser(id,user) {
        return axios.put(USER_API_BASE_URL + `/update/${id}`, user);
    }

    scheduledMeeting(userId) {
        return axios.get(USER_API_BASE_URL+`/scheduled/${userId}`);
    }

    rescheduledMeeting(userId) {
        return axios.get(USER_API_BASE_URL+`/rescheduled/${userId}`);
    }
}

export default new JobService();