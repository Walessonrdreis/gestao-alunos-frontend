import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Aluno } from '../components/ui/AlunoCard/AlunoCard';
import { disciplinasService, escolasService, alunosService } from '../services/api';
import { validateForm, ValidationRules } from '../utils/validations';

export type DateTimeMap = Map<string, string>;

/**
 * Interface para representar uma aula
 */
interface Aula {
  data: string;
  horario: string;
  disciplina_id: number | null;
}

/**
 * Interface que define a estrutura dos dados do formulário de alunos
 */
interface AlunoFormData {
  nome: string;
  email: string;
  telefone: string;
  escola: string;
  escolaId: number | null;
  disciplinas: number[];
  matricula: string;
  aulas: Aula[]; // Novo campo para armazenar as aulas agendadas
}

/**
 * Interface para definir os tipos de erros nos campos do formulário
 */
interface FieldErrors {
  [key: string]: string;
}

/**
 * Interface para definir o retorno do hook useAlunoForm
 */
interface UseAlunoFormReturn {
  formData: AlunoFormData;
  disciplinas: any[];
  escolas: any[];
  loading: boolean;
  submitting: boolean;
  error: string;
  success: string;
  fieldErrors: FieldErrors;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleEscolaChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleDisciplinasChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleSubmit: (e: FormEvent) => void;
  handleCancel: () => void;
  handleDelete: () => void;
  setError: (message: string) => void;
  setSuccess: (message: string) => void;
  handleDateSelect: (selectedDates: DateTimeMap) => void;
}

/**
 * Hook personalizado para gerenciar o formulário de alunos
 */
