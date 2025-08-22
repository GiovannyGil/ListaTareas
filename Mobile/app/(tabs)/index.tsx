import { Redirect } from 'expo-router';

/**
 * Redirige a la pantalla de login (como pagina inicial cuando no hay usuario autenticado)
 * @returns 
 */
export default function IndexRedirect() {
  return <Redirect href="/login" />;
}
