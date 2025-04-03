import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import styles from '../../styles/modules/layout/MainLayout.module.css';

// Componentes de layout
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

/**
 * Componente principal de layout da aplicação
 * Responsável pela estrutura principal, autenticação e responsividade
 */
const MainLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Ajustar sidebar em telas menores
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
        // Em telas médias, podemos considerar colapsar a sidebar por padrão
        if (window.innerWidth < 992) {
          setSidebarCollapsed(true);
        }
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

  /**
   * Alterna entre os estados expandido e colapsado da sidebar
   */
  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  /**
   * Renderiza o indicador de carregamento
   */
  const renderLoading = () => (
    <div className={styles.loading}>
      <div className={styles.spinner} role="status">
        <span className={styles.srOnly}>Carregando...</span>
      </div>
    </div>
  );

  // Mostrar indicador de carregamento enquanto verifica autenticação
  if (loading) {
    return renderLoading();
  }

  // Redirecionar para login se não estiver autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.layout}>
      <Header 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        toggleSidebarCollapse={toggleSidebarCollapse}
        isSidebarCollapsed={sidebarCollapsed}
      />
      
      <div className={styles.container}>
        <div className={styles.row}>
          {/* Sidebar */}
          <div 
            className={`
              ${styles.sidebar} 
              ${sidebarOpen ? styles.sidebarVisible : styles.sidebarHidden}
              ${sidebarCollapsed ? styles.sidebarCollapsed : ''}
            `}
          >
            <Sidebar isCollapsed={sidebarCollapsed} />
          </div>
          
          {/* Conteúdo principal */}
          <div className={`
            ${styles.mainContent}
            ${sidebarCollapsed ? styles.mainContentExpanded : ''}
          `}>
            <main className={styles.main}>
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