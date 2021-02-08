import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/Answers';

class UserTestService {

addUser(user) {
return axios.post(USER_API_BASE_URL+`/saveanswers/`, user);
}

}

export default new UserTestService();