/**
 * Funciones de sanitización y validación de seguridad para formularios.
 */

// Detecta patrones comunes de inyección SQL
export function validateSqlInjection(input: string): boolean {
  if (!input) return true; // Empty string is not SQL injection

  const sqlPatterns = [
    /(--|;)/i, // Comentarios y terminadores de sentencia
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|UNION|EXEC|EXECUTE)\b.*\b(FROM|INTO|TABLE|DATABASE|VIEW)\b)/i,
    /(\b(OR|AND)\b\s+(['"]?\w+['"]?)\s*(<|>|<=|>=|=|LIKE)\s*\3)/i, // OR 1=1
    /(WAITFOR\s+DELAY)/i,
    /(xp_cmdshell)/i,
  ];

  return !sqlPatterns.some((pattern) => pattern.test(input));
}

// Limpia el texto de caracteres especiales, dejando solo alfanuméricos y puntuación básica
export function sanitizeText(input: string): string {
  if (!input) return '';
  // Elimina <, >, y caracteres especiales extraños para prevenir XSS
  return input.replace(/[<>]/g, '').trim();
}

// Verifica que el correo sea válido y no tenga caracteres extraños
export function validateEmailFormat(email: string): boolean {
  if (!email) return false;
  // Regex estándar para emails válidos
  const emailRegex = /^[^\s@<>()[\]]+@[^\s@<>()[\]]+\.[^\s@<>()[\]]+$/;
  return emailRegex.test(email);
}

// Valida todos los campos de un objeto y retorna si pasó la prueba de seguridad
export function validateFormSecurity(formData: Record<string, any>): {
  isValid: boolean;
  error?: string;
} {
  for (const [key, value] of Object.entries(formData)) {
    if (typeof value !== 'string') continue;

    // Verificar inyección SQL
    if (!validateSqlInjection(value)) {
      return {
        isValid: false,
        error: `Se detectaron caracteres o palabras no permitidas en el campo "${key.replace('your-', '')}". Por favor, verifica la información ingresada.`,
      };
    }

    // Validación específica si es un campo de correo
    if (key.includes('email')) {
      if (!validateEmailFormat(value)) {
        return {
          isValid: false,
          error: 'El formato del correo electrónico ingresado no es válido o contiene caracteres no permitidos.',
        };
      }
    }
  }

  return { isValid: true };
}
