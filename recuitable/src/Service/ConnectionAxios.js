import axios from "axios";

export default axios.create({
  baseURL: "https://recruitermanagementsystem.herokuapp.com/usr",
  headers: {
    "Content-type": "application/json"
  }
});