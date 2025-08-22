import API from "@/services/API.services";
import { Tarea } from "../interfaces/Tareas";

/**
 * Metodo para obtener todas las tareas
 * @returns => Promise<Tarea[]> -> retorna la lista de tareas
 */
export async function obtenerTareas() {
  try {
    const response = await API.get("/tareas");
    return response.data;
  } catch (error) {
    if (typeof error === "object" && error !== null && "response" in error) {
      // @ts-ignore
      throw new Error(error.response.data.message || "Error al obtener las tareas");
    }
    throw new Error("Error desconocido al obtener las tareas");
  }
}

/**
 * Metodo para obtener una tarea por su ID
 * @param id : number -> id de la tarea
 * @returns => Promise<Tarea> -> retorna la tarea encontrada
 */
export async function obtenerTareaPorID(id: number) {
  try {
    const response = await API.get(`/tarea/${id}`);
    return response.data;
  } catch (error) {
    if (typeof error === "object" && error !== null && "response" in error) {
      // @ts-ignore
      throw new Error(error.response.data.message || "Error al obtener la tarea");
    }
    throw new Error("Error desconocido al obtener la tarea");
  }
}

/**
 * Metodo para crear una nueva tarea
 * @param tarea : Tarea -> datos de la tarea a crear
 * @returns => Promise<Tarea> -> retorna la tarea creada
 */
export async function crearTarea(tarea: Tarea) {
    try {
        const response = await API.post("/tareas", tarea);
        return response.data;
    } catch (error) {
        if (typeof error === "object" && error !== null && "response" in error) {
            // @ts-ignore
            throw new Error(error.response.data.message || "Error al crear la tarea");
        }
        throw new Error("Error desconocido al crear la tarea");
    }
}

/**
 * Metodo para buscar tareas por usuario
 * @param id : { usuarioId: number } -> id del usuario
 * @returns => Promise<Tarea[]> -> retorna la lista de tareas del usuario
 */
export async function buscarTareasPorUsuario(id: { usuarioId: number }) {
    try {
        const response = await API.get("/tareas", { params: { usuarioId: id.usuarioId } });
        return response.data;
    } catch (error) {
        if (typeof error === "object" && error !== null && "response" in error) {
            // @ts-ignore
            throw new Error(error.response.data.message || "Error al buscar tareas por usuario");
        }
        throw new Error("Error desconocido al buscar tareas por usuario");
    }
}

/**
 * Metodo para actualizar una tarea
 * @param id : number -> id de la tarea
 * @param tarea : Tarea -> datos de la tarea a actualizar
 * @returns => Promise<Tarea> -> retorna la tarea actualizada
 */
export async function actualizarTarea(id: number, tarea: Tarea) {
    try {
        const response = await API.put(`/tareas/${id}`, tarea);
        return response.data;
    } catch (error) {
        if (typeof error === "object" && error !== null && "response" in error) {
            // @ts-ignore
            throw new Error(error.response.data.message || "Error al actualizar la tarea");
        }
        throw new Error("Error desconocido al actualizar la tarea");
    }
}

/**
 * Metodo para eliminar una tarea
 * @param id : number -> id de la tarea
 * @returns => Promise<void> -> retorna void
 */
export async function eliminarTareaPermanente(id: number) {
    try {
        const response = await API.delete(`/tareas/soft/${id}`);
        return response.data;
    } catch (error) {
        if (typeof error === "object" && error !== null && "response" in error) {
            // @ts-ignore
            throw new Error(error.response.data.message || "Error al eliminar la tarea");
        }
        throw new Error("Error desconocido al eliminar la tarea");
    }
}