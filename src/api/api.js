import axios from 'axios';
import Cookies from 'js-cookie';

class Api {
  constructor() {
    this.API_BASE_URL = 'https://distraction-defender-server.onrender.com';

    this.axiosInstance = axios.create({
      baseURL: this.API_BASE_URL,
    });

    this.axiosInstanceWithAuth = axios.create({
      baseURL: this.API_BASE_URL,
    });

    this._setAuthHeaders();

  }

  _setAuthHeaders() {
    const token = Cookies.get('token');
    if (token) {
      this.axiosInstanceWithAuth.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  login(userData) {
    return new Promise((resolve, reject) => {
      this.axiosInstance.post('/login/', userData, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        resolve(response); // Resolve with the response for successful requests
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          reject(new Error('Invalid credentials')); // Reject with specific error message for invalid credentials
        } else {
          reject(error); // Reject with the original error for other cases
        }
      });
    });
  }

  signup(userData) {
    return this.axiosInstance.post('/api/users/', userData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  }

  verifyToken() {
    this._setAuthHeaders();
    return this.axiosInstanceWithAuth.get('/api/token/verify');
  }

  
}

const api = new Api();

export default api;