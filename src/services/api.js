import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/suculenta";

class Api {

    createSuculenta(data) {
        return axios.post(EMPLOYEE_API_BASE_URL + '/create', data, {
            headers: {
                "Content-type": "multipart/form-data",
            }
        });
    }

    listSuculenta(id) {
        return axios.get(EMPLOYEE_API_BASE_URL + '/list/' + id);
    }

    listSuculentas() {
        return axios.get(EMPLOYEE_API_BASE_URL + '/dashboard');
    }

    updateSuculentas(id, data) {
        return axios.put(EMPLOYEE_API_BASE_URL + '/update/' + id, data);
    }

    deleteSuculenta(id) {
        return axios.delete(EMPLOYEE_API_BASE_URL + '/delete/' + id);
    }

    searchSuculenta(name){
        return axios.get(EMPLOYEE_API_BASE_URL + '/search/' + name);
    }
}

export default new Api();