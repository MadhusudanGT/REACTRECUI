// import http from "./ServiceReg";

// // async function getAll(){
// // return await http.get("/users");
// // };

// const create = async(data) => {
// return await http.post("/create", data);
// };

// export default {
// create
// };

import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/reg';

class RegService {

fetchUsers() {
return axios.get(USER_API_BASE_URL+`/getAll`);
}
addUser(user) {
return axios.post(USER_API_BASE_URL+`/create/`, user);
}

findByEmail(email) {
    return axios.get(USER_API_BASE_URL+`/findByMail/${email}`);
}

// editUser(user) {
// return axios.put(USER_API_BASE_URL + `/update/${user.id}`, user);
// }

}

export default new RegService();