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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Ajustar sidebar em telas menores
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      
      if (isMobileView) {
        // Em telas pequenas, manter sidebar visível e colapsado
        setSidebarOpen(true);
        setSidebarCollapsed(true);
      } else {
        // Em telas grandes, manter sidebar visível
        setSidebarOpen(true);
        
        // Em telas médias, colapsar sidebar por padrão (opcional)
        setSidebarCollapsed(window.innerWidth < 992);
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
   * Só tem efeito em telas grandes
   */
  const toggleSidebarCollapse = () => {
    if (!isMobile) {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  /**
   * Alterna visibilidade da sidebar (mostrar/esconder)
   */
  const toggleSidebarVisibility = () => {
    setSidebarOpen(!sidebarOpen);
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

  // Determinar se o sidebar deve estar colapsado (sempre em mobile)
  const isCollapsed = isMobile ? true : sidebarCollapsed;

  return (
    <div className={styles.layout}>
      <Header 
        toggleSidebar={toggleSidebarVisibility} 
        toggleSidebarCollapse={toggleSidebarCollapse}
        isSidebarCollapsed={isCollapsed}
      />
      
      <div className={styles.container}>
        <div className={styles.row}>
          {/* Sidebar */}
          <div 
            className={`
              ${styles.sidebar} 
              ${sidebarOpen ? styles.sidebarVisible : styles.sidebarHidden}
              ${isCollapsed ? styles.sidebarCollapsed : ''}
            `}
          >
            <Sidebar isCollapsed={isCollapsed} />
          </div>
          
          {/* Conteúdo principal */}
          <div className={`
            ${styles.mainContent}
            ${isCollapsed ? styles.mainContentExpanded : ''}
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