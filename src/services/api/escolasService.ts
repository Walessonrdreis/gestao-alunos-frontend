import api from './api';

interface Escola {
  id?: number;
  nome: string;
  endereco?: string;
  telefone?: string;
  email?: string;
  website?: string;
  logo?: string;
}

/**
 * Serviço para gerenciar as escolas na API
 */
const escolasService = {
  /**
   * Lista todas as escolas
   * @returns Lista de escolas
   */
  async listar() {
    try {
      // ADICIONAR A ROTA DA API AQUI
      const response = await api.get('/escolas');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar escolas:', error);
      throw error;
    }
  },

  /**
   * Busca uma escola pelo ID
   * @param id ID da escola
   * @returns Dados da escola
   */
  async buscarPorId(id: number) {
    try {
      // ADICIONAR A ROTA DA API AQUI
      const response = await api.get(`/escolas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar escola com ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Cadastra uma nova escola
   * @param escola Dados da escola a ser cadastrada
   * @returns Dados da escola cadastrada
   */
  async cadastrar(escola: Escola) {
    try {
      // ADICIONAR A ROTA DA API AQUI
      const response = await api.post('/escolas', escola);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar escola:', error);
      throw error;
    }
  },

  /**
   * Atualiza os dados de uma escola
   * @param id ID da escola
   * @param escola Dados atualizados da escola
   * @returns Dados da escola atualizada
   */
  async atualizar(id: number, escola: Escola) {
    try {
      // ADICIONAR A ROTA DA API AQUI
      const response = await api.put(`/escolas/${id}`, escola);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar escola com ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Exclui uma escola
   * @param id ID da escola a ser excluída
   * @returns Confirmação da exclusão
   */
  async excluir(id: number) {
    try {
      // ADICIONAR A ROTA DA API AQUI
      const response = await api.delete(`/escolas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao excluir escola com ID ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Upload do logo da escola
   * @param id ID da escola
   * @param logoFile Arquivo de imagem do logo
   * @returns URL do logo salvo
   */
  async uploadLogo(id: number, logoFile: File) {
    try {
      // ADICIONAR A ROTA DA API AQUI
      const formData = new FormData();
      formData.append('logo', logoFile);
      
      const response = await api.post(`/escolas/${id}/logo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error(`Erro ao fazer upload do logo da escola com ID ${id}:`, error);
      throw error;
    }
  }
};

export default escolasService; 