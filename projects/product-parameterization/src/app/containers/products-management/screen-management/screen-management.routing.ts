import { Route } from "@angular/router";
import { AuthGuardParameterizer } from "../../../guard/auth.guard";
import { ScreenManagementComponent } from "./screen-management.component";

export const screenManagementRoutes: Route[] = [
    {
        path: '',
        component: ScreenManagementComponent,
        canActivateChild: [AuthGuardParameterizer],
        children: [
            /* Emisión */
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
            {
                path: 'tipos-riesgo',
                loadChildren: () => import('../../../containers/risk-types/risk-types.module').then(m => m.RiskTypesModule)
            },
            {
                path: 'categoria-impuestos',
                loadChildren: () => import('../../../containers/tax-category/tax-category.module').then(m => m.TaxCategoryModule)
            },
            {
                path: 'control-tecnico',
                loadChildren: () => import('../../../containers/technical-control/technical-control.module').then(m => m.TechnicalControlModule)
            },
            {
                path: 'clausula',
                loadChildren: () => import('../../../containers/clauses-product/clauses-product.module').then(m => m.ClausesProductModule)
            },
            {
                path: 'cumulos',
                loadChildren: () => import('../../../containers/accumulation/accumulation.module').then(m => m.AccumulationModule)
            },
            /* Previsualización campos */
            {
                path: 'previsualizar-datos-poliza',
                loadChildren: () => import('../../../containers/main-screen-product/components/preview-data/preview-data-policy/preview-data-policy.module').then(m => m.PreviewDataPolicyModule)
            },
            /* Modificación */
            {
                path: 'tipos-modificacion',
                loadChildren: () => import('../../../containers/main-screen-product/components/modification-types/modification-types.module').then(m => m.ModificationTypesModule)
            },
            {
                path: 'control-tecnico-modificacion',
                loadChildren: () => import('../../../containers/modification-technical-control/modification-technical-control.module').then(m => m.ModificationTechnicalControlModule)
            },
            /* Reclamación */
            {
                path: 'reserva-reclamacion',
                loadChildren: () => import('../../../containers/claim-reservation-concept/claim-reservation-concept.module').then(m => m.ClaimReservationConceptModule)
            },
            {
                path: 'reserva-liquidacion',
                loadChildren: () => import('../../../containers/claim-liquidation-concept/claim-liquidation-concept.module').then(m => m.ClaimLiquidationConceptModule)
            },
            {
                path: 'datos-reclamacion',
                loadChildren: () => import('../../../containers/claim-data/claim-data.module').then(m => m.ClaimDataModule)
            },
            {
                path: 'control-tecnico-reclamacion',
                loadChildren: () => import('../../../containers/claim-technical-control/claim-technical-control.module').then(m => m.ClaimTechnicalControlModule)
            },
            /*Cancelación */
            {
                path: 'datos-cancelacion',
                loadChildren: () => import('../../main-screen-product/components/cancellation-data/cancellation-data.module').then(m => m.CancellationDataModule)
            },
            /*Rehabilitación */
            {
                path: 'datos-rehabilitacion',
                loadChildren: () => import('../../main-screen-product/components/rehabilitation-data/rehabilitation-data.module').then(m => m.RehabilitationDataModule)
            },
            /* Renovación */
            {
                path: 'datos-renovacion',
                loadChildren: () => import('../../../containers/main-screen-product/components/renewal-data/renewal-data.module').then(m => m.RenewalDataModule)
            },
        ]
    }
];
