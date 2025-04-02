/**
 * Página de login do sistema de gerenciamento de alunos
 * 
 * Este módulo implementa a página de autenticação que permite
 * aos usuários acessarem o sistema através de suas credenciais.
 * 
 * @module Login
 */
import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/auth.css';

/**
 * Componente de Login
 * 
 * Duplica exatamente o formulário de autenticação do frontend PHP, 
 * com campos para email e senha, e lembrar-me.
 * 
 * @returns Componente React para a página de login
 */
const Login = () => {
  /** Estado para armazenar o email digitado pelo usuário */
  const [email, setEmail] = useState('');
  /** Estado para armazenar a senha digitada pelo usuário */
  const [password, setPassword] = useState('');
  /** Estado para armazenar o estado de lembrar usuário */
  const [rememberMe, setRememberMe] = useState(false);
  /** Estado para armazenar mensagens de erro durante o processo de login */
  const [message, setMessage] = useState({ type: '', text: '' });
  /** Estado para controlar o status de submissão do formulário */
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  /** Hook de autenticação que fornece funções e estado relacionados à autenticação */
  const { isAuthenticated, login } = useAuth();
  
  /**
   * Manipula a submissão do formulário de login
   * 
   * Valida os campos, tenta realizar o login e gerencia os estados
   * de erro e carregamento durante o processo.
   * 
   * @param e - Evento de submissão do formulário
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!email.trim() || !password.trim()) {
      setMessage({
        type: 'danger',
        text: 'Por favor, preencha todos os campos.'
      });
      return;
    }
    
    // Tenta realizar o login
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });
    
    try {
      const result = await login(email, password);
      
      if (result.success) {
        // Login bem-sucedido, o redirecionamento é tratado pelo hook de autenticação
      } else {
        // Login falhou
        setMessage({
          type: 'danger',
          text: result.message
        });
      }
    } catch (error) {
      setMessage({
        type: 'danger',
        text: 'Ocorreu um erro durante o login. Tente novamente mais tarde.'
      });
      console.error('Erro durante o login:', error);
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
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg border-0">
              <div className="card-header bg-primary text-white text-center py-3">
                <h2 className="mb-0"><i className="fas fa-user-lock me-2"></i>Login</h2>
              </div>
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <i className="fas fa-graduation-cap fa-3x text-primary mb-3"></i>
                  <h4 className="fw-bold">Gerenciamento de Alunos</h4>
                  <p className="text-muted">Entre com suas credenciais para acessar o sistema</p>
                </div>
                
                <form onSubmit={handleSubmit}>
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
                  
                  <div className="form-floating mb-3">
                    <input 
                      type="password" 
                      className="form-control" 
                      id="senha" 
                      placeholder="Senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="senha"><i className="fas fa-lock me-2"></i>Senha</label>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="lembrar"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="lembrar">Lembrar-me</label>
                    </div>
                    <Link to="/recuperar-senha" className="text-primary">Esqueceu a senha?</Link>
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
                        Entrando...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-sign-in-alt me-2"></i>Entrar
                      </>
                    )}
                  </button>
                  
                  <div className="text-center">
                    <p className="mb-0">Não tem uma conta? <Link to="/signup" className="text-primary fw-bold">Cadastre-se</Link></p>
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

export default Login; 