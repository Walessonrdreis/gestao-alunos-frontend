/**
 * Componente de visualização de PDF para exibir agenda do aluno
 * 
 * Este componente exibe as aulas agendadas para um aluno 
 * em formato de agenda e permite a impressão do documento.
 * É uma reimplementação em React/TypeScript do componente original em JavaScript.
 * 
 * @module PdfViewer
 */
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './PdfViewer.css';
import logoDefault from '../../assets/logos/logo.png';

/**
 * Interface para os dados de uma aula
 */
export interface Aula {
  /** Identificador único da aula */
  id: number;
  /** Data da aula no formato YYYY-MM-DD */
  data_aula: string;
  /** Horário da aula no formato HH:MM */
  horario: string;
  /** Nome da disciplina */
  disciplina_nome: string;
  /** Nome do professor */
  professor_nome?: string;
}

/**
 * Interface para os dados do aluno
 */
export interface Aluno {
  /** Identificador único do aluno */
  id: number;
  /** Nome completo do aluno */
  nome: string;
  /** Número de matrícula do aluno */
  matricula: string;
  /** Caminho para o logo da escola (opcional) */
  escola_logo?: string;
  /** Nome da escola (opcional) */
  escola_nome?: string;
}

/**
 * Propriedades do componente PdfViewer
 */
interface PdfViewerProps {
  /** ID do aluno para carregar dados, se não fornecido diretamente */
  alunoId?: number;
  /** Dados do aluno (opcional, pode ser carregado pelo ID) */
  aluno?: Aluno;
  /** Lista de aulas do aluno (opcional, pode ser carregada pelo ID) */
  aulas?: Aula[];
  /** Controla se o modal está aberto */
  isOpen: boolean;
  /** Callback para fechar o modal */
  onClose: () => void;
}

/**
 * Componente para visualização e impressão da agenda do aluno
 * 
 * @param props - Propriedades do componente
 * @returns Componente React
 */
