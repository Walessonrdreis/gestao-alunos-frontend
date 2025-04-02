/**
 * Página de cadastro do sistema de gerenciamento de alunos
 * 
 * Este módulo implementa a página de cadastro que permite
 * aos usuários se registrarem no sistema.
 * 
 * @module Signup
 */
import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/auth.css';

/**
 * Componente de Cadastro
 * 
 * Duplica exatamente o formulário de cadastro do frontend PHP,
 * com todos os campos e validações.
 * 
 * @returns Componente React para a página de cadastro
 */
const Signup = () => {
  /** Estado para armazenar o nome digitado pelo usuário */
  const [nome, setNome] = useState('');
  /** Estado para armazenar o email digitado pelo usuário */
  const [email, setEmail] = useState('');
  /** Estado para armazenar a senha digitada pelo usuário */
  const [senha, setSenha] = useState('');
  /** Estado para armazenar a confirmação de senha digitada pelo usuário */
  const [confirmarSenha, setConfirmarSenha] = useState('');
  /** Estado para armazenar o telefone digitado pelo usuário */
  const [telefone, setTelefone] = useState('');
  /** Estado para armazenar o perfil selecionado pelo usuário */
  const [perfil, setPerfil] = useState('');
  /** Estado para armazenar se o usuário concordou com os termos */
  const [termos, setTermos] = useState(false);
  /** Estado para armazenar mensagens de erro ou sucesso */
  const [message, setMessage] = useState({ type: '', text: '' });
  /** Estado para controlar o status de submissão do formulário */
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  /** Hook de autenticação que fornece funções e estado relacionados à autenticação */
  const { isAuthenticated, signup } = useAuth();
  /** Hook para navegação */
  const navigate = useNavigate();
  
  /**
   * Formatar telefone com máscara (00) 00000-0000
   * 
   * @param value - Valor do telefone para formatar
   * @returns Telefone formatado
   */
  const formatPhone = (value: string) => {
    if (!value) return '';
    
    // Remove todos os caracteres não numéricos
    const cleaned = value.replace(/\D/g, '');
    
    // Aplica a máscara
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    if (match) {
      let formatted = '';
      if (match[1]) formatted += `(${match[1]}`;
      if (match[2]) formatted += `) ${match[2]}`;
      if (match[3]) formatted += `-${match[3]}`;
      return formatted;
    }
    
    return cleaned;
  };
  
  /**
   * Handler para input de telefone com máscara
   */
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhone(e.target.value);
    setTelefone(formattedValue);
  };
  
  /**
   * Manipula a submissão do formulário de cadastro
   * 
   * Valida os campos, tenta realizar o cadastro e gerencia os estados
   * de erro e carregamento durante o processo.
   * 
   * @param e - Evento de submissão do formulário
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações
    if (!nome || !email || !senha || !confirmarSenha || !perfil) {
      setMessage({
        type: 'danger',
        text: 'Por favor, preencha todos os campos obrigatórios.'
      });
      return;
    }
    
    if (senha !== confirmarSenha) {
      setMessage({
        type: 'danger',
        text: 'As senhas não coincidem.'
      });
      return;
    }
    
    if (!termos) {
      setMessage({
        type: 'danger',
        text: 'Você precisa aceitar os termos de uso e política de privacidade.'
      });
      return;
    }
    
    // Tenta realizar o cadastro
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });
    
    try {
      const result = await signup({ nome, email, senha, telefone, perfil });
      
      if (result.success) {
        setMessage({
          type: 'success',
          text: 'Cadastro realizado com sucesso! Redirecionando para o login...'
        });
        
        // Redireciona para a página de login após um breve delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage({
          type: 'danger',
          text: result.message
        });
      }
    } catch (error) {
      setMessage({
        type: 'danger',
        text: 'Ocorreu um erro durante o cadastro. Tente novamente mais tarde.'
      });
      console.error('Erro durante o cadastro:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Redirecionar se já estiver autenticado
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="bg-light">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100 py-5">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg border-0">
              <div className="card-header bg-primary text-white text-center py-3">
                <h2 className="mb-0"><i className="fas fa-user-plus me-2"></i>Cadastro</h2>
              </div>
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <i className="fas fa-graduation-cap fa-3x text-primary mb-3"></i>
                  <h4 className="fw-bold">Gerenciamento de Alunos</h4>
                  <p className="text-muted">Preencha os dados para criar sua conta</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input 
                          type="text" 
                          className="form-control" 
                          id="nome" 
                          placeholder="Seu nome" 
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          required
                        />
                        <label htmlFor="nome"><i className="fas fa-user me-2"></i>Nome completo</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input 
                          type="email" 
                          className="form-control" 
                          id="email" 
                          placeholder="nome@exemplo.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <label htmlFor="email"><i className="fas fa-envelope me-2"></i>Email</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input 
                          type="password" 
                          className="form-control" 
                          id="senha" 
                          placeholder="Senha" 
                          value={senha}
                          onChange={(e) => setSenha(e.target.value)}
                          required
                        />
                        <label htmlFor="senha"><i className="fas fa-lock me-2"></i>Senha</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input 
                          type="password" 
                          className="form-control" 
                          id="confirmarSenha" 
                          placeholder="Confirmar senha" 
                          value={confirmarSenha}
                          onChange={(e) => setConfirmarSenha(e.target.value)}
                          required
                        />
                        <label htmlFor="confirmarSenha"><i className="fas fa-lock me-2"></i>Confirmar senha</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-floating mb-3">
                    <input 
                      type="tel" 
                      className="form-control" 
                      id="telefone" 
                      placeholder="(00) 00000-0000" 
                      value={telefone}
                      onChange={handlePhoneChange}
                    />
                    <label htmlFor="telefone"><i className="fas fa-phone me-2"></i>Telefone</label>
                  </div>
                  
                  <div className="form-floating mb-4">
                    <select 
                      className="form-select" 
                      id="perfil" 
                      value={perfil}
                      onChange={(e) => setPerfil(e.target.value)}
                      required
                    >
                      <option value="" disabled>Selecione um perfil</option>
                      <option value="professor">Professor</option>
                      <option value="coordenador">Coordenador</option>
                      <option value="administrador">Administrador</option>
                    </select>
                    <label htmlFor="perfil"><i className="fas fa-user-tag me-2"></i>Perfil</label>
                  </div>
                  
                  <div className="form-check mb-4">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="termos"
                      checked={termos}
                      onChange={(e) => setTermos(e.target.checked)}
                      required
                    />
                    <label className="form-check-label" htmlFor="termos">
                      Concordo com os <a href="#" className="text-primary">termos de uso</a> e <a href="#" className="text-primary">política de privacidade</a>
                    </label>
                  </div>
                  
                  {message.text && (
                    <div className={`alert alert-${message.type}`} role="alert">
                      {message.text}
                    </div>
                  )}
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 py-2 mb-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processando...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-user-plus me-2"></i>Cadastrar
                      </>
                    )}
                  </button>
                  
                  <div className="text-center">
                    <p className="mb-0">Já tem uma conta? <Link to="/login" className="text-primary fw-bold">Entrar</Link></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup; 