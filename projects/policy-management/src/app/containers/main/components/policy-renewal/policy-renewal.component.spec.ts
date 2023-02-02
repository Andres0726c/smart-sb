import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductService } from 'projects/policy-management/src/app/core/services/product/product.service';
import { ModalPolicyActionsService } from 'projects/policy-management/src/app/shared/components/modal-policy-actions/services/modal-policy-actions.service';
import { of } from 'rxjs';
import { PolicyRenewalComponent } from './policy-renewal.component';

describe('PolicyRenewalComponent', () => {
  let component: PolicyRenewalComponent;
  let fixture: ComponentFixture<PolicyRenewalComponent>;
  let productService: ProductService;
  let modalAPService: ModalPolicyActionsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ PolicyRenewalComponent ],
      providers: [DynamicDialogRef, DynamicDialogConfig, DialogService, MessageService, FormBuilder],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyRenewalComponent);
    component = fixture.componentInstance;
    productService = fixture.debugElement.injector.get(ProductService);
    modalAPService = fixture.debugElement.injector.get(ModalPolicyActionsService);

    component.config = {
      data: {
        policy: {
            policyBasic: {
                policyNumber: '123'
            }
        }
      }
    };

    const res = {
      "body": {
        "prdct": "producto_seguro_mascota",
        "plcy": {
            "rqstNmbr": "406",
            "plcyNmbr": "100000000000393",
            "mnPlcyNmbr": "0",
            "endrsmntNmbr": "0",
            "chngActvtyTyp": "EMI_ORI",
            "plcyDtGrp": {
                "datos_basicos": {
                    "MONEDA": "COP",
                    "COD_AGENTE": "ABC123",
                    "PERIODO_FACT": "1",
                    "FECHA_EMISION": "2022-11-11T12:53:00-05:00",
                    "OBSERVACIONES": "Esto es una observacion",
                    "NRO_ID_TOMADOR": "123458676",
                    "FEC_FIN_VIG_POL": "2023-01-31T12:53:00-05:00",
                    "FEC_INI_VIG_POL": "2022-11-01T12:53:00-05:00",
                    "TIPO_DOC_TOMADOR": "CC",
                    "NOMBRE_DEL_AGENTE": "José Gallego",
                    "NOMBRE_DEL_TOMADOR": "Jorge Bermudez"
                },
                "gd002_datosdedebito": {
                    "METODO_PAGO": "MPG_EFT"
                }
            },
            "rsk": {
                "1": {
                    "rskTyp": "2",
                    "rskDtGrp": {
                        "datos_basicos": {
                            "RAZA": "A",
                            "EDAD_MASCOTA": "10",
                            "TIPO_MASCOTA": "1",
                            "NOMBRE_MASCOTA": "Luna"
                        },
                        "gd002_datosasegurado": {
                            "APE_ASEG": "Echeverry",
                            "NOM_ASEG": "Pablo Andrés",
                            "CPOS_RIES": "05030",
                            "NRO_ID_ASEGURADO": "55551121",
                            "TIPO_DOC_ASEGURADO": "CC"
                        }
                    }
                }
            }
        }
      },
      "dataHeader": {
          "code": 200,
          "status": "OK",
          "errorList": [],
          "hasErrors": false,
          "currentPage": 0,
          "totalPage": 0,
          "totalRecords": 0
      }
    };

    component.config.data.policy.policyData = res.body;

    const resProduct = {
      "body": {
          "id": 68,
          "nmName": "Producto seguro mascota",
          "dsDescription": "SEGUROS COMERCIALES BOLÍVAR S.A.",
          "nmContent": {
              "policyData": [
                  {
                      "id": 1,
                      "name": "Datos básicos",
                      "code": "datos_basicos",
                      "fields": [
                        {
                            "id": 62,
                            "code": {
                                "version": 1,
                                "businessCode": "FECHA_EMISION"
                            },
                            "name": "Fecha de emisión",
                            "label": "Fecha de emisión",
                            "dataType": {
                                "code": "TDT1",
                                "name": "text",
                                "description": "Dato alfanumerico",
                                "bdFieldType": "Varchar",
                                "guiComponent": "Text box",
                                "lenght": 10,
                                "precision": 0,
                                "scale": 0
                            },
                            "initializeRule": [],
                            "validateRule": [],
                            "dependency": null,
                            "required": true,
                            "editable": true,
                            "visible": true,
                            "businessCode": "FECHA_EMISION",
                            "domainList": null
                        },
                        {
                            "id": 67,
                            "code": {
                                "version": 1,
                                "businessCode": "FEC_INI_VIG_POL"
                            },
                            "name": "Fecha inicio vigencia de la póliza",
                            "label": "Fecha inicio vigencia de la póliza",
                            "dataType": {
                                "code": "TDD1",
                                "name": "date",
                                "description": "dd/MM/yyyy",
                                "bdFieldType": "Date",
                                "guiComponent": "Calendar",
                                "lenght": 10,
                                "precision": 0,
                                "scale": 0
                            },
                            "initializeRule": [],
                            "validateRule": [],
                            "dependency": null,
                            "required": true,
                            "editable": true,
                            "visible": true,
                            "businessCode": "FEC_INI_VIG_POL",
                            "domainList": null
                        },
                        {
                            "id": 68,
                            "code": {
                                "version": 1,
                                "businessCode": "FEC_FIN_VIG_POL"
                            },
                            "name": "Fecha fin de vigencia de la póliza",
                            "label": "Fecha fin de vigencia de la póliza",
                            "dataType": {
                                "code": "TDD1",
                                "name": "date",
                                "description": "dd/MM/yyyy",
                                "bdFieldType": "Date",
                                "guiComponent": "Calendar",
                                "lenght": 10,
                                "precision": 0,
                                "scale": 0
                            },
                            "initializeRule": [],
                            "validateRule": [],
                            "dependency": null,
                            "required": true,
                            "editable": true,
                            "visible": true,
                            "businessCode": "FEC_FIN_VIG_POL",
                            "domainList": null
                        },
                        {
                            "id": 69,
                            "code": {
                                "version": 1,
                                "businessCode": "TIPO_DOC_TOMADOR"
                            },
                            "name": "Tipo de documento del tomador",
                            "label": "Tipo de documento del tomador",
                            "dataType": {
                                "code": "TDL1",
                                "name": "text",
                                "description": "Lista desplegable",
                                "bdFieldType": "Varchar",
                                "guiComponent": "List box",
                                "lenght": 10,
                                "precision": 0,
                                "scale": 0
                            },
                            "initializeRule": [],
                            "validateRule": [],
                            "dependency": null,
                            "required": true,
                            "editable": true,
                            "visible": true,
                            "businessCode": "TIPO_DOC_TOMADOR",
                            "domainList": {
                                "code": "LDM_TPI",
                                "name": "Tipos de identificación",
                                "description": "Tipos de identificación",
                                "valueList": "[{\"url\": \"/emisor/v1/identificationtype/findAllIdentification\", \"rlEngnCd\": \"MTR_SMT\"}]"
                            }
                        },
                        {
                            "id": 70,
                            "code": {
                                "version": 1,
                                "businessCode": "NRO_ID_TOMADOR"
                            },
                            "name": "Número de identificación del tomador",
                            "label": "Número de identificación del tomador",
                            "dataType": {
                                "code": "TDN1",
                                "name": "number",
                                "description": "Dato numerico",
                                "bdFieldType": "Integer",
                                "guiComponent": "Text box",
                                "lenght": 10,
                                "precision": 0,
                                "scale": 0
                            },
                            "initializeRule": [],
                            "validateRule": [],
                            "dependency": null,
                            "required": true,
                            "editable": true,
                            "visible": true,
                            "businessCode": "NRO_ID_TOMADOR",
                            "domainList": null
                        },
                        {
                            "id": 71,
                            "code": {
                                "version": 1,
                                "businessCode": "MONEDA"
                            },
                            "name": "Moneda",
                            "label": "Moneda",
                            "dataType": {
                                "code": "TDL1",
                                "name": "text",
                                "description": "Lista desplegable",
                                "bdFieldType": "Varchar",
                                "guiComponent": "List box",
                                "lenght": 10,
                                "precision": 0,
                                "scale": 0
                            },
                            "initializeRule": [],
                            "validateRule": [],
                            "dependency": null,
                            "required": true,
                            "editable": true,
                            "visible": true,
                            "businessCode": "MONEDA",
                            "domainList": null
                        },
                        {
                            "id": 72,
                            "code": {
                                "version": 1,
                                "businessCode": "PERIODO_FACT"
                            },
                            "name": "Periodo de facturación",
                            "label": "Periodo de facturación",
                            "dataType": {
                                "code": "TDL1",
                                "name": "text",
                                "description": "Lista desplegable",
                                "bdFieldType": "Varchar",
                                "guiComponent": "List box",
                                "lenght": 10,
                                "precision": 0,
                                "scale": 0
                            },
                            "initializeRule": [],
                            "validateRule": [],
                            "dependency": null,
                            "required": true,
                            "editable": true,
                            "visible": true,
                            "businessCode": "PERIODO_FACT",
                            "domainList": null
                        },
                        {
                            "id": 73,
                            "code": {
                                "version": 1,
                                "businessCode": "OBSERVACIONES"
                            },
                            "name": "Observaciones",
                            "label": "Observaciones",
                            "dataType": {
                                "code": "TDT1",
                                "name": "text",
                                "description": "Dato alfanumerico",
                                "bdFieldType": "Varchar",
                                "guiComponent": "Text box",
                                "lenght": 10,
                                "precision": 0,
                                "scale": 0
                            },
                            "initializeRule": [],
                            "validateRule": [],
                            "dependency": null,
                            "required": true,
                            "editable": true,
                            "visible": true,
                            "businessCode": "OBSERVACIONES",
                            "domainList": null
                        },
                        {
                            "id": 74,
                            "code": {
                                "version": 1,
                                "businessCode": "COD_AGENTE"
                            },
                            "name": "Código de agente",
                            "label": "Código de agente",
                            "dataType": {
                                "code": "TDN1",
                                "name": "number",
                                "description": "Dato numerico",
                                "bdFieldType": "Integer",
                                "guiComponent": "Text box",
                                "lenght": 10,
                                "precision": 0,
                                "scale": 0
                            },
                            "initializeRule": [],
                            "validateRule": [],
                            "dependency": null,
                            "required": true,
                            "editable": true,
                            "visible": true,
                            "businessCode": "COD_AGENTE",
                            "domainList": null
                        },
                        {
                            "id": 129,
                            "code": {
                                "version": 1,
                                "businessCode": "NOMBRE_DEL_TOMADOR"
                            },
                            "name": "Nombre del tomador",
                            "label": "Nombre del tomador",
                            "dataType": {
                                "code": "TDT9",
                                "name": "Descripcion",
                                "description": "",
                                "bdFieldType": "Varchar",
                                "guiComponent": "Text box",
                                "lenght": 10,
                                "precision": 0,
                                "scale": 0
                            },
                            "initializeRule": [],
                            "validateRule": [],
                            "dependency": null,
                            "required": true,
                            "editable": true,
                            "visible": true,
                            "businessCode": "NOMBRE_DEL_TOMADOR",
                            "domainList": null
                        },
                        {
                            "id": 130,
                            "code": {
                                "version": 1,
                                "businessCode": "NOMBRE_DEL_AGENTE"
                            },
                            "name": "Nombre del agente",
                            "label": "Nombre del agente",
                            "dataType": {
                                "code": "TDT9",
                                "name": "Descripcion",
                                "description": "",
                                "bdFieldType": "Varchar",
                                "guiComponent": "Text box",
                                "lenght": 10,
                                "precision": 0,
                                "scale": 0
                            },
                            "initializeRule": [],
                            "validateRule": [],
                            "dependency": null,
                            "required": false,
                            "editable": true,
                            "visible": true,
                            "businessCode": "NOMBRE_DEL_AGENTE",
                            "domainList": null
                        }
                    ]
                  }
              ],
              "riskTypes": [
                  {
                      "id": 2,
                      "code": {
                          "businessCode": "2"
                      },
                      "name": "Mascota",
                      "description": "Tipo de riesgo Mascota",
                      "complementaryData": [
                          {
                              "id": 1,
                              "name": "Datos básicos",
                              "code": "datos_basicos",
                              "fields": [
                                  {
                                      "id": 57,
                                      "code": {
                                          "version": 1,
                                          "businessCode": "RAZA"
                                      },
                                      "name": "Raza de la mascota",
                                      "label": "Raza de la mascota",
                                      "dataType": {
                                          "code": "TDT1",
                                          "name": "text",
                                          "description": "Dato alfanumerico",
                                          "bdFieldType": "Varchar",
                                          "guiComponent": "Text box",
                                          "lenght": 10,
                                          "precision": 0,
                                          "scale": 0
                                      },
                                      "initializeRule": [],
                                      "validateRule": [],
                                      "dependency": null,
                                      "required": false,
                                      "editable": true,
                                      "visible": true,
                                      "businessCode": "RAZA",
                                      "domainList": {
                                          "code": "RAZA_MASCOTAS",
                                          "name": "Razas de mascotas",
                                          "description": "Razas de mascotas",
                                          "valueList": "[{\"code\": \"1\", \"description\": \"Affenpinscher\", \"code_petType\": \"1\"}, {\"code\": \"2\", \"description\": \"Airedale terrier\", \"code_petType\": \"1\"}, {\"code\": \"3\", \"description\": \"Aïdi\", \"code_petType\": \"1\"}, {\"code\": \"4\", \"description\": \"Akita Inu\", \"code_petType\": \"1\"}, {\"code\": \"5\", \"description\": \"Akita Americano\", \"code_petType\": \"1\"}, {\"code\": \"6\", \"description\": \"Alano español\", \"code_petType\": \"1\"}, {\"code\": \"7\", \"description\": \"Alaskan malamute\", \"code_petType\": \"1\"}, {\"code\": \"8\", \"description\": \"Alaskan Klee Kai\", \"code_petType\": \"1\"}, {\"code\": \"9\", \"description\": \"American Hairless terrier\", \"code_petType\": \"1\"}, {\"code\": \"10\", \"description\": \"American Staffordshire Terrier\", \"code_petType\": \"1\"}, {\"code\": \"11\", \"description\": \"Antiguo Perro Pastor Inglés\", \"code_petType\": \"1\"}, {\"code\": \"12\", \"description\": \"Appenzeller\", \"code_petType\": \"1\"}, {\"code\": \"13\", \"description\": \"Australian Cattle Dog\", \"code_petType\": \"1\"}, {\"code\": \"14\", \"description\": \"Australian terrier\", \"code_petType\": \"1\"}, {\"code\": \"15\", \"description\": \"Australian Silky Terrier\", \"code_petType\": \"1\"}, {\"code\": \"16\", \"description\": \"Azawakh\", \"code_petType\": \"1\"}, {\"code\": \"17\", \"description\": \"Bardino (Perro majorero)\", \"code_petType\": \"1\"}, {\"code\": \"18\", \"description\": \"Bandog\", \"code_petType\": \"1\"}, {\"code\": \"19\", \"description\": \"Basenji\", \"code_petType\": \"1\"}, {\"code\": \"20\", \"description\": \"Basset azul de Gascuña\", \"code_petType\": \"1\"}, {\"code\": \"21\", \"description\": \"Basset hound\", \"code_petType\": \"1\"}, {\"code\": \"22\", \"description\": \"Beagle\", \"code_petType\": \"1\"}, {\"code\": \"23\", \"description\": \"Beauceron\", \"code_petType\": \"1\"}, {\"code\": \"24\", \"description\": \"Bedlington terrier\", \"code_petType\": \"1\"}, {\"code\": \"25\", \"description\": \"Bergamasco\", \"code_petType\": \"1\"}, {\"code\": \"26\", \"description\": \"Bichon frisé\", \"code_petType\": \"1\"}, {\"code\": \"27\", \"description\": \"Bichón maltés\", \"code_petType\": \"1\"}, {\"code\": \"28\", \"description\": \"Bichón habanero\", \"code_petType\": \"1\"}, {\"code\": \"29\", \"description\": \"Bobtail\", \"code_petType\": \"1\"}, {\"code\": \"30\", \"description\": \"Bloodhound\", \"code_petType\": \"1\"}, {\"code\": \"31\", \"description\": \"Border collie\", \"code_petType\": \"1\"}, {\"code\": \"32\", \"description\": \"Borzoi\", \"code_petType\": \"1\"}, {\"code\": \"33\", \"description\": \"Boston terrier\", \"code_petType\": \"1\"}, {\"code\": \"34\", \"description\": \"Bóxer\", \"code_petType\": \"1\"}, {\"code\": \"35\", \"description\": \"Boyero de Berna\", \"code_petType\": \"1\"}, {\"code\": \"36\", \"description\": \"Boyero de Flandes\", \"code_petType\": \"1\"}, {\"code\": \"37\", \"description\": \"Braco alemán de pelo corto\", \"code_petType\": \"1\"}, {\"code\": \"38\", \"description\": \"Braco alemán de pelo duro\", \"code_petType\": \"1\"}, {\"code\": \"39\", \"description\": \"Braco de Auvernia\", \"code_petType\": \"1\"}, {\"code\": \"40\", \"description\": \"Braco francés\", \"code_petType\": \"1\"}, {\"code\": \"41\", \"description\": \"Braco húngaro\", \"code_petType\": \"1\"}, {\"code\": \"42\", \"description\": \"Braco italiano\", \"code_petType\": \"1\"}, {\"code\": \"43\", \"description\": \"Braco tirolés\", \"code_petType\": \"1\"}, {\"code\": \"44\", \"description\": \"Braco de Saint Germain\", \"code_petType\": \"1\"}, {\"code\": \"45\", \"description\": \"Braco de Weimar\", \"code_petType\": \"1\"}, {\"code\": \"46\", \"description\": \"Bull Terrier\", \"code_petType\": \"1\"}, {\"code\": \"47\", \"description\": \"Bulldog americano\", \"code_petType\": \"1\"}, {\"code\": \"48\", \"description\": \"Bulldog francés\", \"code_petType\": \"1\"}, {\"code\": \"49\", \"description\": \"Bulldog inglés\", \"code_petType\": \"1\"}, {\"code\": \"50\", \"description\": \"Bullmastiff\", \"code_petType\": \"1\"}, {\"code\": \"51\", \"description\": \"Buhund noruego\", \"code_petType\": \"1\"}, {\"code\": \"52\", \"description\": \"Calupoh\", \"code_petType\": \"1\"}, {\"code\": \"53\", \"description\": \"Can de palleiro\", \"code_petType\": \"1\"}, {\"code\": \"54\", \"description\": \"Caniche\", \"code_petType\": \"1\"}, {\"code\": \"55\", \"description\": \"Cão da Serra da Estrela\", \"code_petType\": \"1\"}, {\"code\": \"56\", \"description\": \"Cão da Serra de Aires\", \"code_petType\": \"1\"}, {\"code\": \"57\", \"description\": \"Cão de Agua Português\", \"code_petType\": \"1\"}, {\"code\": \"58\", \"description\": \"Cão de Castro Laboreiro\", \"code_petType\": \"1\"}, {\"code\": \"59\", \"description\": \"Cão de Fila de São Miguel\", \"code_petType\": \"1\"}, {\"code\": \"60\", \"description\": \"Cavalier King Charles Spaniel\", \"code_petType\": \"1\"}, {\"code\": \"61\", \"description\": \"Cazador de alces noruego\", \"code_petType\": \"1\"}, {\"code\": \"62\", \"description\": \"Chesapeake Bay Retriever\", \"code_petType\": \"1\"}, {\"code\": \"63\", \"description\": \"Chihuahueño\", \"code_petType\": \"1\"}, {\"code\": \"64\", \"description\": \"Crestado Chino\", \"code_petType\": \"1\"}, {\"code\": \"65\", \"description\": \"Cimarrón Uruguayo\", \"code_petType\": \"1\"}, {\"code\": \"66\", \"description\": \"Cirneco del Etna\", \"code_petType\": \"1\"}, {\"code\": \"67\", \"description\": \"Chow chow\", \"code_petType\": \"1\"}, {\"code\": \"68\", \"description\": \"Clumber spaniel\", \"code_petType\": \"1\"}, {\"code\": \"69\", \"description\": \"Cobrador de pelo liso\", \"code_petType\": \"1\"}, {\"code\": \"70\", \"description\": \"Cocker spaniel americano\", \"code_petType\": \"1\"}, {\"code\": \"71\", \"description\": \"Cocker spaniel inglés\", \"code_petType\": \"1\"}, {\"code\": \"72\", \"description\": \"Collie de pelo corto\", \"code_petType\": \"1\"}, {\"code\": \"73\", \"description\": \"Collie de pelo largo\", \"code_petType\": \"1\"}, {\"code\": \"74\", \"description\": \"Bearded collie\", \"code_petType\": \"1\"}, {\"code\": \"75\", \"description\": \"Corgi galés de Cardigan\", \"code_petType\": \"1\"}, {\"code\": \"76\", \"description\": \"Dachshund\", \"code_petType\": \"1\"}, {\"code\": \"77\", \"description\": \"Dálmata\", \"code_petType\": \"1\"}, {\"code\": \"78\", \"description\": \"Dandie Dinmont Terrier\", \"code_petType\": \"1\"}, {\"code\": \"79\", \"description\": \"Deerhound\", \"code_petType\": \"1\"}, {\"code\": \"80\", \"description\": \"Dobermann\", \"code_petType\": \"1\"}, {\"code\": \"81\", \"description\": \"Dogo alemán\", \"code_petType\": \"1\"}, {\"code\": \"82\", \"description\": \"Dogo argentino\", \"code_petType\": \"1\"}, {\"code\": \"83\", \"description\": \"Dogo de burdeos\", \"code_petType\": \"1\"}, {\"code\": \"84\", \"description\": \"Dogo del Tíbet\", \"code_petType\": \"1\"}, {\"code\": \"85\", \"description\": \"Dogo guatemalteco\", \"code_petType\": \"1\"}, {\"code\": \"86\", \"description\": \"English springer spaniel\", \"code_petType\": \"1\"}, {\"code\": \"87\", \"description\": \"Entlebucher\", \"code_petType\": \"1\"}, {\"code\": \"88\", \"description\": \"Épagneul bretón\", \"code_petType\": \"1\"}, {\"code\": \"89\", \"description\": \"Épagneul français\", \"code_petType\": \"1\"}, {\"code\": \"90\", \"description\": \"Epagneul papillón\", \"code_petType\": \"1\"}, {\"code\": \"91\", \"description\": \"Eurasier\", \"code_petType\": \"1\"}, {\"code\": \"92\", \"description\": \"Fila Brasileiro\", \"code_petType\": \"1\"}, {\"code\": \"93\", \"description\": \"Flat-Coated Retriever\", \"code_petType\": \"1\"}, {\"code\": \"94\", \"description\": \"Fox Terrier\", \"code_petType\": \"1\"}, {\"code\": \"95\", \"description\": \"Foxhound americano\", \"code_petType\": \"1\"}, {\"code\": \"96\", \"description\": \"Galgo español\", \"code_petType\": \"1\"}, {\"code\": \"97\", \"description\": \"Galgo húngaro\", \"code_petType\": \"1\"}, {\"code\": \"98\", \"description\": \"Galgo inglés\", \"code_petType\": \"1\"}, {\"code\": \"99\", \"description\": \"Galgo italiano\", \"code_petType\": \"1\"}, {\"code\": \"100\", \"description\": \"Golden retriever\", \"code_petType\": \"1\"}, {\"code\": \"101\", \"description\": \"Glen of Imaal Terrier\", \"code_petType\": \"1\"}, {\"code\": \"102\", \"description\": \"Gran danés\", \"code_petType\": \"1\"}, {\"code\": \"103\", \"description\": \"Gegar colombiano\", \"code_petType\": \"1\"}, {\"code\": \"104\", \"description\": \"Greyhound\", \"code_petType\": \"1\"}, {\"code\": \"105\", \"description\": \"Grifón belga\", \"code_petType\": \"1\"}, {\"code\": \"106\", \"description\": \"Hovawart\", \"code_petType\": \"1\"}, {\"code\": \"107\", \"description\": \"Husky siberiano\", \"code_petType\": \"1\"}, {\"code\": \"108\", \"description\": \"Jack Russell Terrier\", \"code_petType\": \"1\"}, {\"code\": \"109\", \"description\": \"Keeshond\", \"code_petType\": \"1\"}, {\"code\": \"110\", \"description\": \"Kerry blue terrier\", \"code_petType\": \"1\"}, {\"code\": \"111\", \"description\": \"Komondor\", \"code_petType\": \"1\"}, {\"code\": \"112\", \"description\": \"Kuvasz\", \"code_petType\": \"1\"}, {\"code\": \"113\", \"description\": \"Labrador\", \"code_petType\": \"1\"}, {\"code\": \"114\", \"description\": \"Lakeland Terrier\", \"code_petType\": \"1\"}, {\"code\": \"115\", \"description\": \"Laekenois\", \"code_petType\": \"1\"}, {\"code\": \"116\", \"description\": \"Landseer\", \"code_petType\": \"1\"}, {\"code\": \"117\", \"description\": \"Lebrel afgano\", \"code_petType\": \"1\"}, {\"code\": \"118\", \"description\": \"Lebrel polaco\", \"code_petType\": \"1\"}, {\"code\": \"119\", \"description\": \"Leonberger\", \"code_petType\": \"1\"}, {\"code\": \"120\", \"description\": \"Lobero irlandés\", \"code_petType\": \"1\"}, {\"code\": \"121\", \"description\": \"Lundehund\", \"code_petType\": \"1\"}, {\"code\": \"122\", \"description\": \"Perro lobo de Saarloos\", \"code_petType\": \"1\"}, {\"code\": \"123\", \"description\": \"Lhasa apso\", \"code_petType\": \"1\"}, {\"code\": \"124\", \"description\": \"Löwchen\", \"code_petType\": \"1\"}, {\"code\": \"125\", \"description\": \"Maltés\", \"code_petType\": \"1\"}, {\"code\": \"126\", \"description\": \"Malinois\", \"code_petType\": \"1\"}, {\"code\": \"127\", \"description\": \"Manchester terrier\", \"code_petType\": \"1\"}, {\"code\": \"128\", \"description\": \"Mastín afgano\", \"code_petType\": \"1\"}, {\"code\": \"129\", \"description\": \"Mastín del Pirineo\", \"code_petType\": \"1\"}, {\"code\": \"130\", \"description\": \"Mastín español\", \"code_petType\": \"1\"}, {\"code\": \"131\", \"description\": \"Mastín inglés\", \"code_petType\": \"1\"}, {\"code\": \"132\", \"description\": \"Mastín italiano\", \"code_petType\": \"1\"}, {\"code\": \"133\", \"description\": \"Mastín napolitano\", \"code_petType\": \"1\"}, {\"code\": \"134\", \"description\": \"Mastín tibetano\", \"code_petType\": \"1\"}, {\"code\": \"135\", \"description\": \"Mucuchies\", \"code_petType\": \"1\"}, {\"code\": \"136\", \"description\": \"Mudi\", \"code_petType\": \"1\"}, {\"code\": \"137\", \"description\": \"Münsterländer grande\", \"code_petType\": \"1\"}, {\"code\": \"138\", \"description\": \"Münsterländer pequeño\", \"code_petType\": \"1\"}, {\"code\": \"139\", \"description\": \"Nova Scotia Duck Tolling Retriever\", \"code_petType\": \"1\"}, {\"code\": \"140\", \"description\": \"Ovejero magallánico\", \"code_petType\": \"1\"}, {\"code\": \"141\", \"description\": \"Pastor alemán\", \"code_petType\": \"1\"}, {\"code\": \"142\", \"description\": \"Pastor belga\", \"code_petType\": \"1\"}, {\"code\": \"143\", \"description\": \"Pastor blanco suizo\", \"code_petType\": \"1\"}, {\"code\": \"144\", \"description\": \"Pastor catalán\", \"code_petType\": \"1\"}, {\"code\": \"145\", \"description\": \"Pastor croata\", \"code_petType\": \"1\"}, {\"code\": \"146\", \"description\": \"Pastor garafiano\", \"code_petType\": \"1\"}, {\"code\": \"147\", \"description\": \"Pastor holandés\", \"code_petType\": \"1\"}, {\"code\": \"148\", \"description\": \"Pastor peruano Chiribaya\", \"code_petType\": \"1\"}, {\"code\": \"149\", \"description\": \"Pastor de Brie\", \"code_petType\": \"1\"}, {\"code\": \"150\", \"description\": \"Pastor de los Pirineos\", \"code_petType\": \"1\"}, {\"code\": \"151\", \"description\": \"Pastor leonés\", \"code_petType\": \"1\"}, {\"code\": \"152\", \"description\": \"Pastor mallorquín\", \"code_petType\": \"1\"}, {\"code\": \"153\", \"description\": \"Pastor maremmano-abrucés\", \"code_petType\": \"1\"}, {\"code\": \"154\", \"description\": \"Pastor de Valée\", \"code_petType\": \"1\"}, {\"code\": \"155\", \"description\": \"Pastor vasco\", \"code_petType\": \"1\"}, {\"code\": \"156\", \"description\": \"Pekinés\", \"code_petType\": \"1\"}, {\"code\": \"157\", \"description\": \"Pembroke Welsh Corgi\", \"code_petType\": \"1\"}, {\"code\": \"158\", \"description\": \"Pequeño Lebrel Italiano\", \"code_petType\": \"1\"}, {\"code\": \"159\", \"description\": \"Perdiguero francés\", \"code_petType\": \"1\"}, {\"code\": \"160\", \"description\": \"Perdiguero portugués\", \"code_petType\": \"1\"}, {\"code\": \"161\", \"description\": \"Perro cimarrón uruguayo\", \"code_petType\": \"1\"}, {\"code\": \"162\", \"description\": \"Perro de agua americano\", \"code_petType\": \"1\"}, {\"code\": \"163\", \"description\": \"Perro de agua español\", \"code_petType\": \"1\"}, {\"code\": \"164\", \"description\": \"Perro de agua irlandés\", \"code_petType\": \"1\"}, {\"code\": \"165\", \"description\": \"Perro de agua portugués\", \"code_petType\": \"1\"}, {\"code\": \"166\", \"description\": \"Perro de Groenlandia\", \"code_petType\": \"1\"}, {\"code\": \"167\", \"description\": \"Perro de osos de Carelia\", \"code_petType\": \"1\"}, {\"code\": \"168\", \"description\": \"Perro dogo mallorquín\", \"code_petType\": \"1\"}, {\"code\": \"169\", \"description\": \"Perro esquimal canadiense\", \"code_petType\": \"1\"}, {\"code\": \"170\", \"description\": \"Perro de Montaña de los Pirineos\", \"code_petType\": \"1\"}, {\"code\": \"171\", \"description\": \"Perro fino colombiano\", \"code_petType\": \"1\"}, {\"code\": \"172\", \"description\": \"Perro pastor de las islas Shetland\", \"code_petType\": \"1\"}, {\"code\": \"173\", \"description\": \"Perro peruano sin pelo\", \"code_petType\": \"1\"}, {\"code\": \"174\", \"description\": \"Phalène\", \"code_petType\": \"1\"}, {\"code\": \"175\", \"description\": \"Pinscher alemán\", \"code_petType\": \"1\"}, {\"code\": \"176\", \"description\": \"Pinscher miniatura\", \"code_petType\": \"1\"}, {\"code\": \"177\", \"description\": \"Pitbull\", \"code_petType\": \"1\"}, {\"code\": \"178\", \"description\": \"Podenco canario\", \"code_petType\": \"1\"}, {\"code\": \"179\", \"description\": \"Podenco ibicenco\", \"code_petType\": \"1\"}, {\"code\": \"180\", \"description\": \"Podenco portugués\", \"code_petType\": \"1\"}, {\"code\": \"181\", \"description\": \"Pointer\", \"code_petType\": \"1\"}, {\"code\": \"182\", \"description\": \"Pomerania\", \"code_petType\": \"1\"}, {\"code\": \"183\", \"description\": \"Presa canario\", \"code_petType\": \"1\"}, {\"code\": \"184\", \"description\": \"Pudelpointer\", \"code_petType\": \"1\"}, {\"code\": \"185\", \"description\": \"Pug\", \"code_petType\": \"1\"}, {\"code\": \"186\", \"description\": \"Puli\", \"code_petType\": \"1\"}, {\"code\": \"187\", \"description\": \"Pumi\", \"code_petType\": \"1\"}, {\"code\": \"188\", \"description\": \"Rafeiro do Alentejo\", \"code_petType\": \"1\"}, {\"code\": \"189\", \"description\": \"Ratonero bodeguero andaluz\", \"code_petType\": \"1\"}, {\"code\": \"190\", \"description\": \"Ratonero mallorquín\", \"code_petType\": \"1\"}, {\"code\": \"191\", \"description\": \"Ratonero valenciano\", \"code_petType\": \"1\"}, {\"code\": \"192\", \"description\": \"Rhodesian Ridgeback\", \"code_petType\": \"1\"}, {\"code\": \"193\", \"description\": \"Rottweiler\", \"code_petType\": \"1\"}, {\"code\": \"194\", \"description\": \"Saluki\", \"code_petType\": \"1\"}, {\"code\": \"195\", \"description\": \"Samoyedo\", \"code_petType\": \"1\"}, {\"code\": \"196\", \"description\": \"San Bernardo\", \"code_petType\": \"1\"}, {\"code\": \"197\", \"description\": \"Schapendoes\", \"code_petType\": \"1\"}, {\"code\": \"198\", \"description\": \"Schnauzer estándar\", \"code_petType\": \"1\"}, {\"code\": \"199\", \"description\": \"Schnauzer gigante\", \"code_petType\": \"1\"}, {\"code\": \"200\", \"description\": \"Schnauzer miniatura\", \"code_petType\": \"1\"}, {\"code\": \"201\", \"description\": \"Staffordshire Bull Terrier\", \"code_petType\": \"1\"}, {\"code\": \"202\", \"description\": \"Sabueso bosnio\", \"code_petType\": \"1\"}, {\"code\": \"203\", \"description\": \"Schipperke\", \"code_petType\": \"1\"}, {\"code\": \"204\", \"description\": \"Sealyham terrier\", \"code_petType\": \"1\"}, {\"code\": \"205\", \"description\": \"Setter inglés\", \"code_petType\": \"1\"}, {\"code\": \"206\", \"description\": \"Setter irlandés\", \"code_petType\": \"1\"}, {\"code\": \"207\", \"description\": \"Shar Pei\", \"code_petType\": \"1\"}, {\"code\": \"208\", \"description\": \"Shiba Inu\", \"code_petType\": \"1\"}, {\"code\": \"209\", \"description\": \"Shih Tzu\", \"code_petType\": \"1\"}, {\"code\": \"210\", \"description\": \"Shikoku Inu\", \"code_petType\": \"1\"}, {\"code\": \"211\", \"description\": \"Siberian husky\", \"code_petType\": \"1\"}, {\"code\": \"212\", \"description\": \"Skye terrier\", \"code_petType\": \"1\"}, {\"code\": \"213\", \"description\": \"Spaniel japonés\", \"code_petType\": \"1\"}, {\"code\": \"214\", \"description\": \"Spaniel tibetano\", \"code_petType\": \"1\"}, {\"code\": \"215\", \"description\": \"Spitz enano\", \"code_petType\": \"1\"}, {\"code\": \"216\", \"description\": \"Spitz grande\", \"code_petType\": \"1\"}, {\"code\": \"217\", \"description\": \"Spitz mediano\", \"code_petType\": \"1\"}, {\"code\": \"218\", \"description\": \"Spitz japonés\", \"code_petType\": \"1\"}, {\"code\": \"219\", \"description\": \"Sussex spaniel\", \"code_petType\": \"1\"}, {\"code\": \"220\", \"description\": \"Teckel\", \"code_petType\": \"1\"}, {\"code\": \"221\", \"description\": \"Terranova\", \"code_petType\": \"1\"}, {\"code\": \"222\", \"description\": \"Terrier alemán\", \"code_petType\": \"1\"}, {\"code\": \"223\", \"description\": \"Terrier brasileño\", \"code_petType\": \"1\"}, {\"code\": \"224\", \"description\": \"Terrier checo\", \"code_petType\": \"1\"}, {\"code\": \"225\", \"description\": \"Terrier chileno\", \"code_petType\": \"1\"}, {\"code\": \"226\", \"description\": \"Terrier de Norfolk\", \"code_petType\": \"1\"}, {\"code\": \"227\", \"description\": \"Terrier de Norwich\", \"code_petType\": \"1\"}, {\"code\": \"228\", \"description\": \"Terrier escocés\", \"code_petType\": \"1\"}, {\"code\": \"229\", \"description\": \"Terrier galés\", \"code_petType\": \"1\"}, {\"code\": \"230\", \"description\": \"Terrier irlandés\", \"code_petType\": \"1\"}, {\"code\": \"231\", \"description\": \"Terrier ruso negro\", \"code_petType\": \"1\"}, {\"code\": \"232\", \"description\": \"Terrier tibetano\", \"code_petType\": \"1\"}, {\"code\": \"233\", \"description\": \"Toy spaniel inglés\", \"code_petType\": \"1\"}, {\"code\": \"234\", \"description\": \"Tervueren\", \"code_petType\": \"1\"}, {\"code\": \"235\", \"description\": \"Vallhund sueco\", \"code_petType\": \"1\"}, {\"code\": \"236\", \"description\": \"Volpino italiano\", \"code_petType\": \"1\"}, {\"code\": \"237\", \"description\": \"Weimaraner\", \"code_petType\": \"1\"}, {\"code\": \"238\", \"description\": \"West Highland White Terrier\", \"code_petType\": \"1\"}, {\"code\": \"239\", \"description\": \"Whippet\", \"code_petType\": \"1\"}, {\"code\": \"240\", \"description\": \"Wolfsspitz\", \"code_petType\": \"1\"}, {\"code\": \"241\", \"description\": \"Xoloitzcuintle\", \"code_petType\": \"1\"}, {\"code\": \"242\", \"description\": \"Yorkshire terrier\", \"code_petType\": \"1\"}, {\"code\": \"243\", \"description\": \"Abisinio\", \"code_petType\": \"2\"}, {\"code\": \"244\", \"description\": \"American Curl\", \"code_petType\": \"2\"}, {\"code\": \"245\", \"description\": \"Azul ruso\", \"code_petType\": \"2\"}, {\"code\": \"246\", \"description\": \"American shorthair\", \"code_petType\": \"2\"}, {\"code\": \"247\", \"description\": \"American wirehair\", \"code_petType\": \"2\"}, {\"code\": \"248\", \"description\": \"Angora turco\", \"code_petType\": \"2\"}, {\"code\": \"249\", \"description\": \"Africano doméstico\", \"code_petType\": \"2\"}, {\"code\": \"250\", \"description\": \"Bengala\", \"code_petType\": \"2\"}, {\"code\": \"251\", \"description\": \"Bobtail japonés\", \"code_petType\": \"2\"}, {\"code\": \"252\", \"description\": \"Bombay\", \"code_petType\": \"2\"}, {\"code\": \"253\", \"description\": \"Bosque de Noruega\", \"code_petType\": \"2\"}, {\"code\": \"254\", \"description\": \"Brazilian Shorthair\", \"code_petType\": \"2\"}, {\"code\": \"255\", \"description\": \"Brivon de pelo corto\", \"code_petType\": \"2\"}, {\"code\": \"256\", \"description\": \"Brivon de pelo largo\", \"code_petType\": \"2\"}, {\"code\": \"257\", \"description\": \"British Shorthair\", \"code_petType\": \"2\"}, {\"code\": \"258\", \"description\": \"Burmés\", \"code_petType\": \"2\"}, {\"code\": \"259\", \"description\": \"Burmilla\", \"code_petType\": \"2\"}, {\"code\": \"260\", \"description\": \"Cornish rex\", \"code_petType\": \"2\"}, {\"code\": \"261\", \"description\": \"California Spanglish\", \"code_petType\": \"2\"}, {\"code\": \"262\", \"description\": \"Cymric\", \"code_petType\": \"2\"}, {\"code\": \"263\", \"description\": \"Chartreux\", \"code_petType\": \"2\"}, {\"code\": \"264\", \"description\": \"Deutsch Langhaar\", \"code_petType\": \"2\"}, {\"code\": \"265\", \"description\": \"Devon rex\", \"code_petType\": \"2\"}, {\"code\": \"266\", \"description\": \"Dorado africano\", \"code_petType\": \"2\"}, {\"code\": \"267\", \"description\": \"Don Sphynx\", \"code_petType\": \"2\"}, {\"code\": \"268\", \"description\": \"Dragon Li\", \"code_petType\": \"2\"}, {\"code\": \"269\", \"description\": \"Europeo Común\", \"code_petType\": \"2\"}, {\"code\": \"270\", \"description\": \"Exótico de Pelo Corto\", \"code_petType\": \"2\"}, {\"code\": \"271\", \"description\": \"Gato europeo bicolor\", \"code_petType\": \"2\"}, {\"code\": \"272\", \"description\": \"FoldEx\", \"code_petType\": \"2\"}, {\"code\": \"273\", \"description\": \"German Rex\", \"code_petType\": \"2\"}, {\"code\": \"274\", \"description\": \"Habana brown\", \"code_petType\": \"2\"}, {\"code\": \"275\", \"description\": \"Himalayo\", \"code_petType\": \"2\"}, {\"code\": \"276\", \"description\": \"Korat\", \"code_petType\": \"2\"}, {\"code\": \"277\", \"description\": \"Khao Manee\", \"code_petType\": \"2\"}, {\"code\": \"278\", \"description\": \"Maine Coon\", \"code_petType\": \"2\"}, {\"code\": \"279\", \"description\": \"Manx\", \"code_petType\": \"2\"}, {\"code\": \"280\", \"description\": \"Mau egipcio\", \"code_petType\": \"2\"}, {\"code\": \"281\", \"description\": \"Munchkin\", \"code_petType\": \"2\"}, {\"code\": \"282\", \"description\": \"Ocicat\", \"code_petType\": \"2\"}, {\"code\": \"283\", \"description\": \"Oriental\", \"code_petType\": \"2\"}, {\"code\": \"284\", \"description\": \"Oriental de pelo largo\", \"code_petType\": \"2\"}, {\"code\": \"285\", \"description\": \"Persa Americano o Moderno\", \"code_petType\": \"2\"}, {\"code\": \"286\", \"description\": \"Persa Clásico o Tradicional\", \"code_petType\": \"2\"}, {\"code\": \"287\", \"description\": \"Peterbald\", \"code_petType\": \"2\"}, {\"code\": \"288\", \"description\": \"Pixie Bob\", \"code_petType\": \"2\"}, {\"code\": \"289\", \"description\": \"Ragdoll\", \"code_petType\": \"2\"}, {\"code\": \"290\", \"description\": \"Sagrado de Birmania\", \"code_petType\": \"2\"}, {\"code\": \"291\", \"description\": \"Scottish Fold\", \"code_petType\": \"2\"}, {\"code\": \"292\", \"description\": \"Selkirk rex\", \"code_petType\": \"2\"}, {\"code\": \"293\", \"description\": \"Serengeti\", \"code_petType\": \"2\"}, {\"code\": \"294\", \"description\": \"Seychellois\", \"code_petType\": \"2\"}, {\"code\": \"295\", \"description\": \"Siamés\", \"code_petType\": \"2\"}, {\"code\": \"296\", \"description\": \"Siamés Moderno\", \"code_petType\": \"2\"}, {\"code\": \"297\", \"description\": \"Siamés Tradicional\", \"code_petType\": \"2\"}, {\"code\": \"298\", \"description\": \"Siberiano\", \"code_petType\": \"2\"}, {\"code\": \"299\", \"description\": \"Snowshoe\", \"code_petType\": \"2\"}, {\"code\": \"300\", \"description\": \"Sphynx\", \"code_petType\": \"2\"}, {\"code\": \"301\", \"description\": \"Tonkinés\", \"code_petType\": \"2\"}, {\"code\": \"302\", \"description\": \"Van Turco\", \"code_petType\": \"2\"}]"
                                      }
                                  }
                              ]
                          }
                      ]
                  }
              ]
          },
          "idStatus": 1,
          "nmVersion": 2,
          "businessCode": "producto_seguro_mascota"
      },
      "dataHeader": {
          "code": 200,
          "status": "OK",
          "errorList": [],
          "hasErrors": false,
          "currentPage": 0,
          "totalPage": 0,
          "totalRecords": 0
      }
    };

    const resCauses = {
        "body": [
            {
                "id": 136,
                "businessCode": "RNV_CRE_1",
                "name": "Solicitud del tomador",
                "description": "Solicitud del tomador",
                "applicationProcess": "Renovación",
                "applicationSubprocess": 9,
                "idStatus": 1
            },
            {
                "id": 165,
                "businessCode": "RNV_CRE_2",
                "name": "Condición del negocio",
                "description": "Condición del negocio",
                "applicationProcess": "Renovación",
                "applicationSubprocess": 9,
                "idStatus": 1
            }
        ],
        "dataHeader": {
            "code": 200,
            "status": "OK",
            "errorList": [],
            "hasErrors": false,
            "currentPage": 0,
            "totalPage": 0,
            "totalRecords": 0
        }
    };

    const resSave = {
        dataHeader: {
            code: 200
        }
    };

    jest.spyOn(modalAPService, 'getCauses').mockReturnValue(of (resCauses));
    jest.spyOn(modalAPService, 'savePolicyRenewal').mockReturnValue(of (resSave));
    jest.spyOn(productService, 'getProductByCode').mockReturnValue(of (resProduct));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('savePolicyRenewal else', () => {
    const res = { dataHeader: { code: 500 } };
    jest.spyOn(modalAPService, 'savePolicyRenewal').mockReturnValue(of (res));
    expect(component.savePolicyRenewal()).toBeUndefined();
  });

  it('transformData', () => {
    expect(component.transformData()).toBeUndefined();
  });

  it('showSuccess', () => {
    expect(component.showSuccess('error', 'error', 'error')).toBeUndefined();
  });

  it('confirmSave', () => {
    expect(component.confirmSave()).toBeUndefined();
  });

  it('fillRiskData', () => {
    let riskTypes: any = [{id: 1,code: { businessCode: "aaa" },name: "abc",description: "abcd",complementaryData: {id: 1,name: "string",code: "string",fields: [],},businessPlans: []
    }];
    const spy2 = jest.spyOn(component, 'fillGroupData').mockImplementation();
    component.fillRiskData(riskTypes);
    expect(spy2).toBeCalled();
  });

  it('validateList', () => {
    let list: any = [{ code: 'abc', description: 'abc' }, { code: 'bcd', description: 'bcd' }];
    let valueObj: any = [{ code: 'abc', description: 'abc' }];
    component.validateList(list, valueObj);
  });

  it('orderData', () => {
    let list: any = [{ code: 'abc', description: 'abc' }, { code: 'bcd', description: 'bcd' }];
    let valueObj: any = [{ code: 'abc', description: 'abc' }];
    component.orderData(list, valueObj);
  });

  it('getControlValue', () => {
    let dataControlsValue = [{id: 7,code: 7,name: 'abc',fields: [{ code: { businessCode: "abc" } }]}];
    let businessCode = "abc";
    const spy = component.getControlValue(dataControlsValue, businessCode);
    console.log(spy); 
    //expect(spy).toBeUndefined();
  });
});
