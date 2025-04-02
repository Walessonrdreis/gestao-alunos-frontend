import api from './api';

interface Disciplina {
  id?: number;
  nome: string;
  descricao?: string;
  icone?: string;
}

/**
 * Serviço para gerenciar as disciplinas na API
 */
const disciplinasService = {
  /**
   * Lista todas as disciplinas
   * @returns Lista de disciplinas
   */
  async listar() {
    try {
      // ADICIONAR A ROTA DA API AQUI
      const response = await api.get('/disciplinas');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar disciplinas:', error);
      throw error;
    }
  },

  /**
   * Busca uma disciplina pelo ID
   * @param id ID da disciplina
   * @returns Dados da disciplina
   */
  async buscarPorId(id: number) {
    try {
      // ADICIONAR A ROTA DA API AQUI
      const response = await api.get(`/disciplinas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar disciplina com ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Cadastra uma nova disciplina
   * @param disciplina Dados da disciplina a ser cadastrada
   * @returns Dados da disciplina cadastrada
   */
  async cadastrar(disciplina: Disciplina) {
    try {
      // ADICIONAR A ROTA DA API AQUI
      const response = await api.post('/disciplinas', disciplina);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar disciplina:', error);
      throw error;
    }
  },

  /**
   * Atualiza os dados de uma disciplina
   * @param id ID da disciplina
   * @param disciplina Dados atualizados da disciplina
   * @returns Dados da disciplina atualizada
   */
  async atualizar(id: number, disciplina: Disciplina) {
    try {
      // ADICIONAR A ROTA DA API AQUI
      const response = await api.put(`/disciplinas/${id}`, disciplina);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar disciplina com ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Exclui uma disciplina
   * @param id ID da disciplina a ser excluída
   * @returns Confirmação da exclusão
   */
  async excluir(id: number) {
    try {
      // ADICIONAR A ROTA DA API AQUI
      const response = await api.delete(`/disciplinas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao excluir disciplina com ID ${id}:`, error);
      throw error;
    }
  }
};

export default disciplinasService; 