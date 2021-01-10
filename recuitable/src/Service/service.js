import http from "./ConnectionAxios";

const getAll = () => {
  return http.get("/users");
};

const get = id => {
  return http.get(`/tutorials/${id}`);
};

const create = data => {
  return http.post("/create", data);
};

const update = (id, data) => {
  return http.put(`/update/${id}`, data);
};

const remove = id => {
  return http.delete(`/users/${id}`);
};


const search = keyword => {
  return http.get(`/search?keyword=${keyword}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  search
};
