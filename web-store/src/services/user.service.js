import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }
  async getAllProducts() {
    //let res = "null";
    return await axios.get(API_URL + "games/all");
    //return res.data;
  }
  getProductByName(name) {
    return axios.get(API_URL + "games/get?name=" + name);
  }
  //   getUserBoard() {
  //     return axios.get(API_URL + "user", { headers: authHeader() });
  //   }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new UserService();