export function useAlunoForm(id?: string): UseAlunoFormReturn {
  // Navegação
  const navigate = useNavigate();
  
  // Estados
  const [formData, setFormData] = useState<AlunoFormData>({
    nome: '',
    email: '',
    telefone: '',
    escola: '',
    escolaId: null,
    disciplinas: [],
    matricula: '',
    aulas: [], // Inicializando o array de aulas vazio
  });
  
  const [disciplinas, setDisciplinas] = useState<any[]>([]);
  const [escolas, setEscolas] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(!!id);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  /**
   * Carrega os dados de disciplinas e escolas ao montar o componente
   */
  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        const data = await disciplinasService.listar();
        if (Array.isArray(data)) {
          setDisciplinas(data);
        } else {
          console.warn('Formato inesperado de dados de disciplinas:', data);
          setDisciplinas([]);
        }
      } catch (err) {
        console.error('Erro ao carregar disciplinas:', err);
        setDisciplinas([]);
      }
    };

    const fetchEscolas = async () => {
      try {
        const data = await escolasService.listar();
        if (Array.isArray(data)) {
          setEscolas(data);
        } else {
          console.warn('Formato inesperado de dados de escolas:', data);
          setEscolas([]);
        }
      } catch (err) {
        console.error('Erro ao carregar escolas:', err);
        setEscolas([]);
      }
    };

    fetchDisciplinas();
    fetchEscolas();
  }, []);

  /**
   * Carrega os dados do aluno se estiver no modo de edição
   */
  useEffect(() => {
    if (!id) return;

    const fetchAluno = async () => {
      try {
        setLoading(true);
        console.log('useAlunoForm - Carregando dados do aluno ID:', id);
        
        // Em desenvolvimento, usamos dados simulados
        if (process.env.NODE_ENV === 'development') {
          // Simulando tempo de carregamento
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Dados simulados de exemplo
          const alunoMock = {
            id: parseInt(id),
            nome: `Aluno Exemplo ${id}`,
            email: `aluno${id}@exemplo.com`,
            telefone: `(11) 98765-432${id.slice(-1)}`,
            escola: 'Escola Municipal João Pedro',
            escolaId: 1,
            disciplinas: [1, 2], // IDs das disciplinas
            matricula: `A${id.padStart(5, '0')}`,
            aulas: [
              {
                data: '2023-05-15',
                horario: '14:30',
                disciplina_id: 1
              },
              {
                data: '2023-05-22',
                horario: '14:30',
                disciplina_id: 1
              }
            ]
          };
          
          console.log('useAlunoForm - Dados do aluno carregados (mock):', alunoMock);
          setFormData(alunoMock);
          setSuccess('Dados do aluno carregados com sucesso!');
        } else {
          // Código para produção - fazer chamada à API real
          const data = await alunosService.buscarPorId(parseInt(id));
          
          if (data) {
            setFormData({
              nome: data.nome || '',
              email: data.email || '',
              telefone: data.telefone || '',
              escola: data.escola || '',
              escolaId: data.escolaId || null,
              disciplinas: Array.isArray(data.disciplinas) 
                ? data.disciplinas.map((d: any) => d.id) 
                : [],
              matricula: data.matricula || '',
              aulas: data.aulas || [], // Carregando as aulas do aluno
            });
            setSuccess('Dados do aluno carregados com sucesso!');
          }
        }
      } catch (err) {
        console.error('useAlunoForm - Erro ao carregar dados do aluno:', err);
        setError('Não foi possível carregar os dados do aluno. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchAluno();
  }, [id]);

  /**
   * Manipula a mudança nos campos de entrada
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpa erro do campo quando o usuário começa a editar
    clearFieldError(name);
  };

  /**
   * Manipula a seleção da escola
   */
  const handleEscolaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const escolaId = value ? parseInt(value) : null;
    const escolaNome = escolaId 
      ? escolas.find(e => e.id === escolaId)?.nome || ''
      : '';

    setFormData(prev => ({
      ...prev,
      escolaId,
      escola: escolaNome
    }));

    clearFieldError('escola');
  };

  /**
   * Manipula a seleção de disciplinas
   */
  const handleDisciplinasChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions);
    const selectedIds = options.map(option => parseInt(option.value));

    setFormData(prev => ({
      ...prev,
      disciplinas: selectedIds
    }));

    clearFieldError('disciplinas');
  };

  /**
   * Manipula a seleção de datas no calendário
   */
  const handleDateSelect = (selectedDates: DateTimeMap) => {
    // Converte o Map de datas selecionadas para um array de objetos Aula
    const aulas: Aula[] = Array.from(selectedDates.entries()).map(([dateStr, time]) => {
      // Usa a primeira disciplina selecionada para a aula
      const disciplinaId = formData.disciplinas.length > 0 ? formData.disciplinas[0] : null;
      
      return {
        data: dateStr,
        horario: time,
        disciplina_id: disciplinaId
      };
    });

    setFormData(prev => ({
      ...prev,
      aulas
    }));
  };

  /**
   * Valida o formulário antes de enviar
   */
  const validateFormData = (): boolean => {
    // Define regras de validação para cada campo
    const validationRules = {
      nome: [ValidationRules.required('Nome'), ValidationRules.maxLength(100, 'Nome')],
      email: [ValidationRules.email()],
      telefone: [ValidationRules.telefone()],
      matricula: [ValidationRules.maxLength(20, 'Matrícula')]
    };

    // Executa a validação
    const errors = validateForm(formData, validationRules);
    
    // Atualiza estado com erros
    setFieldErrors(errors);
    
    // Retorna resultado da validação
    return Object.keys(errors).length === 0;
  };

  /**
   * Limpa o erro de um campo específico
   */
  const clearFieldError = (fieldName: string) => {
    if (fieldErrors[fieldName]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  /**
   * Prepara o objeto de dados do aluno para envio à API
   */
  const prepareAlunoData = () => {
    return {
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      escola: formData.escola,
      escolaId: formData.escolaId,
      matricula: formData.matricula,
      disciplinas: formData.disciplinas.map(id => {
        const disciplina = disciplinas.find(d => d.id === id);
        return { id, nome: disciplina?.nome || '' };
      }),
      aulas: formData.aulas // Incluindo as aulas no objeto enviado à API
    };
  };

  /**
   * Envia o formulário
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Limpa mensagens
    setError('');
    setSuccess('');
    
    // Valida o formulário
    if (!validateFormData()) {
      setError('Por favor, corrija os erros no formulário antes de continuar.');
      return;
    }
    
    setSubmitting(true);
    
    try {
      const alunoData = prepareAlunoData();
      
      if (id) {
        // Atualiza aluno existente
        await alunosService.atualizar(parseInt(id), alunoData);
        setSuccess('Aluno atualizado com sucesso!');
      } else {
        // Cria novo aluno
        await alunosService.cadastrar(alunoData);
        setSuccess('Aluno cadastrado com sucesso!');
        
        // Limpa formulário após cadastro
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          escola: '',
          escolaId: null,
          disciplinas: [],
          matricula: '',
          aulas: [],
        });
      }
      
      // Redireciona após um breve atraso
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err: any) {
      console.error('Erro ao processar o formulário:', err);
      setError(err.message || 'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Cancela a operação e volta para a página anterior
   */
  const handleCancel = () => {
    navigate('/dashboard');
  };

  /**
   * Exclui o aluno
   */
  const handleDelete = () => {
    if (!id) return;
    
    if (window.confirm('Tem certeza que deseja excluir este aluno? Esta ação não pode ser desfeita.')) {
      setSubmitting(true);
      
      // Em produção, faria uma chamada para a API
      setTimeout(async () => {
        try {
          if (process.env.NODE_ENV === 'development') {
            // Em desenvolvimento, apenas simula a exclusão
            console.log('Simulando exclusão do aluno ID:', id);
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setSuccess('Aluno excluído com sucesso!');
            setTimeout(() => {
              navigate('/alunos');
            }, 1500);
          } else {
            // Em produção, faria uma chamada para a API
            await alunosService.excluir(parseInt(id));
            setSuccess('Aluno excluído com sucesso!');
            setTimeout(() => {
              navigate('/alunos');
            }, 1500);
          }
        } catch (err) {
          console.error('Erro ao excluir aluno:', err);
          setError('Erro ao excluir aluno. Por favor, tente novamente.');
        } finally {
          setSubmitting(false);
        }
      }, 500);
    }
  };

  return {
    formData,
    disciplinas,
    escolas,
    loading,
    submitting,
    error,
    success,
    fieldErrors,
    handleInputChange,
    handleEscolaChange,
    handleDisciplinasChange,
    handleSubmit,
    handleCancel,
    handleDelete,
    setError,
    setSuccess,
    handleDateSelect
  };
}