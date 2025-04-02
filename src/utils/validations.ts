/**
 * Sistema de validação para formulários
 * 
 * Este módulo fornece uma API de validação reutilizável para formulários
 * de toda a aplicação, com regras pré-definidas e personalizáveis.
 * 
 * @module validations
 */

/**
 * Definição de uma regra de validação
 * 
 * Cada regra contém uma função de teste e uma mensagem de erro.
 */
type ValidationRule = {
  /** 
   * Função que testa se um valor é válido
   * @returns true se o valor passar na validação, false caso contrário 
   */
  test: (value: any) => boolean;
  
  /** 
   * Mensagem a ser exibida quando a validação falhar 
   */
  message: string;
};

/**
 * Conjunto de regras de validação pré-definidas
 * 
 * Estas regras podem ser usadas diretamente nos formulários para validações comuns
 * como campos obrigatórios, emails, telefones, etc.
 */
export const ValidationRules = {
  /**
   * Valida se um campo não está vazio
   * 
   * @param fieldName - Nome do campo para incluir na mensagem de erro
   * @returns Regra de validação para campo obrigatório
   */
  required: (fieldName: string): ValidationRule => ({
    test: (value) => !!value && value.toString().trim() !== '',
    message: `O campo ${fieldName} é obrigatório.`
  }),

  /**
   * Valida se um valor tem formato de email
   * 
   * @returns Regra de validação para formato de email
   */
  email: (): ValidationRule => ({
    test: (value) => {
      // Ignoramos validação se o campo estiver vazio
      if (!value) return true;
      
      // Regex simplificada para validação básica de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    },
    message: 'Formato de email inválido.'
  }),

  /**
   * Valida se um valor tem formato de telefone brasileiro
   * 
   * @returns Regra de validação para formato de telefone
   */
  telefone: (): ValidationRule => ({
    test: (value) => {
      // Ignoramos validação se o campo estiver vazio
      if (!value) return true;
      
      // Regex para formatos comuns de telefone no Brasil
      // Aceita (11) 98765-4321 ou 11987654321 ou variações
      const telefoneRegex = /^(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;
      return telefoneRegex.test(value.replace(/\D/g, ''));
    },
    message: 'Formato de telefone inválido.'
  }),

  /**
   * Valida se um valor tem o comprimento mínimo especificado
   * 
   * @param length - Comprimento mínimo requerido
   * @param fieldName - Nome do campo para incluir na mensagem de erro
   * @returns Regra de validação para comprimento mínimo
   */
  minLength: (length: number, fieldName: string): ValidationRule => ({
    test: (value) => !value || value.length >= length,
    message: `O campo ${fieldName} deve ter no mínimo ${length} caracteres.`
  }),

  /**
   * Valida se um valor tem o comprimento máximo especificado
   * 
   * @param length - Comprimento máximo permitido
   * @param fieldName - Nome do campo para incluir na mensagem de erro
   * @returns Regra de validação para comprimento máximo
   */
  maxLength: (length: number, fieldName: string): ValidationRule => ({
    test: (value) => !value || value.length <= length,
    message: `O campo ${fieldName} deve ter no máximo ${length} caracteres.`
  }),

  /**
   * Valida se um valor numérico está dentro de um intervalo especificado
   * 
   * @param min - Valor mínimo permitido (inclusivo)
   * @param max - Valor máximo permitido (inclusivo)
   * @param fieldName - Nome do campo para incluir na mensagem de erro
   * @returns Regra de validação para intervalo numérico
   */
  numberInRange: (min: number, max: number, fieldName: string): ValidationRule => ({
    test: (value) => !value || (Number(value) >= min && Number(value) <= max),
    message: `O campo ${fieldName} deve estar entre ${min} e ${max}.`
  }),
};

/**
 * Valida um único campo utilizando um conjunto de regras
 * 
 * @param value - Valor do campo a ser validado
 * @param rules - Array de regras de validação a serem aplicadas
 * @returns Objeto com o resultado da validação e mensagem de erro
 */
export function validateField(
  value: any, 
  rules: ValidationRule[]
): { isValid: boolean; message: string } {
  // Percorre as regras em ordem e retorna o primeiro erro encontrado
  for (const rule of rules) {
    if (!rule.test(value)) {
      return { isValid: false, message: rule.message };
    }
  }
  
  // Se passar em todas as regras, retorna válido
  return { isValid: true, message: '' };
}

/**
 * Valida um formulário inteiro aplicando regras a cada campo
 * 
 * @param values - Objeto com os valores dos campos do formulário
 * @param validationRules - Objeto mapeando nomes de campos para suas regras de validação
 * @returns Objeto com erros de validação, vazio se todos os campos forem válidos
 * 
 * @example
 * // Validar um formulário de login
 * const errors = validateForm(
 *   { email: 'usuario@exemplo', senha: '123' },
 *   {
 *     email: [ValidationRules.required('Email'), ValidationRules.email()],
 *     senha: [ValidationRules.required('Senha'), ValidationRules.minLength(6, 'Senha')]
 *   }
 * );
 * // Retorno: { email: 'Formato de email inválido.', senha: 'O campo Senha deve ter no mínimo 6 caracteres.' }
 */
export function validateForm(
  values: Record<string, any>,
  validationRules: Record<string, ValidationRule[]>
): Record<string, string> {
  const errors: Record<string, string> = {};

  // Valida cada campo com suas regras correspondentes
  Object.keys(validationRules).forEach(fieldName => {
    const value = values[fieldName];
    const rules = validationRules[fieldName];
    
    const { isValid, message } = validateField(value, rules);
    
    // Adiciona mensagem de erro apenas se a validação falhar
    if (!isValid) {
      errors[fieldName] = message;
    }
  });

  return errors;
} 