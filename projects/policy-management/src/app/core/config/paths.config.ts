import { environment } from "src/environments/environment";

const contex = environment.APIDomain + '/contexto/'; // * Ruta de servicios base

/**
 * * Constante para obtener el endpoint de example
*/
export const EXAMPLE_PATH = contex + 'path-example';
