import API from "@/services/API.services";
import { tipoUsuario } from "../interfaces/TipoUsuario";

/**
 * Metodo para crear un nuevo tipo de usuario
 * @param tipoUsuario : tipoUsuario -> datos del tipo de usuario a crear
 * @returns => Promise<tipoUsuario> -> retorna el tipo de usuario creado
 */
async function crearTipoUsuario(tipoUsuario: tipoUsuario) {
    try {
        return API.post('/tipos-usuario', tipoUsuario);
    } catch (error) {
      if (typeof error === "object" && error !== null && "response" in error) {
      // @ts-ignore
      throw new Error(error.response?.data?.message || "Error al crear el tipo de usuario");
    }
    throw new Error("Error al crear el tipo de usuario");
    }
}

/**
 * Metodo para obtener todos los tipos de usuario
 * @returns => Promise<tipoUsuario[]> -> retorna la lista de tipos de usuario
 */
async function obtenerTiposUsuario() {
    try {
        return API.get('/tipos-usuario');
    } catch (error) {
        if (typeof error === "object" && error !== null && "response" in error) {
            // @ts-ignore
            throw new Error(error.response?.data?.message || "Error al obtener los tipos de usuario");
        }
        throw new Error("Error al obtener los tipos de usuario");
    }
}

/**
 * Metodo para obtener un tipo de usuario por su ID
 * @param id : number -> id del tipo de usuario
 * @returns => Promise<tipoUsuario> -> retorna el tipo de usuario encontrado
 */
async function obtenerTipoUsuarioPorId(id: number) {
    try {
        return API.get(`/tipos-usuario/${id}`);
    } catch (error) {
        if (typeof error === "object" && error !== null && "response" in error) {
            // @ts-ignore
            throw new Error(error.response?.data?.message || "Error al obtener el tipo de usuario");
        }
        throw new Error("Error al obtener el tipo de usuario");
    }
}

/**
 * Metodo para obtener un tipo de usuario por su nombre
 * @param nombre : string -> nombre del tipo de usuario
 * @returns => Promise<tipoUsuario> -> retorna el tipo de usuario encontrado
 */
async function obtenerTipoUsuarioPorNombre(nombre: string) {
    try {
        const response = await API.get(`/tipos-usuario/nombre/${nombre}`);
        return response.data;
    } catch (error) {
        if (typeof error === "object" && error !== null && "response" in error) {
            // @ts-ignore
            throw new Error(error.response?.data?.message || "Error al obtener el tipo de usuario por nombre");
        }
        throw new Error("Error al obtener el tipo de usuario por nombre");
    }
}

/**
 * Metodo para actualizar un tipo de usuario
 * @param id : number -> id del tipo de usuario
 * @param tipoUsuario : tipoUsuario -> datos del tipo de usuario a actualizar
 * @returns => Promise<tipoUsuario> -> retorna el tipo de usuario actualizado
 */
async function actualizarTipoUsuario(id: number, tipoUsuario: tipoUsuario) {
    try {
        const response = await API.put(`/tipos-usuario/${id}`, tipoUsuario);
        return response.data;
    } catch (error) {
        if (typeof error === "object" && error !== null && "response" in error) {
            // @ts-ignore
            throw new Error(error.response?.data?.message || "Error al actualizar el tipo de usuario");
        }
        throw new Error("Error al actualizar el tipo de usuario");
    }
}

/**
 * Metodo para eliminar un tipo de usuario
 * @param id : number -> id del tipo de usuario
 * @returns => Promise<void> -> retorna void
 */
async function eliminarTipoUsuarioDefinitivo(id: number) {
    try {
        const response = await API.delete(`/tipos-usuario/${id}`);
        return response.data;
    } catch (error) {
        if (typeof error === "object" && error !== null && "response" in error) {
            // @ts-ignore
            throw new Error(error.response?.data?.message || "Error al eliminar el tipo de usuario");
        }
        throw new Error("Error al eliminar el tipo de usuario");
    }
}

/**
 * Metodo para eliminar un tipo de usuario
 * @param id : number -> id del tipo de usuario
 * @returns => Promise<void> -> retorna void
 */
async function eliminarTipoUsuarioSoftDelete(id: number) {
    try {
        const response = await API.delete(`/tipos-usuario/soft/${id}`);
        return response.data;
    } catch (error) {
        if (typeof error === "object" && error !== null && "response" in error) {
            // @ts-ignore
            throw new Error(error.response?.data?.message || "Error al eliminar el tipo de usuario");
        }
        throw new Error("Error al eliminar el tipo de usuario");
    }
}

export default {
    obtenerTiposUsuario,
    obtenerTipoUsuarioPorId,
    obtenerTipoUsuarioPorNombre,
    crearTipoUsuario,
    actualizarTipoUsuario,
    eliminarTipoUsuarioDefinitivo,
    eliminarTipoUsuarioSoftDelete
};