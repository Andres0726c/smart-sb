import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';


@Injectable({providedIn: "root"})
export class SoapService {

  constructor(private http: HttpClient) { }

  sendSOAPMessage() {
    const soapEnvelope: string = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://services.segurosbolivar.com/simon/ventas/1.0">
       <soapenv:Header/>
       <soapenv:Body>
          <ns:ExpidePolizasRequest>
             <productos>
                <infoProceso>
                   <modulo>2</modulo>
                   <proceso>261</proceso>
                   <subproceso>260</subproceso>
                   <codCia>3</codCia>
                   <codSecc>23</codSecc>
                   <codProducto>103</codProducto>
                   <subproducto>348</subproducto>
                   <codUsr>860034313</codUsr>
                   <entidadColocadora>43</entidadColocadora>
                   <canal>3</canal>
                   <sistemaOrigen>123</sistemaOrigen>
                   <info1>12</info1>
                </infoProceso>
                <datosGenerales>
                   <polizaPpal>3552000000301</polizaPpal>
                   <periodoFact>12</periodoFact>
                   <codMon>1</codMon>
                   <forCobro>CC</forCobro>
                   <vigDesde>2023-01-04</vigDesde>
                </datosGenerales>
                <agentes>
                   <codAgente>
                      <codigo>77997</codigo>
                   </codAgente>
                </agentes>
                <terceros>
                   <tipoDocumento>NT</tipoDocumento>
                   <numeroDocumento>860034313</numeroDocumento>
                   <razonSocial>DAVIVIENDA</razonSocial>
                   <fechaNacimiento>2016-10-19</fechaNacimiento>
                   <direccion>kra 1 1-50</direccion>
                   <ciudad>
                      <codigo>16911001000</codigo>
                   </ciudad>
                   <telefono>2280228</telefono>
                </terceros>
                <terceros>
                   <tipoDocumento>CC</tipoDocumento>
                   <numeroDocumento>79417851</numeroDocumento>
                   <codRies>1</codRies>
                   <nombres>MANUEL ARCADIO</nombres>
                   <apellidos>ORJUELA</apellidos>
                   <razonSocial></razonSocial>
                   <fechaNacimiento>1960-10-19</fechaNacimiento>
                   <edad>56</edad>
                   <sexo>M</sexo>
                   <direccion>Kra 1 11-90</direccion>
                   <ciudad>
                      <codigo>16911001000</codigo>
                   </ciudad>
                   <ocupacion>
                      <codigo></codigo>
                   </ocupacion>
                   <telefono>4600908</telefono>
                   <email>prueba@segurosbolivar.com</email>
                </terceros>
                <debitos>
                   <codEntidad>
                      <codigo>123</codigo>
                      <valor>123</valor>
                   </codEntidad>
                   <canalDescto>
                      <codigo>TC</codigo>
                      <valor>TC</valor>
                   </canalDescto>
                   <nroCuenta>123456</nroCuenta>
                   <codIdentif>
                      <codigo>987654321</codigo>
                      <valor>987654321</valor>
                   </codIdentif>
                   <fechaVto>20231</fechaVto>
                   <nombreIden>alguien</nombreIden>
                   <direcIden>calle 1 # 1-23</direcIden>
                   <ciudadIden>
                      <codigo>cali</codigo>
                      <valor>cali</valor>
                   </ciudadIden>
                   <telefonoIden>3009871652</telefonoIden>
                   <tipoDocCtaHabiente>
                      <codigo>CC</codigo>
                      <valor>CC</valor>
                   </tipoDocCtaHabiente>
                   <secterCtaHabiente>12</secterCtaHabiente>
                   <tcNroCuotas>1</tcNroCuotas>
                   <email>alguien@gmail.com</email>
                </debitos>
                <riesgos>
                   <datosVariables>
                      <codRies>1</codRies>
                      <region>A2000020</region>
                      <nroRegistro>7</nroRegistro>
                      <codCampo>ALTERNATIVA</codCampo>
                      <valorCampo>1</valorCampo>
                   </datosVariables>
                   <datosVariables>
                      <codRies>1</codRies>
                      <region>A2000020</region>
                      <nroRegistro>7</nroRegistro>
                      <codCampo>MODELO_BIC</codCampo>
                      <valorCampo>3</valorCampo>
                   </datosVariables>
                   <datosVariables>
                      <codRies>1</codRies>
                      <region>A2000020</region>
                      <nroRegistro>9</nroRegistro>
                      <codCampo>BIEN_ASEGURADO</codCampo>
                      <valorCampo>001</valorCampo>
                   </datosVariables>
                   <datosVariables>
                      <codRies>1</codRies>
                      <region>A2000020</region>
                      <nroRegistro>4</nroRegistro>
                      <codCampo>TIPO_DOC_ASEG</codCampo>
                      <valorCampo>CC</valorCampo>
                   </datosVariables>
                   <datosVariables>
                      <codRies>1</codRies>
                      <region>A2000020</region>
                      <nroRegistro>5</nroRegistro>
                      <codCampo>COD_ASEG</codCampo>
                      <valorCampo>79417851</valorCampo>
                   </datosVariables>
                   <datosVariables>
                      <codRies>1</codRies>
                      <region>A2000020</region>
                      <nroRegistro>1</nroRegistro>
                      <codCampo>CPOS_RIES</codCampo>
                      <valorCampo>16911001000</valorCampo>
                   </datosVariables>
                   <datosVariables>
                      <codRies>1</codRies>
                      <region>A2000020</region>
                      <nroRegistro>8</nroRegistro>
                      <codCampo>DIR_COM_ASEG</codCampo>
                      <valorCampo>calle 15 n 18-60</valorCampo>
                   </datosVariables>
                   <datosVariables>
                      <codRies>1</codRies>
                      <region>A2000020</region>
                      <nroRegistro>8</nroRegistro>
                      <codCampo>FECHA_NCMNTO</codCampo>
                      <valorCampo>01122016</valorCampo>
                   </datosVariables>
                   <datosVariables>
                      <codRies>1</codRies>
                      <region>A2000020</region>
                      <nroRegistro>8</nroRegistro>
                      <codCampo>MARCA_RAZA</codCampo>
                      <valorCampo>BIGOL</valorCampo>
                   </datosVariables>
                   <datosVariables>
                      <codRies>1</codRies>
                      <region>A2000020</region>
                      <nroRegistro>8</nroRegistro>
                      <codCampo>NOMBRE_MASCOTA</codCampo>
                      <valorCampo>KIARA</valorCampo>
                   </datosVariables>
                   <datosVariables>
                      <codRies>1</codRies>
                      <region>A2000020</region>
                      <nroRegistro>6</nroRegistro>
                      <codCampo>OPCION_ASEG</codCampo>
                      <valorCampo>2</valorCampo>
                   </datosVariables>
                   <datosVariables>
                      <codRies>1</codRies>
                      <region>A2000020</region>
                      <nroRegistro>2</nroRegistro>
                      <codCampo>NRO_CUENTA</codCampo>
                      <valorCampo>123497</valorCampo>
                   </datosVariables>
                </riesgos>
             </productos>
          </ns:ExpidePolizasRequest>
       </soapenv:Body>
    </soapenv:Envelope>`;

    this.http.get('https://ambientepruebas.segurosbolivar.com/BolivarVentasWS/VentasXinternetService', {
      params: new HttpParams()
        .set('envelope', soapEnvelope),
      headers: new HttpHeaders()
        .set('Content-Type', 'text/xml; charset=utf-8')
        .set('Access-Control-Allow-Origin', '*'),
      responseType: 'text'
    }).subscribe(
      (res: string) => {
        console.log(res);
      },
      (err: any) => console.log(err)
    );
  }
}
