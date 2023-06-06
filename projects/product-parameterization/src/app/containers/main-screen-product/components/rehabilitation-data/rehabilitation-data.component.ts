import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ElementTableSearch } from 'projects/product-parameterization/src/app/core/model/ElementTableSearch.model';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import { RulesWizardComponent } from 'projects/product-parameterization/src/app/shared/rules-wizard/rules-wizard.component';
import { RulesWizardService } from 'projects/product-parameterization/src/app/shared/rules-wizard/services/rules-wizard.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'refactoring-smartcore-mf-rehabilitation-data',
  templateUrl: './rehabilitation-data.component.html',
  styleUrls: ['./rehabilitation-data.component.scss'],
})
export class RehabilitationDataComponent implements OnInit {
  contextData: any = [];
  applicationLevel = 'Rehabilitación';
  flagError = false;
  flagCsProcess = false;
  causesPrevValue: any[] = [];
  causes: any = [];
  rmsDpndncy: any;
  rm: any;
  rulePrevValue: any = [];
  isLoading = false;

  constructor(
    public productService: ProductService,
    public rulesService: RulesWizardService,
    public dialogService: DialogService
  ) {}

  async ngOnInit(): Promise<void> {
    this.rmsDpndncy = this.productService.prdctDpndncy?.get('insrncLn')?.value;
    this.rm = this.rmsDpndncy?.find(
      (element: any) =>
        element.id ===
        this.productService.initialParameters?.get('insuranceLine')?.value
    );
    this.contextData = await this.rulesService.loadContextData(this.applicationLevel);
    await this.getCauses().then();
  }

  async getCauses() {
    let search = 0;
    let pageNumber = 0;
    let pageSize = 0;
    let notElements = 0;

    const parameters =
      this.productService.initialParameters?.get('insuranceLine')?.value !==
      null
        ? this.productService.initialParameters?.get('insuranceLine')?.value +
          ''
        : '0';

    try {
      this.isLoading = true;
      let res: any;
      res = await lastValueFrom(
        this.productService.getApiData(
          `claimCause/findByCompanyAndInsuranceLine/${this.productService.companyId}/${parameters}/${search}/${pageNumber}/${pageSize}/${notElements}/${this.applicationLevel}`
        )
      );

      if (res.body !== null) {
        this.causes = res.body;
        this.isLoading = false;
      }else{
        this.causes = [];
        this.flagError = true;
      }
    } catch (error) {
      this.isLoading = false;
      this.flagError = true;
      console.error('Ha ocurrido un error al obtener los datos de las causas');
    }
  }

  verifyCsProcess(value: any) {
    if (!this.flagCsProcess && this.causesPrevValue.length === 0) {
      this.causesPrevValue = value;
      this.flagCsProcess = true;
    }
    if (this.causesPrevValue.length > value.length) {
      // vamos a eliminar causas
      const diff = this.causesPrevValue.filter((x: any) => !value.includes(x));

      for (let cause of diff) {
        this.productService.deleteDependencyRef('cs', cause, 'rnsttmntCsCd');
      }
    } else {
      // vamos a agregar causas
      this.setCsDependency(value);
    }
    this.causesPrevValue = value;
  }

  setCsDependency(value: any) {
    for (let cs of value) {
      const cause: any = this.causes.find((x: any) => x.businessCode === cs);
      const obj = {
        id: cause.id,
        cd: cause.businessCode,
        nm: cause.name,
        dscrptn: cause.description,
        sttCd: cause.statusCode,
        aplctnPrcssItm: cause.aplicationProcess,
        aplctnSbprcssCd: cause.aplicationSubProcess,
        insrncLnCd: [this.rm?.cd],
      };

      this.productService.setProductDependency('cs', obj);
      this.productService.setDependencyRef('cs', obj.cd, 'rnsttmntCsCd');
    }
  }

  removeCsProcess(value: any) {
    this.productService.deleteDependencyRef('cs', value, 'rnsttmntCsCd');
  }

  removeRule(value: any) {
    this.productService.deleteDependencyRef('rl', value.rlCd, 'rhClcltnRl');
    this.rulePrevValue = [];
  }
}
