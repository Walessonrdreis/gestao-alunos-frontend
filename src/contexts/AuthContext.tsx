/**
 * Contexto de autenticação
 * 
 * Fornece funcionalidades de autenticação e gerenciamento de usuário
 * para toda a aplicação, incluindo login, logout, cadastro e verificação
 * de estado de autenticação.
 * 
 * @module AuthContext
 */
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

/**
 * Representa os dados de um usuário autenticado
 */
interface User {
  /** Identificador único do usuário */
  id: number;
  /** Nome completo do usuário */
  nome: string;
  /** Endereço de email do usuário */
  email: string;
  /** Perfil do usuário (professor, coordenador, administrador) */
  perfil?: string;
  /** Papel/função do usuário no sistema (admin, user, etc.) */
  role: string;
  /** Telefone do usuário */
  telefone?: string;
}

/**
 * Dados para cadastro de novo usuário
 */
interface SignupData {
  /** Nome completo do usuário */
  nome: string;
  /** Email do usuário */
  email: string;
  /** Senha do usuário */
  senha: string;
  /** Telefone do usuário */
  telefone?: string;
  /** Perfil do usuário (professor, coordenador, administrador) */
  perfil: string;
}

/**
 * Interface do contexto de autenticação
 * 
 * Define os métodos e propriedades disponibilizados pelo contexto
 * de autenticação para os componentes da aplicação.
 */
interface AuthContextType {
  /** Usuário atualmente autenticado, ou null se não estiver autenticado */
  user: User | null;
  /** Indica se há um usuário autenticado no momento */
  isAuthenticated: boolean;
  /** Indica se existe uma operação de autenticação em andamento */
  loading: boolean;
  /** Função para realizar login do usuário */
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  /** Função para realizar logout do usuário */
  logout: () => void;
  /** Função para realizar cadastro do usuário */
  signup: (data: SignupData) => Promise<{ success: boolean; message: string }>;
}

/**
 * Propriedades para o provedor de autenticação
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Valor padrão para o contexto de autenticação
 * 
 * Utilizado apenas para inicialização do contexto, os valores
 * reais serão definidos pelo provedor.
 */
const defaultContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => ({ success: false, message: 'Não implementado' }),
  logout: () => {},
  signup: async () => ({ success: false, message: 'Não implementado' })
};

/**
 * Contexto para compartilhar estado e funções de autenticação
 */
const AuthContext = createContext<AuthContextType>(defaultContext);

/**
 * Hook personalizado para acessar o contexto de autenticação
 * 
 * @returns Objetos e métodos para gerenciar a autenticação do usuário
 * 
 * @example
 * // Em qualquer componente
 * const { user, login, logout } = useAuth();
 * 
 * // Verificar se o usuário está autenticado
 * if (user) {
 *   // Usuário autenticado
 * }
 */
export const useAuth = () => useContext(AuthContext);

/**
 * Provedor do contexto de autenticação
 * 
 * Componente que implementa a lógica de autenticação e fornece
 * os métodos e estado para os componentes filhos.
 * 
 * @param props - Propriedades do componente
 * @param props.children - Elementos filhos que terão acesso ao contexto
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  /** Estado do usuário atualmente autenticado */
  const [user, setUser] = useState<User | null>(null);
  /** Estado de carregamento para operações de autenticação */
  const [loading, setLoading] = useState(true);

  /**
   * Verifica se o usuário está autenticado ao inicializar a aplicação
   * Tenta restaurar a sessão do usuário a partir do localStorage
   */
  useEffect(() => {
    /**
     * Função para verificar o estado de autenticação
     * Em uma implementação real, verificaria com o backend
     */
    const checkAuthStatus = async () => {
      try {
        // Verificar se há um token salvo
        const savedUser = localStorage.getItem('user');
        
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  /**
   * Realiza o login do usuário
   * 
   * Em modo de desenvolvimento, aceita qualquer email e senha não-vazios
   * 
   * @param email - Email do usuário
   * @param password - Senha do usuário
   * @returns Promise com sucesso (true) ou falha (false) do login
   */
  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      setLoading(true);
      
      // Simulando requisição à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verificações básicas (apenas verifica se os campos não estão vazios)
      if (!email || !password) {
        return { success: false, message: 'Email e senha são obrigatórios' };
      }
      
      // Em ambiente de desenvolvimento, aceita qualquer combinação de email/senha
      // desde que não estejam vazios
      const userData: User = {
        id: 1,
        nome: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        email: email,
        perfil: 'administrador',
        role: 'admin'
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true, message: 'Login realizado com sucesso!' };
    } catch (error) {
      console.error('Erro durante o login:', error);
      return { success: false, message: 'Ocorreu um erro durante o login. Tente novamente.' };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Realiza o logout do usuário
   * 
   * Remove o usuário do estado e da persistência local
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  /**
   * Realiza o cadastro de um novo usuário
   * 
   * Em modo de desenvolvimento, sempre retorna sucesso
   * 
   * @param data - Dados do formulário de cadastro
   * @returns Promise com sucesso (true) ou falha (false) do cadastro
   */
  const signup = async (data: SignupData): Promise<{ success: boolean; message: string }> => {
    try {
      setLoading(true);
      
      // Simulando requisição à API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Em ambiente de desenvolvimento, sempre retorna sucesso
      return { 
        success: true, 
        message: 'Cadastro realizado com sucesso!' 
      };
    } catch (error) {
      console.error('Erro durante o cadastro:', error);
      return { 
        success: false, 
        message: 'Ocorreu um erro durante o cadastro. Tente novamente.' 
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Valor do contexto a ser fornecido para a árvore de componentes
   */
  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    signup
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 