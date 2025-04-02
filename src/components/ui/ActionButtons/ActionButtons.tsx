import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './ActionButtons.css';

/**
 * Interface para as propriedades do componente ActionButtons.
 */
interface ActionButtonsProps {
  /** ID do item (aluno, aula, etc.). */
  id: number;
  /** Função de callback para edição. */
  onEdit?: () => void;
  /** Função de callback para exclusão. */
  onDelete?: () => void;
  /** Função de callback para visualização. */
  onView?: () => void;
  /** Função de callback para geração de PDF. */
  onPdf?: () => void;
  /** Caminho para a página de edição. */
  editPath?: string;
  /** Caminho para a página de visualização. */
  viewPath?: string;
  /** Indica se deve mostrar o botão de edição. */
  showEdit?: boolean;
  /** Indica se deve mostrar o botão de exclusão. */
  showDelete?: boolean;
  /** Indica se deve mostrar o botão de visualização. */
  showView?: boolean;
  /** Indica se deve mostrar o botão de PDF. */
  showPdf?: boolean;
  /** Tamanho dos botões. */
  size?: 'sm' | 'lg' | undefined;
}

/**
 * Componente para exibir botões de ação (visualizar, editar, excluir, gerar PDF).
 * 
 * @param props - Propriedades do componente.
 * @returns Componente React.
 */
const ActionButtons: React.FC<ActionButtonsProps> = ({
  id,
  onEdit,
  onDelete,
  onView,
  onPdf,
  editPath,
  viewPath,
  showEdit = true,
  showDelete = true,
  showView = true,
  showPdf = true,
  size = 'md'
}) => {
  const navigate = useNavigate();

  /**
   * Manipula a ação de edição.
   * Se uma função de callback for fornecida, ela será chamada; caso contrário,
   * navega para a página de edição especificada ou para a rota padrão.
   */
  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    } else if (editPath) {
      navigate(`${editPath}/${id}`);
    } else {
      // Rota padrão se não for especificada.
      navigate(`/aluno/editar/${id}`);
    }
  };

  /**
   * Manipula a ação de visualização.
   * Se uma função de callback for fornecida, ela será chamada; caso contrário,
   * navega para a página de visualização especificada.
   */
  const handleView = () => {
    if (onView) {
      onView();
    } else if (viewPath) {
      navigate(`${viewPath}/${id}`);
    }
  };

  /**
   * Manipula a ação de exclusão.
   * Chama a função de callback fornecida, se existir.
   */
  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  /**
   * Manipula a ação de geração de PDF.
   * Se uma função de callback for fornecida, ela será chamada; caso contrário,
   * abre a URL do PDF em uma nova aba.
   */
  const handlePdf = () => {
    if (onPdf) {
      onPdf();
    } else {
      // Obter BASE_PATH a partir da configuração do vite ou usar o valor padrão
      const BASE_PATH = '/applications/escola';
      // Abrir em nova aba com URL completa, incluindo o caminho base
      const baseUrl = window.location.origin;
      window.open(`${baseUrl}${BASE_PATH}/aluno/agenda/${id}`, '_blank');
    }
  };

  const buttonVariant = size === 'sm' ? 'link' : 'outline-secondary';
  const buttonSize: 'sm' | 'lg' | undefined = size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : undefined;
  const buttonClassName = size === 'sm' ? 'btn-action-icon' : 'btn-action';

  return (
    <div className="action-buttons">
      {showView && (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`tooltip-view-${id}`}>Visualizar</Tooltip>}
        >
          <Button
            variant={buttonVariant}
            size={buttonSize}
            onClick={handleView}
            className={buttonClassName}
            aria-label="Visualizar"
          >
            <i className="fas fa-eye"></i>
            {size !== 'sm' && <span>Visualizar</span>}
          </Button>
        </OverlayTrigger>
      )}

      {showEdit && (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`tooltip-edit-${id}`}>Editar</Tooltip>}
        >
          <Button
            variant={buttonVariant}
            size={buttonSize}
            onClick={handleEdit}
            className={buttonClassName}
            aria-label="Editar"
          >
            <i className="fas fa-edit"></i>
            {size !== 'sm' && <span>Editar</span>}
          </Button>
        </OverlayTrigger>
      )}

      {showDelete && (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`tooltip-delete-${id}`}>Excluir</Tooltip>}
        >
          <Button
            variant={size === 'sm' ? 'link' : 'outline-danger'}
            size={buttonSize}
            onClick={handleDelete}
            className={buttonClassName}
            aria-label="Excluir"
          >
            <i className="fas fa-trash-alt"></i>
            {size !== 'sm' && <span>Excluir</span>}
          </Button>
        </OverlayTrigger>
      )}

      {showPdf && (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`tooltip-pdf-${id}`}>Gerar PDF</Tooltip>}
        >
          <Button
            variant={size === 'sm' ? 'link' : 'outline-primary'}
            size={buttonSize}
            onClick={handlePdf}
            className={buttonClassName}
            aria-label="Gerar PDF"
          >
            <i className="fas fa-file-pdf"></i>
            {size !== 'sm' && <span>PDF</span>}
          </Button>
        </OverlayTrigger>
      )}
    </div>
  );
};

export default ActionButtons; 