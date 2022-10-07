/* 
    Aclaraciones
    1. Para componentes con HTML simple y sin módulos importados solo se exporta el component
    2. Para componentes con material o primeng se exporta el module y el component por tema de dependencias
*/  

export * from './components/material-example/material-example.module';
export * from './components/material-example/material-example.component';

export * from './components/primeng-example/primeng-example.module';
export * from './components/primeng-example/primeng-example.component';

export * from './components/header/header.module';
export * from './components/header/header.component';

export * from './components/modal-policy-actions/modal-policy-actions.module';
export * from './components/modal-policy-actions/modal-policy-actions.component';