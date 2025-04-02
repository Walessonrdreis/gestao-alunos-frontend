/**
 * Serviço de integração com a API
 * 
 * Este módulo contém todos os serviços para comunicação com a API backend,
 * incluindo configuração do cliente HTTP e endpoints específicos para
 * alunos, disciplinas e escolas.
 * 
 * @module ApiService
 */
import axios from 'axios';
import { Aluno } from '../components/ui/AlunoCard/AlunoCard';

/**
 * Cliente HTTP configurado para comunicação com a API
 * 
 * Utiliza axios com interceptors para incluir tokens de autenticação
 * automaticamente nas requisições.
 */
const api = axios.create({
  baseURL: '/api', // URL base para todas as requisições
  timeout: 10000, // Timeout de 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor para adicionar o token de autenticação nas requisições
 * 
 * Obtém o token do localStorage e o inclui no cabeçalho Authorization
 * de todas as requisições antes que sejam enviadas.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Serviços para gerenciamento de alunos
 * 
 * Contém métodos para realizar operações CRUD e consultas específicas
 * relacionadas a alunos no sistema.
 */
export const alunosService = {
  /**
   * Obtém a lista de todos os alunos cadastrados
   * 
   * @returns Promise com array de todos os alunos
   * @throws Erro em caso de falha na comunicação com a API
   */
  getAll: async (): Promise<Aluno[]> => {
    try {
      const response = await api.get('/alunos');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      throw error;
    }
  },

  /**
   * Obtém um aluno específico pelo seu ID
   * 
   * @param id - ID único do aluno a ser buscado
   * @returns Promise com os dados do aluno
   * @throws Erro em caso de falha na comunicação com a API ou aluno não encontrado
   */
  getById: async (id: number): Promise<Aluno> => {
    try {
      const response = await api.get(`/alunos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar aluno com ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Cria um novo aluno no sistema
   * 
   * @param aluno - Dados do aluno a ser criado (sem o ID, que será gerado pelo backend)
   * @returns Promise com os dados do aluno criado, incluindo o ID gerado
   * @throws Erro em caso de falha na comunicação com a API ou dados inválidos
   */
  create: async (aluno: Omit<Aluno, 'id'>): Promise<Aluno> => {
    try {
      const response = await api.post('/alunos', aluno);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar aluno:', error);
      throw error;
    }
  },

  /**
   * Atualiza os dados de um aluno existente
   * 
   * @param id - ID do aluno a ser atualizado
   * @param aluno - Dados parciais ou completos do aluno para atualização
   * @returns Promise com os dados atualizados do aluno
   * @throws Erro em caso de falha na comunicação com a API, aluno não encontrado ou dados inválidos
   */
  update: async (id: number, aluno: Partial<Aluno>): Promise<Aluno> => {
    try {
      const response = await api.put(`/alunos/${id}`, aluno);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar aluno com ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Remove um aluno do sistema
   * 
   * @param id - ID do aluno a ser excluído
   * @throws Erro em caso de falha na comunicação com a API ou aluno não encontrado
   */
  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/alunos/${id}`);
    } catch (error) {
      console.error(`Erro ao excluir aluno com ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Busca alunos por termo em seus dados (nome, email, etc)
   * 
   * @param termo - Termo de busca para filtrar alunos
   * @returns Promise com array de alunos que correspondem ao termo
   * @throws Erro em caso de falha na comunicação com a API
   */
  search: async (termo: string): Promise<Aluno[]> => {
    try {
      const response = await api.get(`/alunos/search?termo=${termo}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar alunos com termo "${termo}":`, error);
      throw error;
    }
  },

  /**
   * Filtra alunos por disciplina específica
   * 
   * @param disciplinaId - ID da disciplina para filtrar alunos
   * @returns Promise com array de alunos matriculados na disciplina
   * @throws Erro em caso de falha na comunicação com a API
   */
  filterByDisciplina: async (disciplinaId: number): Promise<Aluno[]> => {
    try {
      const response = await api.get(`/alunos/disciplina/${disciplinaId}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao filtrar alunos por disciplina ${disciplinaId}:`, error);
      throw error;
    }
  },

  /**
   * Filtra alunos por escola específica
   * 
   * @param escolaId - ID da escola para filtrar alunos
   * @returns Promise com array de alunos matriculados na escola
   * @throws Erro em caso de falha na comunicação com a API
   */
  filterByEscola: async (escolaId: number): Promise<Aluno[]> => {
    try {
      const response = await api.get(`/alunos/escola/${escolaId}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao filtrar alunos por escola ${escolaId}:`, error);
      throw error;
    }
  },

  /**
   * Obtém aulas programadas para um aluno específico
   * 
   * @param alunoId - ID do aluno para consultar aulas
   * @returns Promise com array de aulas do aluno
   * @throws Erro em caso de falha na comunicação com a API
   */
  getAulas: async (alunoId: number): Promise<any[]> => {
    try {
      const response = await api.get(`/alunos/${alunoId}/aulas`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar aulas do aluno ${alunoId}:`, error);
      throw error;
    }
  },

  /**
   * Obtém relatório PDF sobre um aluno específico
   * 
   * @param alunoId - ID do aluno para gerar PDF
   * @returns Promise com blob do PDF gerado
   * @throws Erro em caso de falha na comunicação com a API
   */
  getPdf: async (alunoId: number): Promise<Blob> => {
    try {
      const response = await api.get(`/alunos/${alunoId}/pdf`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar PDF do aluno ${alunoId}:`, error);
      throw error;
    }
  },
};

/**
 * Serviços para gerenciamento de disciplinas
 * 
 * Contém métodos para consultas relacionadas a disciplinas no sistema.
 */
export const disciplinasService = {
  /**
   * Obtém a lista de todas as disciplinas cadastradas
   * 
   * @returns Promise com array de todas as disciplinas
   * @throws Erro em caso de falha na comunicação com a API
   */
  getAll: async () => {
    try {
      const response = await api.get('/disciplinas');
      // Garantir que o retorno é sempre um array
      if (Array.isArray(response.data)) {
        return response.data;
      }
      console.warn('API disciplinas não retornou um array:', response.data);
      return [];
    } catch (error) {
      console.error('Erro ao buscar disciplinas:', error);
      // No caso de erro, retornamos um array vazio em vez de propagar o erro
      return [];
    }
  },
};

/**
 * Serviços para gerenciamento de escolas
 * 
 * Contém métodos para consultas relacionadas a escolas no sistema.
 */
export const escolasService = {
  /**
   * Obtém a lista de todas as escolas cadastradas
   * 
   * @returns Promise com array de todas as escolas
   * @throws Erro em caso de falha na comunicação com a API
   */
  getAll: async () => {
    try {
      const response = await api.get('/escolas');
      // Garantir que o retorno é sempre um array
      if (Array.isArray(response.data)) {
        return response.data;
      }
      console.warn('API escolas não retornou um array:', response.data);
      return [];
    } catch (error) {
      console.error('Erro ao buscar escolas:', error);
      // No caso de erro, retornamos um array vazio em vez de propagar o erro
      return [];
    }
  },
};

export default api; 