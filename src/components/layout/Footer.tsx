import { Link } from 'react-router-dom';
import styles from '../../styles/modules/layout/Footer.module.css';

/**
 * Interface para um link útil no rodapé
 */
interface UsefulLink {
  title: string;
  path: string;
}

/**
 * Interface para rede social
 */
interface SocialMedia {
  name: string;
  icon: string;
  url: string;
}

/**
 * Componente de rodapé da aplicação
 * Responsável por mostrar links úteis, informações de contato e redes sociais
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Lista de links úteis
  const usefulLinks: UsefulLink[] = [
    { title: 'Suporte', path: '/suporte' },
    { title: 'Documentação', path: '/documentacao' },
    { title: 'FAQ', path: '/faq' }
  ];
  
  // Lista de redes sociais
  const socialMedia: SocialMedia[] = [
    { name: 'Facebook', icon: 'fab fa-facebook', url: 'https://facebook.com' },
    { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://instagram.com' },
    { name: 'Twitter', icon: 'fab fa-twitter', url: 'https://twitter.com' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin', url: 'https://linkedin.com' }
  ];

  // Renderiza um ícone de contato
  const ContactIcon = ({ iconName }: { iconName: string }) => (
    <i className={iconName} style={{ marginRight: '0.5rem' }}></i>
  );
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.column}>
            <h5 className={styles.heading}>Links Úteis</h5>
            <ul className={styles.linksList}>
              {usefulLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className={styles.link}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className={styles.column}>
            <h5 className={styles.heading}>Contato</h5>
            <p>
              <ContactIcon iconName="fas fa-envelope" /> suporte@gerenciamentoalunos.com.br<br />
              <ContactIcon iconName="fas fa-phone" /> (11) 9999-9999
            </p>
          </div>
          
          <div className={styles.columnRight}>
            <h5 className={styles.heading}>Redes Sociais</h5>
            <div className={styles.socialWrapper}>
              {socialMedia.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.socialLink}
                  aria-label={social.name}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} Gerenciamento de Alunos. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 