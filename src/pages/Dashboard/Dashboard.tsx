/**
 * Dashboard simplificado do sistema de gerenciamento de alunos
 * 
 * Versão temporária e simplificada do Dashboard
 * 
 * @module Dashboard
 */
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Componente de Dashboard simplificado
 * 
 * Versão temporária que será implementada completamente no futuro
 */
export const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-3">Dashboard</h1>
          <p className="text-muted">
            Bem-vindo ao Sistema de Gerenciamento de Alunos, {user?.name || 'Usuário'}!
          </p>
        </Col>
      </Row>
      
      <Row>
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h2>Sistema em Desenvolvimento</h2>
              <p>
                O Dashboard completo está em desenvolvimento e será implementado em breve.
                Por enquanto, você pode acessar as funcionalidades através do menu de navegação.
              </p>
              
              <div className="alert alert-info mt-3">
                <i className="fas fa-info-circle me-2"></i>
                Esta é uma versão preliminar do dashboard. Novas funcionalidades serão adicionadas em breve.
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard; 