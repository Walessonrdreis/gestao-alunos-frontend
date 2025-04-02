/**
 * App.tsx - Arquivo principal da aplicação React
 * 
 * Este arquivo duplica exatamente o comportamento do index.php do frontend PHP,
 * incluindo roteamento e proteção de rotas.
 */
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/auth.css';
import './styles/index.css';
import './styles/responsive.css';

// Importação de páginas
import Login from './pages/Login';
import Signup from './pages/Signup';
// Dashboard foi comentado conforme solicitado
// import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import AlunosListPage from './pages/AlunosListPage';
import AlunoForm from './pages/AlunoForm';
import PdfPage from './pages/PdfPage/PdfPage';

// Contexto de autenticação
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Componentes de layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MainContent from './components/layout/MainContent';

// Caminho base da aplicação conforme configurado no vite.config.ts
const BASE_PATH = '/applications/escola';

/**
 * Interface para as propriedades do layout principal
 */
interface ProtectedRouteProps {
  /** Conteúdo a ser renderizado dentro do layout */
  children: React.ReactNode;
}

/**
 * Header comum da aplicação - Duplicado do frontend PHP
 */
const Header = () => {
  const { logout } = useAuth();
  
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
  };
  
  return (
    <header className="bg-primary text-white py-3 shadow-sm">
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    <i className="fas fa-graduation-cap me-2"></i>
                    Gerenciamento de Alunos
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                <i className="fas fa-home me-1"></i> Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/aluno/cadastro">
                                <i className="fas fa-user-plus me-1"></i> Cadastro
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/alunos">
                                <i className="fas fa-list me-1"></i> Lista de Alunos
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={handleLogout}>
                                <i className="fas fa-sign-out-alt me-1"></i> Sair
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
  );
};

/**
 * Footer comum da aplicação - Duplicado do frontend PHP
 */
const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h5>Gerenciamento de Alunos</h5>
                    <p>Um sistema simples e eficiente para gerenciar seus alunos.</p>
                </div>
                <div className="col-md-3">
                    <h5>Links</h5>
                    <ul className="list-unstyled">
                        <li><Link to="/" className="text-white">Home</Link></li>
                        <li><Link to="/aluno/cadastro" className="text-white">Cadastro</Link></li>
                        <li><Link to="/alunos" className="text-white">Lista de Alunos</Link></li>
                    </ul>
                </div>
                <div className="col-md-3">
                    <h5>Contato</h5>
                    <ul className="list-unstyled">
                        <li><a href="mailto:contato@exemplo.com" className="text-white">contato@exemplo.com</a></li>
                        <li><a href="tel:+5511999999999" className="text-white">(11) 99999-9999</a></li>
                    </ul>
                </div>
            </div>
            <hr className="mt-4" />
            <div className="row">
                <div className="col-12 text-center">
                    <p className="mb-0">&copy; 2024 Gerenciamento de Alunos. Todos os direitos reservados.</p>
                </div>
            </div>
        </div>
    </footer>
  );
};

/**
 * Componente principal - Renderiza a página principal quando o usuário está autenticado
 * Substitui o Dashboard que foi removido conforme solicitado
 */
const MainContent = () => {
  return (
    <main className="container py-4">
      <div className="alert alert-success mb-4">
        <h4 className="alert-heading"><i className="fas fa-check-circle me-2"></i> Bem-vindo ao sistema!</h4>
        <p>Você está conectado ao Sistema de Gerenciamento de Alunos.</p>
        <hr />
        <p className="mb-0">Use o menu superior para navegar entre as funcionalidades.</p>
      </div>
      
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="fas fa-user-plus fa-3x text-primary mb-3"></i>
              <h5 className="card-title">Cadastrar Aluno</h5>
              <p className="card-text">Adicione novos alunos ao sistema.</p>
              <Link to="/aluno/cadastro" className="btn btn-primary">Cadastrar</Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="fas fa-list fa-3x text-primary mb-3"></i>
              <h5 className="card-title">Listar Alunos</h5>
              <p className="card-text">Visualize e gerencie os alunos cadastrados.</p>
              <Link to="/alunos" className="btn btn-primary">Visualizar</Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="fas fa-search fa-3x text-primary mb-3"></i>
              <h5 className="card-title">Buscar Aluno</h5>
              <p className="card-text">Encontre rapidamente informações de alunos.</p>
              <Link to="/alunos" className="btn btn-primary">Buscar</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

/**
 * Componente de rota protegida que redireciona para o login se não autenticado
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

/**
 * Componente principal da aplicação - Duplica o index.php
 */
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulando carregamento inicial (equivalente ao PHP que inicia sessão)
    const loadApp = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsLoading(false);
    };

    loadApp();
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <Router basename={BASE_PATH}>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Rotas protegidas */}
          <Route path="/" element={
            <ProtectedRoute>
              <MainContent />
            </ProtectedRoute>
          } />
          
          <Route path="/aluno/cadastro" element={
            <ProtectedRoute>
              <AlunoForm />
            </ProtectedRoute>
          } />
          
          <Route path="/aluno/editar/:id" element={
            <ProtectedRoute>
              <AlunoForm />
            </ProtectedRoute>
          } />
          
          <Route path="/alunos" element={
            <ProtectedRoute>
              <AlunosListPage />
            </ProtectedRoute>
          } />
          
          <Route path="/aluno/agenda/:id" element={
            <ProtectedRoute>
              <PdfPage />
            </ProtectedRoute>
          } />
          
          {/* Rota para página não encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
