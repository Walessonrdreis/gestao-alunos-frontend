import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../styles/modules/layout/Sidebar.module.css';

/**
 * Interface para os itens do menu de navegação
 */
interface MenuItem {
  title: string;
  path: string;
  icon: string;
  permissions?: string[];
}

/**
 * Interface para os itens de acesso rápido
 */
interface QuickAccessItem {
  title: string;
  path: string;
  icon: string;
}

/**
 * Interface para as propriedades do componente Sidebar
 */
interface SidebarProps {
  isCollapsed?: boolean;
}

/**
 * Componente de barra lateral da aplicação
 * Responsável por exibir a navegação principal e os links de acesso rápido
 */
const Sidebar = ({ isCollapsed = false }: SidebarProps) => {
  const location = useLocation();
  const { user } = useAuth();
  
  // Lista de itens do menu principal
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
  
  // Lista de itens de acesso rápido
  const quickAccessItems: QuickAccessItem[] = [
    {
      title: 'Agenda',
      path: '/agenda',
      icon: 'fa-calendar-alt'
    },
    {
      title: 'Notas',
      path: '/notas',
      icon: 'fa-star'
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

  /**
   * Renderiza um item de menu
   */
  const renderMenuItem = (item: MenuItem | QuickAccessItem, index: number) => (
    <li className={styles.navItem} key={index}>
      <Link
        to={item.path}
        className={`${styles.navLink} ${isActive(item.path) ? styles.navLinkActive : ''} ${isCollapsed ? styles.navLinkCollapsed : ''}`}
        title={isCollapsed ? item.title : ''}
      >
        <i className={`fas ${item.icon} ${styles.navIcon} ${isCollapsed ? styles.navIconCollapsed : ''}`}></i>
        {!isCollapsed && <span className={styles.navText}>{item.title}</span>}
      </Link>
    </li>
  );

  return (
    <div className={`${styles.sidebarSticky} ${isCollapsed ? styles.sidebarStickyCollapsed : ''}`}>
      {/* Menu Principal */}
      <ul className={styles.navList}>
        {menuItems.map((item, index) => (
          hasPermission(item) && renderMenuItem(item, index)
        ))}
      </ul>
      
      {/* Seção de Acesso Rápido */}
      {!isCollapsed ? (
        <h6 className={styles.sectionHeading}>
          <span>Acesso Rápido</span>
        </h6>
      ) : (
        <div className={styles.divider}></div>
      )}
      
      <ul className={styles.quickAccessList}>
        {quickAccessItems.map((item, index) => renderMenuItem(item, index))}
      </ul>
    </div>
  );
};

export default Sidebar; 