/**
 * Componente de listagem e paginação de alunos
 * 
 * Este módulo implementa um componente para exibir uma lista paginada de alunos
 * em formato de cards, oferecendo funcionalidades de filtragem, paginação
 * e interações como visualizar, editar e excluir alunos.
 * 
 * @module AlunosList
 */
import { useState, useEffect } from 'react';
import { Row, Col, Form, InputGroup, Table, Pagination, Spinner, Alert } from 'react-bootstrap';
import AlunoCard, { Aluno } from '../AlunoCard/AlunoCard';
import AlunosListHeader from '../AlunosListHeader/AlunosListHeader';
import styles from './AlunosList.module.css';

/**
 * Propriedades do componente AlunosList
 */
interface AlunosListProps {
  /** Lista de alunos a serem exibidos */
  alunos?: Aluno[];
  /** Lista de disciplinas disponíveis para filtragem */
  disciplinas?: { id: number; nome: string }[];
  /** Lista de escolas disponíveis para filtragem */
  escolas?: { id: number; nome: string }[];
  /** Indica se os dados estão sendo carregados */
  loading?: boolean;
  /** Mensagem de erro, se houver algum problema */
  error?: string | null;
  /** Número de alunos exibidos por página */
  itemsPerPage?: number;
  /** Callback para visualizar aulas de um aluno */
  onVerAulas?: (alunoId: number) => void;
  /** Callback para visualizar PDF de um aluno */
  onVisualizarPDF?: (alunoId: number) => void;
  /** Callback para editar um aluno */
  onEditar?: (alunoId: number) => void;
  /** Callback para excluir um aluno */
  onExcluir?: (alunoId: number) => void;
  /** Callback para buscar alunos por termo */
  onSearch?: (term: string) => void;
  /** Callback para filtrar alunos por disciplina */
  onFilterByDisciplina?: (disciplinaId: number | null) => void;
  /** Callback para filtrar alunos por escola */
  onFilterByEscola?: (escolaId: number | null) => void;
  /** Callback para importar alunos */
  onImportarAlunos?: () => void;
  /** Callback para exportar alunos */
  onExportarAlunos?: () => void;
}

/**
 * Componente para exibir uma lista paginada de alunos com filtros
 * 
 * Exibe uma lista de cards de alunos com suporte para:
 * - Pesquisa por texto
 * - Filtragem por disciplina e escola
 * - Paginação dos resultados
 * - Exibição de estados de carregamento e erro
 * - Ações para cada aluno (ver aulas, visualizar PDF, editar, excluir)
 * 
 * @param props - Propriedades do componente
 * 
 * @example
 * <AlunosList
 *   alunos={alunosList}
 *   disciplinas={disciplinasList}
 *   escolas={escolasList}
 *   onEditar={handleEditarAluno}
 *   onExcluir={handleExcluirAluno}
 *   onSearch={handleSearch}
 * />
 */
