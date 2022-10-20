import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * @description 
 * * Clase que expone metodos encargados de hacer una solicitud HTTP
 * * Recibe la librería de comunicación de Angular (HttpClient) y el endpoint del servicio
 * @param http: HttpClient
 * @param endpoint: string
 * @author elberthAgredaSB
 * @example proxyHttp.post<T>(AppVariable.login, payload);
*/
export class HttpProxy {

    private url: string; // * Endpoint del servicio

    constructor( private readonly http: HttpClient, private readonly endpoint: string ) {
        this.url = endpoint;
    }

    /**
     * @description 
     * * Metodo que permite ejecutar solicitudes por POST
     * @param service: string
     * @param request: any
    */
    public post<T>( service: string, request: any ): Observable<T> {
        const postHeaders = this.getHeaders();
        return this.http.post<T>( this.url + service, request, postHeaders );
    }

    /**
     * @description 
     * * Metodo que permite ejecutar solicitudes por PUT
     * @param service: string
     * @param request: any
    */
    public put<T>( service: string, request: any ): Observable<T> {
        const putHeaders = this.getHeaders();
        return this.http.put<T>( this.url + service, request, putHeaders );
    }

    /**
     * @description 
     * * Metodo que permite ejecutar solicitudes por GET con Query Params
     * @param service: string
     * @param queryParam: string
    */
    public getQuery<T>( service: string, queryParam: string ): Observable<T> {
        const params = new HttpParams({ fromString: queryParam });
        const tknQuery = localStorage.getItem('tkn');
        const headers = new HttpHeaders({
          Authorization: 'Bearer ' + tknQuery,
          'Content-Type': 'application/json'
        });
        return this.http.get<T>(this.url + service, { headers, params});
    }

    /**
     * @description
     * * Metodo que permite ejecutar solicitudes por GET
     * @param service: string
     * @param path: string
    */
    public get<T>( service: string, path: string ): Observable<T> {
        // const tknQuery = localStorage.getItem('tkn');
        // Authorization: 'Bearer ' + tknQuery,
        const headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
        return this.http.get<T>(this.url + service + path, { headers });
    }

    /** 
     * @description
     * * Metodo que permite ejecutar solicitudes para archivos binarios
     * @param service: string
     * @param queryParam: string
    */
    public binaryData<T>( service: string, queryParam: any ): Observable<T> {
        const tknRbinaryDataequest = localStorage.getItem('tkn');
        const params = new HttpParams({ fromString: queryParam });
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tknRbinaryDataequest,
            Accept: 'application/pdf'
        });
        return this.http.get<T>( this.url + service, { headers, params, responseType: 'blob' as 'json' } );
    }

    /** 
     * @description
     * * Metodo que permite definir las cabeceras para las solicitudes HTTP
     * @returns HttpHeaders
    */
    private getHeaders( ) {
        // const tknRequest = localStorage.getItem('tkn');
        // agregar Authorization: 'Bearer ' + tknRequest, cuando este el token
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return {headers};
    }


}