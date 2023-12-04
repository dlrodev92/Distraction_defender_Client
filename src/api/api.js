import axios from 'axios';
import Cookies from 'js-cookie';


class Api {
  
  constructor() {
    this.API_BASE_URL = 'http://127.0.0.1:8000/';

    this.axiosInstance = axios.create({
      baseURL: this.API_BASE_URL,
    });

    this.axiosInstanceWithAuth = axios.create({
      baseURL: this.API_BASE_URL,
    });

    this._setAuthHeaders();

  }

  _setAuthHeaders() {
    const token = Cookies.get('access_token');
    if (token) {
      this.axiosInstanceWithAuth.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  refreshToken(refresh){
    return this.axiosInstanceWithAuth.post('/api/token/refresh/', { refresh: refresh },);
  }

  
  async login(userData) {
    try {
     const response = await this.axiosInstance.post('/login/', userData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          error: 'An error occurred during login',
        };
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return {
          success: false,
          error: 'Invalid credentials',
        };
      } else {
        return {
          success: false,
          error: 'An error occurred',
        };
      }
    }
  }

  signup(userData) {
    return this.axiosInstance.post('/api/users/', userData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  }

  async logout(refreshToken) {
    try {
      const response = await this.axiosInstanceWithAuth.post('/logout/', {'token': refreshToken});
      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          error: 'An error occurred during logout',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'An error occurred',
      };
    }
  }

  getUserProfile() {
    this._setAuthHeaders();
    return this.axiosInstanceWithAuth.get('/api/users/');
  }

  
}

const api = new Api();

export default api;