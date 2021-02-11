import axios from 'axios';


const USER_API_BASE_URL ="https://recruitermanagementsystem.herokuapp.com/Answers";
class UserTestService {

addUser(user) {
return axios.post(USER_API_BASE_URL+`/saveanswers/`, user);
}

}

export default new UserTestService();