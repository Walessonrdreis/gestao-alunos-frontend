import api from './api';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  nome: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface User {
  id: number;
  nome: string;
  email: string;
  role?: string;
}

/**
 * Serviço para gerenciar a autenticação na API
 */
const authService = {
  /**
   * Realiza o login do usuário
   * @param data Dados de login (email e senha)
   * @returns Token de acesso e dados do usuário
   */
  async login(data: LoginData) {
    try {
      // ADICIONAR A ROTA DA API AQUI
      const response = await api.post('/auth/login', data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  },

  /**
   * Registra um novo usuário
   * @param data Dados de registro (nome, email, senha)
   * @returns Token de acesso e dados do usuário
   */
  async register(data: RegisterData) {
    try {
      // ADICIONAR A ROTA DA API AQUI
      const response = await api.post('/auth/register', data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      throw error;
    }
  },

  /**
   * Realiza o logout do usuário
   * @returns Confirmação do logout
   */
  async logout() {
    try {
      // ADICIONAR A ROTA DA API AQUI
      const response = await api.post('/auth/logout');
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Mesmo em caso de erro, remover dados locais
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw error;
    }
  },

  /**
   * Recupera os dados do usuário logado
   * @returns Dados do usuário
   */
  async getUser() {
    try {
      // ADICIONAR A ROTA DA API AQUI
      const response = await api.get('/auth/user');
      return response.data;
    } catch (error) {
      console.error('Erro ao recuperar dados do usuário:', error);
      throw error;
    }
  },

  /**
   * Verifica se o usuário está autenticado
   * @returns Verdadeiro se o usuário estiver autenticado
   */
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  /**
   * Obtém o usuário logado do localStorage
   * @returns Dados do usuário logado
   */
  getLoggedUser(): User | null {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
};

export default authService; 