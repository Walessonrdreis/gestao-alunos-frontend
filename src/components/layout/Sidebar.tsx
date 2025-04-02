import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Interface para os itens do menu
interface MenuItem {
  title: string;
  path: string;
  icon: string;
  permissions?: string[];
}

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  // Lista de itens do menu
  const menuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      path: '/',
      icon: 'fa-tachometer-alt'
    },
    {
      title: 'Alunos',
      path: '/alunos',
      icon: 'fa-user-graduate'
    },
    {
      title: 'Professores',
      path: '/professores',
      icon: 'fa-chalkboard-teacher'
    },
    {
      title: 'Disciplinas',
      path: '/disciplinas',
      icon: 'fa-book'
    },
    {
      title: 'Escolas',
      path: '/escolas',
      icon: 'fa-school'
    },
    {
      title: 'Relatórios',
      path: '/relatorios',
      icon: 'fa-chart-bar',
      permissions: ['admin']
    },
    {
      title: 'Configurações',
      path: '/configuracoes',
      icon: 'fa-cog',
      permissions: ['admin']
    }
  ];
  
  // Verifica se o usuário tem permissão para ver o item do menu
  const hasPermission = (item: MenuItem): boolean => {
    if (!item.permissions) return true;
    return !!user && item.permissions.includes(user.role);
  };
  
  // Verifica se o link está ativo
  const isActive = (path: string): boolean => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="sidebar-sticky pt-3">
      <ul className="nav flex-column">
        {menuItems.map((item, index) => (
          hasPermission(item) && (
            <li className="nav-item" key={index}>
              <Link
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              >
                <i className={`fas ${item.icon} me-2`}></i>
                {item.title}
              </Link>
            </li>
          )
        ))}
      </ul>
      
      <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
        <span>Acesso Rápido</span>
      </h6>
      
      <ul className="nav flex-column mb-2">
        <li className="nav-item">
          <Link to="/agenda" className={`nav-link ${isActive('/agenda') ? 'active' : ''}`}>
            <i className="fas fa-calendar-alt me-2"></i>
            Agenda
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/notas" className={`nav-link ${isActive('/notas') ? 'active' : ''}`}>
            <i className="fas fa-star me-2"></i>
            Notas
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar; 