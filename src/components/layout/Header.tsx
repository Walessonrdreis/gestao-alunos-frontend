import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

type HeaderProps = {
  toggleSidebar: () => void;
};

const Header = ({ toggleSidebar }: HeaderProps) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="navbar navbar-dark sticky-top bg-primary flex-md-nowrap p-0 shadow">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-5">
          Gerenciamento de Alunos
        </Link>
        
        <button
          className="navbar-toggler d-md-none collapsed"
          type="button"
          onClick={toggleSidebar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="d-flex align-items-center">
          <input
            className="form-control form-control-dark me-2 d-none d-md-block"
            type="text"
            placeholder="Pesquisar..."
            aria-label="Pesquisar"
          />
          
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              id="dropdown-user"
              className="nav-link px-3 text-white d-flex align-items-center text-decoration-none"
            >
              <div className="d-none d-md-inline me-2">{user?.name || 'Usuário'}</div>
              <i className="fas fa-user-circle fs-4"></i>
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