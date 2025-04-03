import { Link } from 'react-router-dom';
import styles from '../../styles/modules/layout/MainContent.module.css';

/**
 * Interface para os cards de ação da dashboard
 */
interface ActionCard {
  title: string;
  description: string;
  icon: string;
  linkTo: string;
  linkText: string;
}

/**
 * Componente principal - Renderiza a página Dashboard quando o usuário está autenticado
 */
const MainContent = () => {
  // Lista de cards de ação rápida
  const actionCards: ActionCard[] = [
    {
      title: 'Cadastrar Aluno',
      description: 'Adicione novos alunos ao sistema.',
      icon: 'fa-user-plus',
      linkTo: '/aluno/cadastro',
      linkText: 'Cadastrar'
    },
    {
      title: 'Listar Alunos',
      description: 'Visualize e gerencie os alunos cadastrados.',
      icon: 'fa-list',
      linkTo: '/alunos',
      linkText: 'Visualizar'
    },
    {
      title: 'Buscar Aluno',
      description: 'Encontre rapidamente informações de alunos.',
      icon: 'fa-search',
      linkTo: '/alunos',
      linkText: 'Buscar'
    }
  ];

  /**
   * Renderiza a mensagem de boas-vindas
   */
  const renderWelcomeMessage = () => (
    <div className={styles.alert}>
      <h4 className={styles.alertHeading}>
        <i className={styles.alertIcon}></i> Bem-vindo ao sistema!
      </h4>
      <p>Você está conectado ao Sistema de Gerenciamento de Alunos.</p>
      <hr className={styles.divider} />
      <p className="mb-0">Use o menu lateral para navegar entre as funcionalidades.</p>
    </div>
  );

  /**
   * Renderiza um ícone do card
   */
  const renderCardIcon = (iconName: string) => (
    <span className={styles.icon}>
      <i className={`fas ${iconName}`}></i>
    </span>
  );

  /**
   * Renderiza um card de ação
   */
  const renderActionCard = (card: ActionCard, index: number) => (
    <div className={styles.column} key={index}>
      <div className={styles.card}>
        <div className={styles.cardBody}>
          {renderCardIcon(card.icon)}
          <h5 className={styles.cardTitle}>{card.title}</h5>
          <p className={styles.cardText}>{card.description}</p>
          <Link to={card.linkTo} className={styles.button}>{card.linkText}</Link>
        </div>
      </div>
    </div>
  );

  return (
    <main className={styles.main}>
      {renderWelcomeMessage()}
      
      <div className={styles.row}>
        {actionCards.map((card, index) => renderActionCard(card, index))}
      </div>
    </main>
  );
};

export default MainContent; 