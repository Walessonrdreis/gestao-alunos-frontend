/**
 * Página de erro 404 - Não Encontrado
 * 
 * Este módulo implementa a página exibida quando o usuário
 * tenta acessar uma rota que não existe no sistema.
 * 
 * @module NotFound
 */
import { Link } from 'react-router-dom';

/**
 * Página de Não Encontrado (404)
 */
const NotFound = () => {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-8 text-center">
          <div className="error-container">
            <h1 className="display-1 fw-bold text-danger">404</h1>
            <p className="display-6 mb-5">Página não encontrada</p>
            <div className="error-actions">
              <p className="mb-4">A página que você está procurando não existe ou foi removida.</p>
              <Link to="/" className="btn btn-primary btn-lg">
                <i className="fas fa-home me-2"></i> Voltar para a página inicial
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 