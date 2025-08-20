import API from "@/services/API.services";
import { Roles } from "../interfaces/Roles";

/**
 * Metodo para crear un nuevo rol
 * @param rol : Roles -> datos del rol a crear
 * @returns => Promise<Roles> -> retorna el rol creado
 */
export async function crearRol(rol: Roles) {
    try {
        const response = await API.post('/roles', rol);
        return response.data;
    } catch (error) {
        if (typeof error === "object" && error !== null && "response" in error) {
            // @ts-ignore
            throw new Error(error.response?.data?.message || "Error al crear el rol");
        }
        throw new Error("Error al crear el rol");
    }
}

/**
 * Metodo para obtener todos los roles
 * @returns => Promise<Roles[]> -> retorna la lista de roles
 */
export async function obtenerRoles() {
    try {
        const response = await API.get('/roles');
        return response.data;
    } catch (error) {
        if (typeof error === "object" && error !== null && "response" in error) {
            // @ts-ignore
            throw new Error(error.response?.data?.message || "Error al obtener los roles");
        }
        throw new Error("Error al obtener los roles");
    }
}

/**
 * Metodo para obtener un rol por su ID
 * @param id : number -> id del rol
 * @returns => Promise<Roles> -> retorna el rol encontrado
 */
export async function obtenerRolPorId(id: number) {
    try {
        const response = await API.get(`/roles/${id}`);
        return response.data;
    } catch (error) {
        if (typeof error === "object" && error !== null && "response" in error) {
            // @ts-ignore
            throw new Error(error.response?.data?.message || "Error al obtener el rol");
        }
        throw new Error("Error al obtener el rol");
    }
}

/**
 * Metodo para obtener un rol por su nombre
 * @param nombre : string -> nombre del rol
 * @returns => Promise<Roles> -> retorna el rol encontrado
 */
export async function obtenerRolporNombre(nombre: string) {
    try {
        const response = await API.get(`/roles/nombre/${nombre}`);
        return response.data;
    } catch (error) {
        if (typeof error === "object" && error !== null && "response" in error) {
            // @ts-ignore
            throw new Error(error.response?.data?.message || "Error al obtener el rol");
        }
        throw new Error("Error al obtener el rol");
    }
}

/**
 * Metodo para eliminar un rol
 * @param id : number -> id del rol
 * @returns => Promise<void> -> retorna void
 */
export async function eliminarRol(id: number) {
    try {
        const response = await API.delete(`/roles/${id}`);
        return response.data;
    } catch (error) {
        if (typeof error === "object" && error !== null && "response" in error) {
            // @ts-ignore
            throw new Error(error.response?.data?.message || "Error al eliminar el rol");
        }
        throw new Error("Error al eliminar el rol");
    }
}