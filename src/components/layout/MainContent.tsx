import { Link } from 'react-router-dom';

/**
 * Componente principal - Renderiza a página Dashboard quando o usuário está autenticado
 */
const MainContent = () => {
  return (
    <main className="container py-4">
      <div className="alert alert-success mb-4">
        <h4 className="alert-heading"><i className="fas fa-check-circle me-2"></i> Bem-vindo ao sistema!</h4>
        <p>Você está conectado ao Sistema de Gerenciamento de Alunos.</p>
        <hr />
        <p className="mb-0">Use o menu lateral para navegar entre as funcionalidades.</p>
      </div>
      
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="fas fa-user-plus fa-3x text-primary mb-3"></i>
              <h5 className="card-title">Cadastrar Aluno</h5>
              <p className="card-text">Adicione novos alunos ao sistema.</p>
              <Link to="/aluno/cadastro" className="btn btn-primary">Cadastrar</Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="fas fa-list fa-3x text-primary mb-3"></i>
              <h5 className="card-title">Listar Alunos</h5>
              <p className="card-text">Visualize e gerencie os alunos cadastrados.</p>
              <Link to="/alunos" className="btn btn-primary">Visualizar</Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="fas fa-search fa-3x text-primary mb-3"></i>
              <h5 className="card-title">Buscar Aluno</h5>
              <p className="card-text">Encontre rapidamente informações de alunos.</p>
              <Link to="/alunos" className="btn btn-primary">Buscar</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent; 