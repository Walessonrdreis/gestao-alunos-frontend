import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="text-uppercase">Links Úteis</h5>
            <ul className="list-unstyled">
              <li><Link to="/suporte" className="text-decoration-none">Suporte</Link></li>
              <li><Link to="/documentacao" className="text-decoration-none">Documentação</Link></li>
              <li><Link to="/faq" className="text-decoration-none">FAQ</Link></li>
            </ul>
          </div>
          
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="text-uppercase">Contato</h5>
            <p>
              <i className="fas fa-envelope me-2"></i> suporte@gerenciamentoalunos.com.br<br />
              <i className="fas fa-phone me-2"></i> (11) 9999-9999
            </p>
          </div>
          
          <div className="col-md-4">
            <h5 className="text-uppercase">Redes Sociais</h5>
            <div className="d-flex justify-content-center gap-3 fs-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-top pt-3 mt-3">
          <p className="mb-0">
            &copy; {currentYear} Gerenciamento de Alunos. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 