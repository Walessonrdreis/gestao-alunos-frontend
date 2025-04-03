import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../styles/modules/layout/Header.module.css';

/**
 * Interface para as propriedades do componente Header
 */
interface HeaderProps {
  toggleSidebar: () => void;
  toggleSidebarCollapse: () => void;
  isSidebarCollapsed: boolean;
}

/**
 * Componente de cabeçalho da aplicação
 * Responsável por mostrar a barra de navegação superior, busca e menu de usuário
 */
const Header = ({ toggleSidebar, toggleSidebarCollapse, isSidebarCollapsed }: HeaderProps) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo e botão toggle */}
        <div className={styles.logoContainer}>
          <button 
            className={styles.collapseButton} 
            type="button"
            onClick={toggleSidebarCollapse}
            title={isSidebarCollapsed ? "Expandir menu" : "Minimizar menu"}
          >
            <i className={`fas ${isSidebarCollapsed ? 'fa-indent' : 'fa-outdent'}`}></i>
          </button>
          
          <Link to="/" className={styles.brand}>
            Gerenciamento de Alunos
          </Link>
          
          <button 
            className={styles.toggler} 
            type="button"
            onClick={toggleSidebar}
          >
            <span className={styles.togglerIcon}></span>
          </button>
        </div>
        
        {/* Barra de pesquisa */}
        <div className={styles.searchContainer}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Pesquisar..."
            aria-label="Pesquisar"
          />
        </div>

        {/* Menu de usuário */}
        <div className={styles.userContainer}>
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              id="dropdown-user"
              className={styles.userInfo}
            >
              <div className={styles.userName}>{user?.nome || 'Usuário'}</div>
              <i className={`fas fa-user ${styles.userIcon}`}></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/perfil">Perfil</Dropdown.Item>
              <Dropdown.Item as={Link} to="/configuracoes">Configurações</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Sair</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header; 