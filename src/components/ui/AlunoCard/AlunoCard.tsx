/**
 * Componente de exibição de informações de aluno
 * 
 * Este módulo define o componente AlunoCard e suas interfaces relacionadas,
 * responsável por exibir informações detalhadas de um aluno em formato de card,
 * incluindo seus dados pessoais, disciplinas e ações disponíveis.
 * 
 * @module AlunoCard
 */
import { useState, useEffect } from 'react';
import { Card, Badge } from 'react-bootstrap';
import ActionButtons from '../ActionButtons/ActionButtons';
import styles from './AlunoCard.module.css';

/**
 * Representa uma disciplina associada a um aluno
 */
export interface Disciplina {
  /** Identificador único da disciplina */
  id: number;
  /** Nome da disciplina */
  nome: string;
}

/**
 * Representa um aluno no sistema
 */
export interface Aluno {
  /** Identificador único do aluno */
  id: number;
  /** Nome completo do aluno */
  nome: string;
  /** Número de matrícula do aluno (opcional) */
  matricula?: string;
  /** Nome da escola onde o aluno está matriculado (opcional) */
  escola?: string;
  /** Número de telefone para contato (opcional) */
  telefone?: string;
  /** Lista de disciplinas nas quais o aluno está matriculado (opcional) */
  disciplinas?: Disciplina[];
  /** Data da próxima aula agendada (opcional) */
  proxima_aula?: string;
  /** Endereço de email do aluno (opcional) */
  email?: string;
}

/**
 * Propriedades do componente AlunoCard
 */
interface AlunoCardProps {
  /** Dados do aluno a ser exibido */
  aluno: Aluno;
  /** Função de callback para visualizar aulas do aluno (opcional) */
  onVerAulas?: (alunoId: number) => void;
  /** Função de callback para visualizar PDF do aluno (opcional) */
  onVisualizarPDF?: (alunoId: number) => void;
  /** Função de callback para editar o aluno (opcional) */
  onEditar?: (alunoId: number) => void;
  /** Função de callback para excluir o aluno (opcional) */
  onExcluir?: (alunoId: number) => void;
}

/**
 * Componente que exibe um card com informações detalhadas de um aluno
 * 
 * Apresenta informações como nome, matrícula, escola, disciplinas e
 * próxima aula agendada. Também oferece botões para ações como ver aulas,
 * visualizar PDF, editar e excluir, dependendo das props fornecidas.
 * 
 * @param props - Propriedades do componente
 * @param props.aluno - Dados do aluno a ser exibido
 * @param props.onVerAulas - Callback opcional para visualizar aulas
 * @param props.onVisualizarPDF - Callback opcional para visualizar PDF
 * @param props.onEditar - Callback opcional para editar aluno
 * @param props.onExcluir - Callback opcional para excluir aluno
 * 
 * @example
 * <AlunoCard 
 *   aluno={alunoData} 
 *   onEditar={handleEditar} 
 *   onExcluir={handleExcluir} 
 * />
 */
const AlunoCard = ({ 
  aluno, 
  onVerAulas, 
  onVisualizarPDF, 
  onEditar,
  onExcluir
}: AlunoCardProps) => {
  /** Estado para controlar a exibição dos botões de ação */
  const [showActions, setShowActions] = useState(false);

  /**
   * Valida se os dados do aluno foram fornecidos corretamente
   */
  useEffect(() => {
    if (!aluno) {
      console.error('Aluno não fornecido para o AlunoCard');
    }
  }, [aluno]);

  /**
   * Formata a data da próxima aula para exibição
   * 
   * @param dataAula - Data da próxima aula em formato string
   * @returns Data formatada para exibição ou mensagem alternativa
   */
  const formatarProximaAula = (dataAula?: string) => {
    if (!dataAula) return 'Não agendada';
    
    try {
      const data = new Date(dataAula);
      return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Data inválida';
    }
  };

  /**
   * Manipuladores de eventos para os botões de ação
   */
  const handleVerAulas = () => {
    if (onVerAulas) onVerAulas(aluno.id);
  };

  const handleVisualizarPDF = () => {
    if (onVisualizarPDF) onVisualizarPDF(aluno.id);
  };

  const handleEditar = () => {
    if (onEditar) onEditar(aluno.id);
  };

  const handleExcluir = () => {
    if (onExcluir) onExcluir(aluno.id);
  };

  return (
    <Card 
      className={`${styles.alunoCard} mb-3`} 
      data-aluno-id={aluno.id}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <Card.Body>
        {/* Informações do aluno */}
        <div className={styles.alunoInfo}>
          <h4 className={styles.alunoNome}>{aluno.nome}</h4>
          <div className={styles.matriculaContainer}>
            <span className={styles.matriculaLabel}>Matrícula:</span>
            <span className={styles.matriculaValor}>{aluno.matricula || 'Não informada'}</span>
          </div>
          <p className={styles.alunoEscola}>
            <i className="fas fa-school me-2" aria-hidden="true"></i>
            {aluno.escola || 'Escola não informada'}
          </p>
          <p className={styles.alunoTelefone}>
            <i className="fas fa-phone me-2" aria-hidden="true"></i>
            {aluno.telefone || 'Telefone não informado'}
          </p>
          <p className={styles.disciplina}>
            <i className="fas fa-book me-2" aria-hidden="true"></i>
            {aluno.disciplinas && aluno.disciplinas.length > 0 
              ? aluno.disciplinas.map(d => d.nome).join(', ') 
              : 'Sem disciplina'}
          </p>
          <p className={styles.proximaAula}>
            <i className="fas fa-calendar me-2" aria-hidden="true"></i>
            Próxima aula: {formatarProximaAula(aluno.proxima_aula)}
          </p>
        </div>
        
        {/* Botões de ação usando o componente ActionButtons */}
        <div className={`${styles.alunoActions} ${showActions ? styles.show : ''}`}>
          <ActionButtons 
            id={aluno.id}
            onView={onVerAulas ? handleVerAulas : undefined}
            onPdf={onVisualizarPDF ? handleVisualizarPDF : undefined}
            onEdit={onEditar ? handleEditar : undefined}
            onDelete={onExcluir ? handleExcluir : undefined}
            showView={!!onVerAulas}
            showPdf={true} /* Sempre mostra o botão de PDF */
            showEdit={!!onEditar}
            showDelete={!!onExcluir}
            size="sm"
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default AlunoCard; 