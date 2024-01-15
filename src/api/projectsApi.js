import axios from 'axios';
import Cookies from 'js-cookie';


class projectsApi {
  
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

  async getProjects() {
    this._setAuthHeaders();
        try {
        const response = await this.axiosInstanceWithAuth.get('/api/projects/');
        if (response.status === 200) {
            return {
            success: true,
            data: response.data,
            };
        } else {
            return {
            success: false,
            error: 'An error occurred while fetching projects',
            };
        }
        } catch (error) {
        if (error.response && error.response.status === 401) {
            return {
            success: false,
            error: 'Unauthorized',
            };
        } else {
            return {
            success: false,
            error: 'An error occurred while fetching projects',
            };
        }
        }
    }
  
    async createProject(project) {
      this._setAuthHeaders();
  
      try {
          const response = await this.axiosInstanceWithAuth.post('/api/projects/', project,{
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          });
  
          if (response.status === 201) {
              return {
                  success: true,
                  data: response.data,
                  fullResponse: response, 
              };
          } else {
              return {
                  success: false,
                  error: 'An error occurred while creating project',
                  fullResponse: response, 
              };
          }
      } catch (error) {
          if (error.response && error.response.status === 401) {
              return {
                  success: false,
                  error: 'Unauthorized',
                  fullResponse: error.response, 
              };
          } else {
              return {
                  success: false,
                  error: 'An error occurred while creating project',
                  fullResponse: error.response, 
              };
          }
      }
  }
  async deleteProject(projectId) {
    this._setAuthHeaders();

    try {
        const response = await this.axiosInstanceWithAuth.delete(`/api/projects/${projectId}/`);

        if (response.status === 204) {
            return {
                success: true,
                data: response.data,
                fullResponse: response, 
            };
        } else {
            return {
                success: false,
                error: 'An error occurred while deleting project',
                fullResponse: response, 
            };
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return {
                success: false,
                error: 'Unauthorized',
                fullResponse: error.response, 
            };
        } else {
            return {
                success: false,
                error: 'An error occurred while deleting project',
                fullResponse: error.response, 
            };
        }
    }
  }
  async updateProject(project, projectId) {
    this._setAuthHeaders();

    try {
        const response = await this.axiosInstanceWithAuth.patch(`/api/projects/${projectId}/`, project,{
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });

        if (response.status === 201) {
            return {
                success: true,
                data: response.data,
                fullResponse: response, 
            };
        } else {
            return {
                success: false,
                error: 'An error occurred while creating project',
                fullResponse: response, 
            };
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return {
                success: false,
                error: 'Unauthorized',
                fullResponse: error.response, 
            };
        } else {
            return {
                success: false,
                error: 'An error occurred while creating project',
                fullResponse: error.response, 
            };
        }
    }
}
}

    

  //HERE THE TASKS FUNCTIONS


const projectApi = new projectsApi();

export default projectApi;