const PdfViewer: React.FC<PdfViewerProps> = ({
  alunoId,
  aluno: propAluno,
  aulas: propAulas,
  isOpen,
  onClose
}) => {
  const [aluno, setAluno] = useState<Aluno | null>(propAluno || null);
  const [aulas, setAulas] = useState<Aula[]>(propAulas || []);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Logging para depuração
  useEffect(() => {
    console.log('PdfViewer - Estado do modal:', isOpen ? 'Aberto' : 'Fechado');
    console.log('PdfViewer - ID do aluno:', alunoId);
  }, [isOpen, alunoId]);

  // Atualiza os estados quando as props mudam
  useEffect(() => {
    if (propAluno) {
      setAluno(propAluno);
    }
    if (propAulas) {
      setAulas(propAulas);
    }
  }, [propAluno, propAulas]);

  // Carrega dados do aluno se necessário
  useEffect(() => {
    if (isOpen && alunoId && !aluno) {
      console.log('PdfViewer - Carregando dados do aluno ID:', alunoId);
      carregarDadosAluno(alunoId);
    }
  }, [isOpen, alunoId, aluno]);

  /**
   * Carrega os dados do aluno e suas aulas do servidor
   * @param id - ID do aluno
   */
  const carregarDadosAluno = async (id: number) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('PdfViewer - Iniciando carregamento de dados para o aluno ID:', id);
      // Adicionando timestamp para evitar cache
      const timestamp = new Date().getTime();
      
      // Em ambiente de desenvolvimento, usamos dados simulados
      if (process.env.NODE_ENV === 'development') {
        // Simulando uma chamada de API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const dadosAluno: Aluno = {
          id,
          nome: 'Maria Silva',
          matricula: `A${id.toString().padStart(5, '0')}`,
          escola_logo: 'logo.png',
          escola_nome: 'Escola de Música Tutti Sonora'
        };
        
        const dadosAulas: Aula[] = [
          {
            id: 1,
            data_aula: '2023-03-15',
            horario: '14:30',
            disciplina_nome: 'PIANO CLÁSSICO',
            professor_nome: 'Avyen Aramás Melgaço'
          },
          {
            id: 2,
            data_aula: '2023-03-22',
            horario: '14:30',
            disciplina_nome: 'PIANO CLÁSSICO',
            professor_nome: 'Avyen Aramás Melgaço'
          },
          {
            id: 3,
            data_aula: '2023-03-29',
            horario: '14:30',
            disciplina_nome: 'PIANO CLÁSSICO',
            professor_nome: 'Avyen Aramás Melgaço'
          }
        ];
        
        console.log('PdfViewer - Dados do aluno carregados (mock):', dadosAluno);
        console.log('PdfViewer - Aulas carregadas (mock):', dadosAulas);

        setAluno(dadosAluno);
        setAulas(dadosAulas);
      } else {
        // Implementação para ambiente de produção
        console.log('PdfViewer - Carregando dados da API para o aluno ID:', id);
        // Primeiro busca os dados do aluno
        const responseAluno = await fetch(`/api/buscar-aluno.php?id=${id}&_=${timestamp}`);
        const dataAluno = await responseAluno.json();
        
        if (!dataAluno.success) {
          throw new Error(dataAluno.message || 'Erro ao carregar dados do aluno');
        }
        
        setAluno(dataAluno.data.aluno);
        console.log('PdfViewer - Dados do aluno carregados da API:', dataAluno.data.aluno);
        
        // Em seguida, busca as aulas do aluno
        const responseAulas = await fetch(`/api/buscar-aulas.php?aluno_id=${id}&_=${timestamp}`);
        const dataAulas = await responseAulas.json();
        
        if (!dataAulas.success) {
          throw new Error(dataAulas.message || 'Erro ao carregar aulas');
        }
        
        setAulas(dataAulas.data.aulas);
        console.log('PdfViewer - Aulas carregadas da API:', dataAulas.data.aulas);
      }
    } catch (err) {
      console.error('PdfViewer - Erro ao carregar dados:', err);
      setError(`Erro ao carregar dados: ${err instanceof Error ? err.message : 'Erro desconhecido'}`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Formata a data para o formato DD-MMM-YY
   * @param dataString - Data no formato YYYY-MM-DD
   * @returns Data formatada
   */
  const formatarData = (dataString: string): string => {
    try {
      const [ano, mes, dia] = dataString.split('-');
      const data = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
      
      const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
      
      const diaFormatado = data.getDate().toString().padStart(2, '0');
      const mesFormatado = meses[data.getMonth()];
      const anoFormatado = data.getFullYear().toString().slice(-2);
      
      return `${diaFormatado}-${mesFormatado}-${anoFormatado}`;
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return 'Data inválida';
    }
  };

  /**
   * Formata o dia da semana com base na data
   * @param dataString - Data no formato YYYY-MM-DD
   * @returns Nome do dia da semana
   */
  const formatarDiaSemana = (dataString: string): string => {
    try {
      const [ano, mes, dia] = dataString.split('-');
      const data = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
      
      const diasSemana = [
        'domingo',
        'segunda-feira',
        'terça-feira',
        'quarta-feira',
        'quinta-feira',
        'sexta-feira',
        'sábado'
      ];
      
      return diasSemana[data.getDay()];
    } catch (error) {
      console.error('Erro ao formatar dia da semana:', error);
      return 'Dia inválido';
    }
  };

  /**
   * Manipula a ação de impressão
   */
  const handlePrint = () => {
    console.log('PdfViewer - Iniciando impressão');
    window.print();
  };

  /**
   * Obtém o caminho para o logo da escola
   * @returns URL do logo ou logo padrão
   */
  const getEscolaLogo = (): string => {
    // Se não tiver logo, usa o logo padrão
    if (!aluno?.escola_logo) return logoDefault;
    
    try {
      // Em produção, seria o caminho para o logo na API
      if (process.env.NODE_ENV !== 'development') {
        return `/uploads/logos/${aluno.escola_logo}`;
      }
      
      // Em desenvolvimento, tenta usar logo local
      return require(`../../assets/logos/${aluno.escola_logo}`);
    } catch (e) {
      // Fallback para o logo padrão
      console.warn('PdfViewer - Erro ao carregar logo da escola, usando padrão:', e);
      return logoDefault;
    }
  };

  /**
   * Manipula o download do PDF
   * Esta função seria implementada integrando uma biblioteca como jsPDF
   */
  const handleDownload = () => {
    console.log('PdfViewer - Iniciando download do PDF (não implementado)');
    // Futura implementação para download do PDF
    // Pode-se usar bibliotecas como jsPDF ou html2pdf
    alert('Funcionalidade de download em implementação');
  };

  // Manipula o fechamento do modal
  const handleClose = () => {
    console.log('PdfViewer - Fechando modal');
    onClose();
  };

  console.log('PdfViewer - Renderizando com isOpen =', isOpen);

  return (
    <Modal 
      show={isOpen} 
      onHide={handleClose} 
      size="xl" 
      className="pdf-modal"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Agenda do Aluno</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pdf-modal-body">
        {loading ? (
          <div className="text-center p-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="mt-3">Carregando dados, aguarde...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <div className="pdf-viewer">
            <div className="pdf-header">
              <img 
                src={getEscolaLogo()} 
                alt="Logo da Escola" 
                className="escola-logo" 
              />
              <div className="header-text">
                <h1>{aluno?.escola_nome || 'Escola de Música Tutti Sonora'}</h1>
                <h2>IASD Central Taguatinga</h2>
              </div>
            </div>
            <div className="pdf-content">
              <div className="agenda-header">
                <div className="agenda-info">
                  <span>Agenda do(a) aluno(a): </span>
                  <span className="aluno-nome">{aluno?.nome || 'Aluno não encontrado'}</span>
                </div>
                <div className="matricula-info">
                  <span>Matrícula: </span>
                  <span className="aluno-matricula">{aluno?.matricula || 'N/A'}</span>
                </div>
              </div>
              <table className="aulas-table">
                <thead>
                  <tr>
                    <th>Aula</th>
                    <th>Data</th>
                    <th>Dia</th>
                    <th>Hora</th>
                    <th>Professora</th>
                    <th>Instrumento</th>
                    <th>Assinatura Prof.ª / Aluno(a)</th>
                  </tr>
                </thead>
                <tbody>
                  {aulas.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center">Nenhuma aula agendada</td>
                    </tr>
                  ) : (
                    aulas.map((aula, index) => (
                      <tr key={aula.id}>
                        <td>{index + 1}</td>
                        <td>{formatarData(aula.data_aula)}</td>
                        <td>{formatarDiaSemana(aula.data_aula)}</td>
                        <td>{aula.horario}</td>
                        <td>{aula.professor_nome || 'Avyen Aramás Melgaço'}</td>
                        <td>{aula.disciplina_nome || 'PIANO CLÁSSICO'}</td>
                        <td></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="pdf-actions">
              <Button 
                variant="primary" 
                className="btn-imprimir" 
                onClick={handlePrint}
              >
                <i className="fas fa-print"></i>
                Imprimir Agenda
              </Button>
              <Button 
                variant="secondary" 
                className="btn-download ms-2" 
                onClick={handleDownload}
              >
                <i className="fas fa-download"></i>
                Baixar PDF
              </Button>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PdfViewer; 