const AlunosList = ({
  alunos = [],
  disciplinas = [],
  escolas = [],
  loading = false,
  error = null,
  itemsPerPage = 6,
  onVerAulas,
  onVisualizarPDF,
  onEditar,
  onExcluir,
  onSearch,
  onFilterByDisciplina,
  onFilterByEscola,
  onImportarAlunos,
  onExportarAlunos
}: AlunosListProps) => {
  /** Estado para controlar a página atual */
  const [currentPage, setCurrentPage] = useState(1);
  /** Estado para armazenar alunos após aplicação de filtros */
  const [filteredAlunos, setFilteredAlunos] = useState<Aluno[]>([]);
  /** Estado para armazenar o termo de busca */
  const [searchTerm, setSearchTerm] = useState('');
  /** Estado para armazenar o filtro de disciplina selecionado */
  const [disciplinaFilter, setDisciplinaFilter] = useState<number | null>(null);
  /** Estado para armazenar o filtro de escola selecionado */
  const [escolaFilter, setEscolaFilter] = useState<number | null>(null);

  /** Total de páginas baseado no número de alunos filtrados */
  const totalPages = Math.ceil(filteredAlunos.length / itemsPerPage);

  /**
   * Efeito para filtrar alunos quando filtros ou dados mudam
   * 
   * Aplica os seguintes filtros:
   * - Filtro por termo de busca (nome, matrícula ou escola)
   * - Filtro por disciplina
   * - Filtro por escola
   */
  useEffect(() => {
    let result = [...alunos];

    // Aplicar filtro de pesquisa
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        aluno => 
          aluno.nome.toLowerCase().includes(lowerSearchTerm) ||
          (aluno.matricula && aluno.matricula.toLowerCase().includes(lowerSearchTerm)) ||
          (aluno.escola && aluno.escola.toLowerCase().includes(lowerSearchTerm))
      );
    }

    // Aplicar filtro de disciplina
    if (disciplinaFilter !== null) {
      result = result.filter(
        aluno => 
          aluno.disciplinas && 
          aluno.disciplinas.some(d => d.id === disciplinaFilter)
      );
    }

    // Aplicar filtro de escola
    if (escolaFilter !== null) {
      // Assumindo que cada aluno tem uma propriedade escolaId
      result = result.filter(
        aluno => 'escolaId' in aluno && (aluno as any).escolaId === escolaFilter
      );
    }

    setFilteredAlunos(result);
    // Voltar para a primeira página quando os filtros mudam
    setCurrentPage(1);
  }, [alunos, searchTerm, disciplinaFilter, escolaFilter]);

  /**
   * Manipuladores de eventos para interações do usuário
   */
  
  /**
   * Atualiza o termo de busca e notifica componente pai se necessário
   * 
   * @param term - Termo digitado pelo usuário
   */
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (onSearch) onSearch(term);
  };

  /**
   * Atualiza o filtro de disciplina e notifica componente pai se necessário
   * 
   * @param disciplinaId - ID da disciplina selecionada ou null para limpar filtro
   */
  const handleFilterByDisciplina = (disciplinaId: number | null) => {
    setDisciplinaFilter(disciplinaId);
    if (onFilterByDisciplina) onFilterByDisciplina(disciplinaId);
  };

  /**
   * Atualiza o filtro de escola e notifica componente pai se necessário
   * 
   * @param escolaId - ID da escola selecionada ou null para limpar filtro
   */
  const handleFilterByEscola = (escolaId: number | null) => {
    setEscolaFilter(escolaId);
    if (onFilterByEscola) onFilterByEscola(escolaId);
  };

  /**
   * Atualiza a página atual quando o usuário navega pela paginação
   * 
   * @param page - Número da página selecionada
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculando alunos da página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAlunos = filteredAlunos.slice(indexOfFirstItem, indexOfLastItem);

  // Renderização condicional baseada no estado de carregamento
  if (loading) {
    return (
      <div className={styles.alunosListLoading}>
        <Spinner 
          animation="border" 
          role="status" 
          variant="primary"
        >
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
        <p>Carregando alunos...</p>
      </div>
    );
  }

  // Renderização condicional baseada no estado de erro
  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Erro ao carregar alunos</Alert.Heading>
        <p>{error}</p>
      </Alert>
    );
  }

  return (
    <div className={styles.alunosList}>
      {/* Cabeçalho com filtros e pesquisa */}
      <AlunosListHeader 
        disciplinas={disciplinas}
        escolas={escolas}
        onSearch={handleSearch}
        onFilterByDisciplina={handleFilterByDisciplina}
        onFilterByEscola={handleFilterByEscola}
        onImportarAlunos={onImportarAlunos}
        onExportarAlunos={onExportarAlunos}
      />

      {/* Mensagem quando não há alunos */}
      {filteredAlunos.length === 0 ? (
        <div className={styles.alunosListEmpty}>
          <i className="fas fa-search fa-3x mb-3 text-muted" aria-hidden="true"></i>
          <h3>Nenhum aluno encontrado</h3>
          <p className="text-muted">
            Tente ajustar os filtros ou realizar uma nova pesquisa.
          </p>
        </div>
      ) : (
        <>
          {/* Grid de alunos */}
          <Row className={styles.alunosGrid}>
            {currentAlunos.map(aluno => (
              <Col key={aluno.id} lg={4} md={6} className="mb-4">
                <AlunoCard 
                  aluno={aluno}
                  onVerAulas={onVerAulas ? () => onVerAulas(aluno.id) : undefined}
                  onVisualizarPDF={onVisualizarPDF ? () => onVisualizarPDF(aluno.id) : undefined}
                  onEditar={onEditar ? () => onEditar(aluno.id) : undefined}
                  onExcluir={onExcluir ? () => onExcluir(aluno.id) : undefined}
                />
              </Col>
            ))}
          </Row>

          {/* Controles de paginação */}
          <div className={styles.paginationControls}>
            <Pagination>
              <Pagination.First 
                onClick={() => handlePageChange(1)} 
                disabled={currentPage === 1}
              />
              <Pagination.Prev 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
              />
              
              {Array.from({ length: totalPages }).map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              
              <Pagination.Next 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
              />
              <Pagination.Last 
                onClick={() => handlePageChange(totalPages)} 
                disabled={currentPage === totalPages}
              />
            </Pagination>
            
            <div className={styles.pageInfo}>
              Página <span className={styles.currentPage}>{currentPage}</span> de{' '}
              <span className={styles.totalPages}>{totalPages}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AlunosList; 