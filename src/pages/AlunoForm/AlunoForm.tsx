import { useParams } from 'react-router-dom';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Form, 
  Button, 
  Spinner,
  InputGroup,
  ListGroup
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useAlunoForm } from '../../hooks/useAlunoForm';
import Alert from '../../components/ui/Alert/Alert';
import Calendar from '../../components/Calendar/Calendar';
import styles from './AlunoForm.module.css';

/**
 * Componente para criação e edição de alunos
 * 
 * Permite cadastrar um novo aluno ou editar um aluno existente,
 * gerenciando campos como nome, email, telefone,
 * escola e disciplinas associadas.
 */
const AlunoForm: React.FC = () => {
  // Parâmetros
  const { id } = useParams<{ id: string }>();
  
  // Estados locais para configuração de horário padrão
  const [defaultTime, setDefaultTime] = useState<string>("09:00");
  const [useDefaultTime, setUseDefaultTime] = useState<boolean>(false);

  // Hooks
  const { 
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
    setError,
    setSuccess,
    handleDateSelect,
    handleDelete
  } = useAlunoForm(id);

  // Carregar dados de exemplo se estiver em desenvolvimento
  useEffect(() => {
    // Isso será substituído por dados reais da API em produção
    if (disciplinas.length === 0 && process.env.NODE_ENV === 'development') {
      // ADICIONAR A ROTA DA API AQUI QUANDO DISPONÍVEL
      console.log('Carregando dados de exemplo para disciplinas em ambiente de desenvolvimento');
    }
    
    if (escolas.length === 0 && process.env.NODE_ENV === 'development') {
      // ADICIONAR A ROTA DA API AQUI QUANDO DISPONÍVEL
      console.log('Carregando dados de exemplo para escolas em ambiente de desenvolvimento');
    }
  }, [disciplinas.length, escolas.length]);

  // Derivações
  const isEditMode = !!id;
  const pageTitle = isEditMode ? 'Editar Aluno' : 'Cadastrar Novo Aluno';
  const pageDescription = isEditMode 
    ? 'Atualize as informações do aluno no formulário abaixo.' 
    : 'Preencha os dados do novo aluno no formulário abaixo.';
  const submitButtonText = isEditMode ? 'Salvar Alterações' : 'Cadastrar Aluno';
  const loadingButtonText = isEditMode ? 'Salvando...' : 'Cadastrando...';

  // Manipulador para mudança no horário padrão
  const handleDefaultTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDefaultTime(e.target.value);
  };

  // Manipulador para toggle de uso do horário padrão
  const handleUseDefaultTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUseDefaultTime(e.target.checked);
  };

  // Formatação e validação de telefone
  const formatTelefone = (value: string): string => {
    // Remove tudo que não for número
    const onlyNums = value.replace(/\D/g, '');
    
    if (onlyNums.length <= 2) {
      return onlyNums;
    } 
    if (onlyNums.length <= 6) {
      return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2)}`;
    }
    if (onlyNums.length <= 10) {
      return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 6)}-${onlyNums.slice(6)}`;
    }
    // Limita a 11 dígitos (formato completo com DDD)
    return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}-${onlyNums.slice(7, 11)}`;
  };

  // Handler para o campo de telefone com formatação
  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatTelefone(e.target.value);
    e.target.value = formattedValue;
    handleInputChange(e);
  };

  // Renderização condicional - loading state
  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner 
          animation="border" 
          role="status" 
          variant="primary"
          aria-label="Carregando dados do aluno"
        >
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
        <p className="mt-3">Carregando dados...</p>
      </Container>
    );
  }

  // Dados de exemplo para ambiente de desenvolvimento
  const sampleDisciplinas = [
    { id: 1, nome: 'Matemática' },
    { id: 2, nome: 'Português' },
    { id: 3, nome: 'História' },
    { id: 4, nome: 'Geografia' },
    { id: 5, nome: 'Ciências' },
    { id: 6, nome: 'Física' },
    { id: 7, nome: 'Química' },
    { id: 8, nome: 'Inglês' }
  ];

  const sampleEscolas = [
    { id: 1, nome: 'Escola Estadual Dr. João Firmino' },
    { id: 2, nome: 'Colégio Santa Mônica' },
    { id: 3, nome: 'Instituto Federal de Educação' },
    { id: 4, nome: 'Escola Municipal Anísio Teixeira' },
    { id: 5, nome: 'Centro Educacional Paulo Freire' }
  ];

  // Usar dados reais ou exemplos
  const displayDisciplinas = disciplinas.length > 0 ? disciplinas : sampleDisciplinas;
  const displayEscolas = escolas.length > 0 ? escolas : sampleEscolas;

  // Função para renderizar mensagens de alerta
  const renderAlertMessages = () => {
    return (
      <>
        {error && (
          <Alert 
            variant="danger" 
            dismissible
            onClose={() => setError('')}
            className="mb-4"
          >
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert 
            variant="success" 
            dismissible
            onClose={() => setSuccess('')}
            className="mb-4"
            autoClose={5000}
          >
            {success}
          </Alert>
        )}
      </>
    );
  };

  // Função para renderizar botões do formulário
  const renderFormButtons = () => {
    return (
      <Row className="mt-4">
        <Col className="d-flex justify-content-between">
          <div>
            <Button 
              variant="secondary" 
              onClick={handleCancel}
              disabled={submitting}
              className={styles.formButton}
            >
              <i className="fas fa-arrow-left me-2" aria-hidden="true"></i>
              {isEditMode ? 'Cancelar' : 'Voltar'}
            </Button>
            
            {isEditMode && (
              <Button 
                variant="danger" 
                onClick={handleDelete}
                disabled={submitting}
                className={`${styles.formButton} ms-2`}
              >
                <i className="fas fa-trash-alt me-2" aria-hidden="true"></i>
                Excluir
              </Button>
            )}
          </div>
          
          <Button 
            variant="primary" 
            type="submit"
            disabled={submitting}
            className={styles.formButton}
          >
            {submitting ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                {loadingButtonText}
              </>
            ) : (
              <>
                <i className="fas fa-save me-2" aria-hidden="true"></i>
                {submitButtonText}
              </>
            )}
          </Button>
        </Col>
      </Row>
    );
  };

  // Renderização principal
  return (
    <Container className={styles.alunoFormContainer}>
      <Row className="mb-4">
        <Col>
          <h2 className={styles.sectionTitle}>
            <i className="fas fa-user-edit me-2" aria-hidden="true"></i>
            {pageTitle}
          </h2>
          <p className="text-muted">
            {pageDescription}
          </p>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className={styles.alunoFormCard}>
            <Card.Body>
              {/* Mensagens de alerta */}
              {renderAlertMessages()}

              <Form 
                onSubmit={handleSubmit} 
                noValidate
                aria-label="Formulário de aluno"
              >
                {/* Primeira linha - Nome */}
                <Row>
                  <Col md={12} className="mb-3">
                    <Form.Group controlId="nome">
                      <Form.Label>
                        Nome <span className="text-danger" aria-hidden="true">*</span>
                        <span className="visually-hidden">(obrigatório)</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        required
                        placeholder="Nome completo do aluno"
                        aria-required="true"
                        isInvalid={!!fieldErrors.nome}
                      />
                      <Form.Control.Feedback type="invalid">
                        {fieldErrors.nome}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Segunda linha - Email e Telefone */}
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email do aluno"
                        isInvalid={!!fieldErrors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {fieldErrors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="telefone">
                      <Form.Label>Telefone</Form.Label>
                      <InputGroup hasValidation>
                        <InputGroup.Text>
                          <i className="fas fa-phone" aria-hidden="true"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="tel"
                          name="telefone"
                          value={formData.telefone}
                          onChange={handleTelefoneChange}
                          placeholder="(00) 00000-0000"
                          isInvalid={!!fieldErrors.telefone}
                          aria-label="Telefone do aluno"
                          maxLength={15}
                        />
                        <Form.Control.Feedback type="invalid">
                          {fieldErrors.telefone}
                        </Form.Control.Feedback>
                      </InputGroup>
                      <Form.Text className="text-muted">
                        Formato: (00) 00000-0000
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Terceira linha - Escola e Disciplinas */}
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="escola">
                      <Form.Label>Escola</Form.Label>
                      <Form.Select
                        name="escola"
                        value={formData.escolaId?.toString() || ''}
                        onChange={handleEscolaChange}
                        aria-label="Selecione uma escola"
                      >
                        <option value="">Selecione uma escola (opcional)</option>
                        {displayEscolas.map(escola => (
                          <option key={escola.id} value={escola.id}>
                            {escola.nome}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="disciplinas">
                      <Form.Label>Disciplinas</Form.Label>
                      <Form.Select
                        multiple
                        name="disciplinas"
                        value={Array.isArray(formData.disciplinas) ? formData.disciplinas.map(id => id.toString()) : []}
                        onChange={handleDisciplinasChange}
                        className={styles.disciplinasSelect}
                        aria-label="Selecione as disciplinas"
                      >
                        {displayDisciplinas.map(disciplina => (
                          <option key={disciplina.id} value={disciplina.id}>
                            {disciplina.nome}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Text className="text-muted">
                        Segure Ctrl (ou Cmd no Mac) para selecionar múltiplas disciplinas.
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Quarta linha - Calendário para seleção de datas e horários */}
                <Row className="mt-4">
                  <Col>
                    <h4 className={styles.sectionSubtitle}>Agendar Aulas</h4>
                    <p className="text-muted">
                      Selecione as datas para agendar as aulas deste aluno. Para cada data, você pode definir um horário.
                    </p>
                  </Col>
                </Row>
                
                <Row>
                  <Col lg={8}>
                    {/* Componente de Calendário */}
                    <Calendar 
                      onSelectDate={handleDateSelect} 
                      defaultTime={defaultTime}
                      useDefaultTime={useDefaultTime}
                    />
                  </Col>
                  
                  <Col lg={4}>
                    <Card className={styles.reviewCard}>
                      <Card.Body>
                        <Card.Title>
                          <i className="fas fa-user me-2"></i>
                          Informações do Aluno
                        </Card.Title>
                        
                        <ListGroup variant="flush" className="mb-4">
                          <ListGroup.Item>
                            <div className={styles.reviewLabel}>
                              <i className="fas fa-user me-2"></i> Nome:
                            </div>
                            <div className={styles.reviewValue}>{formData.nome || 'Não informado'}</div>
                          </ListGroup.Item>
                          
                          <ListGroup.Item>
                            <div className={styles.reviewLabel}>
                              <i className="fas fa-envelope me-2"></i> Email:
                            </div>
                            <div className={styles.reviewValue}>{formData.email || 'Não informado'}</div>
                          </ListGroup.Item>
                          
                          <ListGroup.Item>
                            <div className={styles.reviewLabel}>
                              <i className="fas fa-phone me-2"></i> Telefone:
                            </div>
                            <div className={styles.reviewValue}>{formData.telefone || 'Não informado'}</div>
                          </ListGroup.Item>
                          
                          <ListGroup.Item>
                            <div className={styles.reviewLabel}>
                              <i className="fas fa-school me-2"></i> Escola:
                            </div>
                            <div className={styles.reviewValue}>{formData.escola || 'Não informada'}</div>
                          </ListGroup.Item>
                          
                          <ListGroup.Item>
                            <div className={styles.reviewLabel}>
                              <i className="fas fa-book me-2"></i> Disciplina:
                            </div>
                            <div className={styles.reviewValue}>
                              {formData.disciplinas.length > 0 
                                ? formData.disciplinas.map(id => {
                                    const disciplina = displayDisciplinas.find(d => d.id === id);
                                    return disciplina ? disciplina.nome : '';
                                  }).join(', ')
                                : 'Nenhuma disciplina selecionada'}
                            </div>
                          </ListGroup.Item>
                        </ListGroup>
                        
                        <Card.Title>
                          <i className="fas fa-clock me-2"></i>
                          Horário padrão:
                        </Card.Title>
                        
                        <div className={styles.defaultTimeContainer}>
                          <InputGroup className="mb-3">
                            <Form.Control
                              type="time"
                              value={defaultTime}
                              onChange={handleDefaultTimeChange}
                              aria-label="Horário padrão"
                            />
                            <Button 
                              variant="outline-secondary"
                              disabled={!formData.aulas || formData.aulas.length === 0}
                              onClick={() => setUseDefaultTime(!useDefaultTime)}
                            >
                              Aplicar
                            </Button>
                          </InputGroup>
                          
                          <Form.Check 
                            type="switch"
                            id="use-default-time"
                            label="Usar horário padrão"
                            checked={useDefaultTime}
                            onChange={handleUseDefaultTimeChange}
                            className="mb-3"
                          />
                          
                          <small className="text-muted">
                            Define um horário padrão para todas as aulas. Você ainda pode ajustar horários individualmente.
                          </small>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                {/* Botões de ação */}
                {renderFormButtons()}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AlunoForm; 