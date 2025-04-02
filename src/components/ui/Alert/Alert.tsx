import { ReactNode, useEffect, memo } from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';
import styles from './Alert.module.css';

/**
 * Props para o componente de alerta
 */
interface AlertProps {
  /** Conteúdo do alerta */
  children: ReactNode;
  
  /** Tipo/variante do alerta (determina a cor e ícone) */
  variant: 'success' | 'danger' | 'warning' | 'info';
  
  /** Função para fechar o alerta, chamada quando o botão de fechar é clicado */
  onClose?: () => void;
  
  /** Controla se um botão de fechar deve ser exibido no alerta */
  dismissible?: boolean;
  
  /** Classes CSS adicionais para personalização */
  className?: string;
  
  /** Título opcional exibido em destaque antes do conteúdo */
  title?: string;
  
  /** Tempo em milissegundos para fechar automaticamente o alerta (0 = não fecha) */
  autoClose?: number;
}

/**
 * Componente de alerta reutilizável para feedback ao usuário
 * 
 * Este componente encapsula o Alert do Bootstrap com melhorias para acessibilidade,
 * estilização consistente e funcionalidades extras como fechamento automático.
 * Deve ser usado para comunicar status, erros ou feedback de ações aos usuários.
 * 
 * @example
 * // Alerta de sucesso que fecha automaticamente após 5 segundos
 * <Alert 
 *   variant="success" 
 *   onClose={() => setShowAlert(false)} 
 *   dismissible 
 *   autoClose={5000}
 * >
 *   Operação realizada com sucesso!
 * </Alert>
 */
const Alert: React.FC<AlertProps> = ({
  children,
  variant,
  onClose,
  dismissible = false,
  className = '',
  title,
  autoClose = 0
}) => {
  // Efeito para fechamento automático do alerta
  useEffect(() => {
    // Só configuramos o timer se temos uma função de fechamento e um tempo > 0
    if (autoClose > 0 && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoClose);
      
      // Limpeza do timer se o componente for desmontado
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  // Classes CSS combinadas
  const alertClasses = `${styles.customAlert} ${className}`;

  return (
    <BootstrapAlert
      variant={variant}
      dismissible={dismissible}
      onClose={onClose}
      className={alertClasses}
      role="alert"
    >
      {title && (
        <BootstrapAlert.Heading>
          {title}
        </BootstrapAlert.Heading>
      )}
      {children}
    </BootstrapAlert>
  );
};

// Memoizamos o componente para evitar renderizações desnecessárias
export default memo(Alert); 