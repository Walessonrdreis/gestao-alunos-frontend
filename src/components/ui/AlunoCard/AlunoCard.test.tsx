import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AlunoCard from './AlunoCard';
import { Aluno } from './AlunoCard';

// Mock do componente ActionButtons para evitar dependências externas
jest.mock('../ActionButtons/ActionButtons', () => {
  return {
    __esModule: true,
    default: ({ id, onView, onEdit, onDelete, onPdf }) => (
      <div data-testid="action-buttons">
        {onView && <button data-testid="view-button" onClick={() => onView()} />}
        {onEdit && <button data-testid="edit-button" onClick={() => onEdit()} />}
        {onDelete && <button data-testid="delete-button" onClick={() => onDelete()} />}
        {onPdf && <button data-testid="pdf-button" onClick={() => onPdf()} />}
      </div>
    ),
  };
});

// Dados de amostra para testes
const alunoTeste: Aluno = {
  id: 1,
  nome: 'João da Silva',
  matricula: '12345',
  escola: 'Escola Estadual',
  telefone: '(11) 98765-4321',
  disciplinas: [
    { id: 1, nome: 'Matemática' },
    { id: 2, nome: 'Física' }
  ],
  proxima_aula: '2023-12-20T14:30:00',
  email: 'joao@example.com'
};

// Wrapper para o Router necessário devido ao ActionButtons
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('AlunoCard', () => {
  test('renderiza as informações do aluno corretamente', () => {
    render(<AlunoCard aluno={alunoTeste} />, { wrapper });
    
    expect(screen.getByText('João da Silva')).toBeInTheDocument();
    expect(screen.getByText('12345')).toBeInTheDocument();
    expect(screen.getByText('Escola Estadual')).toBeInTheDocument();
    expect(screen.getByText('(11) 98765-4321')).toBeInTheDocument();
    expect(screen.getByText('Matemática, Física')).toBeInTheDocument();
    expect(screen.getByText(/Próxima aula:/)).toBeInTheDocument();
  });

  test('lida com dados faltantes ou opcionais', () => {
    const alunoIncompleto: Aluno = {
      id: 2,
      nome: 'Maria Souza'
    };
    
    render(<AlunoCard aluno={alunoIncompleto} />, { wrapper });
    
    expect(screen.getByText('Maria Souza')).toBeInTheDocument();
    expect(screen.getByText('Não informada')).toBeInTheDocument();
    expect(screen.getByText('Escola não informada')).toBeInTheDocument();
    expect(screen.getByText('Telefone não informado')).toBeInTheDocument();
    expect(screen.getByText('Sem disciplina')).toBeInTheDocument();
    expect(screen.getByText('Próxima aula: Não agendada')).toBeInTheDocument();
  });

  test('formata data da próxima aula corretamente', () => {
    render(<AlunoCard aluno={alunoTeste} />, { wrapper });
    
    // O formato exato pode variar dependendo da localização, então verificamos apenas partes da data
    const dataElement = screen.getByText(/Próxima aula:/);
    expect(dataElement.textContent).toContain('20/12/2023');
  });

  test('chama callbacks quando botões são clicados', () => {
    const mockVerAulas = jest.fn();
    const mockVisualizarPDF = jest.fn();
    const mockEditar = jest.fn();
    const mockExcluir = jest.fn();
    
    render(
      <AlunoCard 
        aluno={alunoTeste} 
        onVerAulas={mockVerAulas}
        onVisualizarPDF={mockVisualizarPDF}
        onEditar={mockEditar}
        onExcluir={mockExcluir}
      />, 
      { wrapper }
    );
    
    fireEvent.click(screen.getByTestId('view-button'));
    expect(mockVerAulas).toHaveBeenCalledWith(alunoTeste.id);
    
    fireEvent.click(screen.getByTestId('pdf-button'));
    expect(mockVisualizarPDF).toHaveBeenCalledWith(alunoTeste.id);
    
    fireEvent.click(screen.getByTestId('edit-button'));
    expect(mockEditar).toHaveBeenCalledWith(alunoTeste.id);
    
    fireEvent.click(screen.getByTestId('delete-button'));
    expect(mockExcluir).toHaveBeenCalledWith(alunoTeste.id);
  });
}); 