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
import MainLayout from './components/layout/MainLayout';
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
      {children}
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
          
          {/* Layout principal com sidebar para rotas protegidas */}
          <Route path="/" element={<MainLayout />}>
            {/* Rota inicial - Dashboard/Home */}
            <Route index element={<MainContent />} />
            
            {/* Rotas de alunos */}
            <Route path="alunos" element={<AlunosListPage />} />
            <Route path="aluno/cadastro" element={<AlunoForm />} />
            <Route path="aluno/editar/:id" element={<AlunoForm />} />
            <Route path="aluno/agenda/:id" element={<PdfPage />} />
            
            {/* Adicione outras rotas aninhadas aqui */}
          </Route>
          
          {/* Rota para página não encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
