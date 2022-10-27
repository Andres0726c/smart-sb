import { Route } from "@angular/router";
import { ScreenManagementComponent } from "./screen-management.component";

export const screenManagementRoutes: Route[] = [
    {
        path: '',
        component: ScreenManagementComponent,
        children: [
            {
                path: 'parametros-generales',
                loadChildren: () => import('../../../containers/initial-parameters/initial-parameters.module').then(m => m.InitialParametersModule)
            },
            {
                path: 'datos-poliza',
                loadChildren: () => import('../../../containers/policy-data/policy-data.module').then(m => m.PolicyDataModule)
            },
            { 
                path: 'coberturas', 
                loadChildren: () => import('../../../containers/coverages/coverages.module').then(m => m.CoveragesModule)
            },
            { 
                path: 'planes-servicio', 
                loadChildren: () => import('../../../containers/service-plans/service-plans.module').then(m => m.ServicePlansModule)
            },
            /*{ 
                path: 'tipos-riesgo', 
                loadChildren: () => import('src/app/containers/risk-types/risk-types.module').then(m => m.RiskTypesModule)
            },
            { 
                path: 'clausula', 
                loadChildren: () => import('src/app/containers/clauses-product/clauses-product.module').then(m => m.ClausesProductModule)
            },
            { 
                path: 'cumulos', 
                loadChildren: () => import('src/app/containers/accumulation/accumulation.module').then(m => m.AccumulationModule)
            },
            {
                path: 'control-tecnico', 
                loadChildren: () => import('src/app/containers/technical-control/technical-control.module').then(m => m.TechnicalControlModule)
            },
            {
                path: 'categoria-impuestos',
                loadChildren: () => import('src/app/containers/tax-category/tax-category.module').then(m => m.TaxCategoryModule)
            },
            {
                path: 'reserva-reclamacion',
                loadChildren: () => import('src/app/containers/claim-reservation-concept/claim-reservation-concept.module').then(m => m.ClaimReservationConceptModule)
            },
            {
                path: 'reserva-liquidacion',
                loadChildren: () => import('src/app/containers/claim-liquidation-concept/claim-liquidation-concept.module').then(m => m.ClaimLiquidationConceptModule)
            },
            {
                path: 'control-tecnico-reclamacion',
                loadChildren: () => import('src/app/containers/claim-technical-control/claim-technical-control.module').then(m => m.ClaimTechnicalControlModule)
            },
            {                
                path: 'datos-reclamacion',
                loadChildren: () => import('src/app/containers/claim-data/claim-data.module').then(m => m.ClaimDataModule)
            },
            {                
                path: 'control-tecnico-modificacion',
                loadChildren: () => import('src/app/containers/modification-technical-control/modification-technical-control.module').then(m => m.ModificationTechnicalControlModule)
            },
            {                
                path: 'tipos-modificacion',
                loadChildren: () => import('src/app/containers/modification-types/modification-types.module').then(m => m.ModificationTypesModule)
            }*/
        ]
    }
];