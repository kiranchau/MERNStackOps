import axios from "axios";
export const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const User = `${process.env.REACT_APP_API_URL}api/user/`;

export function userAddRecord(req) {
  return axios.post(User, req);
}

export function userAllRecord() {
  return axios.get(User);
}

export function userRecord(id) {
  return axios.get(User + `${id}`);
}

export function updateRecord(id, req) {
  return axios.put(User + `${id}`, req);
}

export function deleteRecord(id) {
  return axios.delete(User + `${id}`);
}
