
/**
 * Error <br>
 * Objeto que representa la estructura de un error
 * @author DREAMCODE <br>
 * @version 1.0
 * @date 01/05/2022
 */
interface Error 
{
    errorCode: string;
    errorDescription: string;
}
/**
 * AppHttpResponse <br>
 * Objeto que representa la estructura de respuesta HTTP de los servicios Back-End
 * @author DREAMCODE <br>
 * @version 1.0
 * @date 01/05/2022
 */
export interface AppHttpResponse<T> 
{
    body: T;
    dataHeader: {
        code: number,
        status: string,
        errorList: Error[],
        hasErrors: boolean,
        currentPage: number,
        totalPage: number,
        totalRecords: number
    };

  }
  
