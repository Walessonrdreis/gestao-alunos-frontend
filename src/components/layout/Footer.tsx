const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="text-uppercase">Links Úteis</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none">Suporte</a></li>
              <li><a href="#" className="text-decoration-none">Documentação</a></li>
              <li><a href="#" className="text-decoration-none">FAQ</a></li>
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
              <a href="#" className="text-decoration-none">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-decoration-none">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-decoration-none">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-decoration-none">
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