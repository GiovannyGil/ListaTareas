import API from "@/services/API.services";
import { Usuario } from "../interfaces/Usuario";

/**
 * * Metodo para obtener todos los usuarios
 * @returns => Promise<Usuario[]> -> retorna la lista de usuarios
 */
export async function obtenerUsuarios() {
    try {
        const response = await API.get('/usuarios');
        return response.data;
    } catch (error) {
        if (typeof error === "object" && error !== null && "response" in error) {
            // @ts-ignore
            throw new Error(error.response?.data?.message || "Error al obtener los usuarios");
        }
        throw new Error("Error al obtener los usuarios");
    }
}

/**
 * Metodo para obtener un usuario por su ID
 * @param id : number -> id del usuario
 * @returns => Promise<Usuario> -> retorna el usuario encontrado
 */
export async function obtenerUsuarioPorId(id: number) {
    try {
        const response = await API.get(`/usuario/${id}`);
        return response.data;
    } catch (error) {
        if (typeof error === "object" && error !== null && "response" in error) {
            // @ts-ignore
            throw new Error(error.response?.data?.message || "Error al obtener el usuario");
        }
        throw new Error("Error al obtener el usuario");
    }
}

/**
 * Metodo para crear un nuevo usuario
 * @param usuario : Usuario -> datos del usuario a crear
 * @returns => Promise<Usuario> -> retorna el usuario creado
 */
export async function crearUsuario(usuario: Usuario) {
    try {
        const response = await API.post('/usuarios', usuario);
        return response.data;
    } catch (error) {
        if (typeof error === "object" && error !== null && "response" in error) {
            // @ts-ignore
            throw new Error(error.response?.data?.message || "Error al crear el usuario");
        }
        throw new Error("Error al crear el usuario");
    }
}

/**
 * Metodo para actualizar un usuario
 * @param id : number -> id del usuario
 * @param usuario : Usuario -> datos del usuario a actualizar
 * @returns => Promise<Usuario> -> retorna el usuario actualizado
 */
export async function actualizarUsuario(id: number, usuario: Usuario) {
    try {
        const response = await API.put(`/usuarios/${id}`, usuario);
        return response.data;
    } catch (error) {
        if (typeof error === "object" && error !== null && "response" in error) {
            // @ts-ignore
            throw new Error(error.response?.data?.message || "Error al actualizar el usuario");
        }
        throw new Error("Error al actualizar el usuario");
    }
}

/**
 * Metodo para eliminar un usuario
 * @param id : number -> id del usuario
 * @returns => Promise<void> -> retorna void
 */
export async function eliminarUsuario(id: number) {
    try {
        return API.delete(`/usuarios/soft/${id}`);
    } catch (error) {
        if (typeof error === "object" && error !== null && "response" in error) {
            // @ts-ignore
            throw new Error(error.response?.data?.message || "Error al eliminar el usuario");
        }
        throw new Error("Error al eliminar el usuario");
    }
}
