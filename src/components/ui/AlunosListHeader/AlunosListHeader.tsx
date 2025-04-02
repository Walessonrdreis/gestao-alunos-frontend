/**
 * Cabeçalho da lista de alunos
 * 
 * Este componente implementa o cabeçalho da lista de alunos,
 * incluindo filtros, pesquisa e controles de paginação.
 * 
 * @module AlunosListHeader
 */
import { useState, useEffect, ChangeEvent } from 'react';
import { Form, InputGroup, Button, Dropdown } from 'react-bootstrap';
import styles from './AlunosListHeader.module.css';

interface AlunosListHeaderProps {
  onSearch: (term: string) => void;
  onFilterByDisciplina?: (disciplinaId: number | null) => void;
  onFilterByEscola?: (escolaId: number | null) => void;
  onImportarAlunos?: () => void;
  onExportarAlunos?: () => void;
  disciplinas?: { id: number; nome: string }[];
  escolas?: { id: number; nome: string }[];
}

/**
 * Componente para o cabeçalho da listagem de alunos com filtros e pesquisa
 */
const AlunosListHeader = ({
  onSearch,
  onFilterByDisciplina,
  onFilterByEscola,
  onImportarAlunos,
  onExportarAlunos,
  disciplinas = [],
  escolas = []
}: AlunosListHeaderProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [disciplinaFilter, setDisciplinaFilter] = useState<number | null>(null);
  const [escolaFilter, setEscolaFilter] = useState<number | null>(null);
  const [searchTimeout, setSearchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  // Efeito para aplicar o termo de pesquisa com debounce
  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Debounce de 300ms para evitar muitas requisições durante a digitação
    const timeout = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    setSearchTimeout(timeout);

    // Limpeza ao desmontar
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTerm, onSearch]);

  // Manipuladores de eventos
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  const handleDisciplinaChange = (disciplinaId: number | null) => {
    setDisciplinaFilter(disciplinaId);
    if (onFilterByDisciplina) {
      onFilterByDisciplina(disciplinaId);
    }
  };

  const handleEscolaChange = (escolaId: number | null) => {
    setEscolaFilter(escolaId);
    if (onFilterByEscola) {
      onFilterByEscola(escolaId);
    }
  };

  return (
    <div className={styles.alunosListHeader}>
      <div className={styles.headerFilters}>
        <InputGroup className={styles.searchContainer}>
          <Form.Control
            type="text"
            placeholder="Pesquisar alunos..."
            value={searchTerm}
            onChange={handleSearchChange}
            aria-label="Pesquisar alunos"
          />
          {searchTerm && (
            <Button 
              variant="outline-secondary" 
              onClick={handleSearchClear}
              title="Limpar pesquisa"
            >
              <i className="fas fa-times"></i>
            </Button>
          )}
          <Button variant="outline-primary" title="Pesquisar">
            <i className="fas fa-search"></i>
          </Button>
        </InputGroup>

        {disciplinas.length > 0 && onFilterByDisciplina && (
          <Dropdown className={styles.filterDropdown}>
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-disciplina">
              <i className="fas fa-book me-2"></i>
              {disciplinaFilter 
                ? `Disciplina: ${disciplinas.find(d => d.id === disciplinaFilter)?.nome}` 
                : 'Todas as Disciplinas'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item 
                onClick={() => handleDisciplinaChange(null)}
                active={disciplinaFilter === null}
              >
                Todas as Disciplinas
              </Dropdown.Item>
              {disciplinas.map(disciplina => (
                <Dropdown.Item 
                  key={disciplina.id}
                  onClick={() => handleDisciplinaChange(disciplina.id)}
                  active={disciplinaFilter === disciplina.id}
                >
                  {disciplina.nome}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}

        {escolas.length > 0 && onFilterByEscola && (
          <Dropdown className={styles.filterDropdown}>
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-escola">
              <i className="fas fa-school me-2"></i>
              {escolaFilter 
                ? `Escola: ${escolas.find(e => e.id === escolaFilter)?.nome}` 
                : 'Todas as Escolas'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item 
                onClick={() => handleEscolaChange(null)}
                active={escolaFilter === null}
              >
                Todas as Escolas
              </Dropdown.Item>
              {escolas.map(escola => (
                <Dropdown.Item 
                  key={escola.id}
                  onClick={() => handleEscolaChange(escola.id)}
                  active={escolaFilter === escola.id}
                >
                  {escola.nome}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>

      <div className={styles.headerActions}>
        {onImportarAlunos && (
          <Button 
            variant="outline-primary" 
            onClick={onImportarAlunos}
            className="me-2"
            title="Importar alunos de arquivo CSV ou Excel"
          >
            <i className="fas fa-file-import me-2"></i>
            Importar
          </Button>
        )}

        {onExportarAlunos && (
          <Button 
            variant="outline-success" 
            onClick={onExportarAlunos}
            title="Exportar lista de alunos para CSV ou Excel"
          >
            <i className="fas fa-file-export me-2"></i>
            Exportar
          </Button>
        )}
      </div>
    </div>
  );
};

export default AlunosListHeader; 