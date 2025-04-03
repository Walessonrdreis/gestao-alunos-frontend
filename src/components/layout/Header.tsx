import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import styles from '../../styles/modules/layout/Header.module.css';

/**
 * Interface para as propriedades do componente Header
 */
interface HeaderProps {
  toggleSidebar: () => void;
}

/**
 * Componente de cabeçalho da aplicação
 * Responsável por mostrar a barra de navegação superior, busca e menu de usuário
 */
const Header = ({ toggleSidebar }: HeaderProps) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
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
        
        <div className={styles.searchWrapper}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Pesquisar..."
            aria-label="Pesquisar"
          />
          
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              id="dropdown-user"
              className={styles.userInfo}
            >
              <div className={styles.userName}>{user?.name || 'Usuário'}</div>
              <i className={styles.userIcon}></i>
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