import API from "@/services/API.services";
import { Usuario, reestablecerClave } from "../../Modules/interfaces/Usuario";

/**
 * Metodo para iniciar sesión
 * @param nombreUsuario : string -> nombre de usuario
 * @param clave : string -> contraseña
 * @returns => Promise<Usuario> -> retorna el usuario autenticado
 */
export async function login(nombreUsuario: string, clave: string) {
  try {
    const response = await API.post("/auth/login", {
      nombreUsuario,
      clave,
    });
    
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    if (typeof error === "object" && error !== null && "response" in error) {
      // @ts-ignore
      throw new Error(error.response?.data?.message || "Error en el login");
    }
    throw new Error("Error en el login");
  }
};

/**
 * Metodo para registrar un nuevo usuario
 * @param usuario : Usuario -> datos del usuario a registrar
 * @returns => Promise<Usuario> -> retorna el usuario registrado
 */
export async function register(usuario: Usuario) {
  try {
    usuario.rolId = 2; // Asignar rol de usuario por defecto
    const response = await API.post("/auth/register", usuario);
    return response.data;
  } catch (error) {
    if (typeof error === "object" && error !== null && "response" in error) {
      // @ts-ignore
      throw new Error(error.response?.data?.message || "Error en el registro");
    }
    throw new Error("Error en el registro");
  }
}

/**
 * Metodo para recordar el nombre de usuario
 * @param correo : string -> correo del usuario
 * @returns => Promise<void> -> retorna void
 */
export async function recordarUsuario(correo: string) {
  try {
    const response = await API.post("/auth/recuperarUsuario", { correo });
    return response.data;
  } catch (error) {
    if (typeof error === "object" && error !== null && "response" in error) {
      // @ts-ignore
      throw new Error(error.response?.data?.message || "Error al recordar usuario");
    }
    throw new Error("Error al recordar usuario");
  }
}

/**
 * Metodo para reestablecer la clave
 * @param reestablecerClave : reestablecerClave -> datos para reestablecer la clave
 * @returns => Promise<void> -> retorna void
 */
export async function ReestablecerClave(reestablecerClave: reestablecerClave) {
  try {
    const response = await API.post("/auth/reestablecerClave", reestablecerClave);
    return response.data;
  } catch (error) {
    if (typeof error === "object" && error !== null && "response" in error) {
      // @ts-ignore
      throw new Error(error.response?.data?.message || "Error al reestablecer la clave");
    }
    throw new Error("Error al reestablecer la clave");
  }
}

/**
 * Metodo para cerrar sesión
 * @returns => Promise<void> -> retorna void
 */
export async function cerrarSesion() {
  try {
    const response = await API.post("/auth/logout");
    return response.data;
  } catch (error) {
    if (typeof error === "object" && error !== null && "response" in error) {
      // @ts-ignore
      throw new Error(error.response?.data?.message || "Error al cerrar sesión");
    }
    throw new Error("Error al cerrar sesión");
  }
}