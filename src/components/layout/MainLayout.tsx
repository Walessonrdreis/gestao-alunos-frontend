import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useEffect, useState } from 'react';

const MainLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Ajustar sidebar em telas menores
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Executar ao montar
    handleResize();

    // Adicionar listener para redimensionamento
    window.addEventListener('resize', handleResize);

    // Limpar listener ao desmontar
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Mostrar indicador de carregamento enquanto verifica autenticação
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  // Redirecionar para login se não estiver autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="container-fluid flex-grow-1">
        <div className="row">
          {/* Sidebar */}
          <div className={`col-md-3 col-lg-2 d-md-block bg-light sidebar ${sidebarOpen ? 'show' : 'collapse'}`}>
            <Sidebar />
          </div>
          
          {/* Conteúdo principal */}
          <div className="col-md-9 col-lg-10 ms-sm-auto px-md-4">
            <main className="py-3">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MainLayout; 