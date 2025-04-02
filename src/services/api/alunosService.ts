import api from './api';

interface Aluno {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  escola?: string;
  escolaId?: number | null;
  matricula?: string;
  disciplinas?: Array<{id: number, nome: string}>;
  aulas?: Array<{data: string, horario: string, disciplina_id: number | null}>;
  escola_logo?: string;
}

/**
 * Serviço para gerenciar os alunos na API
 */
const alunosService = {
  /**
   * Lista todos os alunos
   * @returns Lista de alunos
   */
  async listar() {
    try {
      // ADICIONAR A ROTA DA API AQUI
      const response = await api.get('/alunos');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar alunos:', error);
      throw error;
    }
  },

  /**
   * Busca um aluno pelo ID
   * @param id ID do aluno
   * @returns Dados do aluno
   */
  async buscarPorId(id: number) {
    try {
      // ADICIONAR A ROTA DA API AQUI
      const response = await api.get(`/alunos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar aluno com ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Cadastra um novo aluno
   * @param aluno Dados do aluno a ser cadastrado
   * @returns Dados do aluno cadastrado
   */
  async cadastrar(aluno: Aluno) {
    try {
      // ADICIONAR A ROTA DA API AQUI
      const response = await api.post('/alunos', aluno);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar aluno:', error);
      throw error;
    }
  },

  /**
   * Atualiza os dados de um aluno
   * @param id ID do aluno
   * @param aluno Dados atualizados do aluno
   * @returns Dados do aluno atualizado
   */
  async atualizar(id: number, aluno: Aluno) {
    try {
      // ADICIONAR A ROTA DA API AQUI
      const response = await api.put(`/alunos/${id}`, aluno);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar aluno com ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Exclui um aluno
   * @param id ID do aluno a ser excluído
   * @returns Confirmação da exclusão
   */
  async excluir(id: number) {
    try {
      // ADICIONAR A ROTA DA API AQUI
      const response = await api.delete(`/alunos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao excluir aluno com ID ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Busca as aulas de um aluno
   * @param id ID do aluno
   * @returns Lista de aulas do aluno
   */
  async buscarAulas(id: number) {
    try {
      // ADICIONAR A ROTA DA API AQUI
      const response = await api.get(`/alunos/${id}/aulas`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar aulas do aluno com ID ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Gera o PDF da agenda do aluno
   * @param id ID do aluno
   * @returns URL para download do PDF
   */
  async gerarAgendaPdf(id: number) {
    try {
      // ADICIONAR A ROTA DA API AQUI
      // Em produção, em vez de retornar dados, poderia redirecionar para o PDF
      const response = await api.get(`/alunos/${id}/agenda-pdf`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao gerar agenda PDF do aluno com ID ${id}:`, error);
      throw error;
    }
  }
};

export default alunosService; 