import http from "./ConnectionAxios";

// async function  getAll(){
//    return await http.get("/users");
// };

const getAll = async () => {

  return await http.get("/users");
}

const get = async(id) => {
  return await http.get(`/tutorials/${id}`);
};

const create = async(data) => {
  return await http.post("/create", data);
};

const update = async(id, data) => {
  return await  http.put(`/update/${id}`, data);
};

const remove = async(id) => {
  return await http.delete(`/users/${id}`);
};


const search = async(keyword) => {
  return await http.get(`/search?keyword=${keyword}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  search
};
