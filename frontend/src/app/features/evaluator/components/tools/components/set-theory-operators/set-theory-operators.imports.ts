import { MatButtonModule } from '@angular/material/button';
import { IMPORT_TYPE } from '@src/angular/types';



const SET_THEORY_OPERATORS_CORE_IMPORTS:IMPORT_TYPE=[
    MatButtonModule
];

const SET_THEORY_OPERATORS_FEATURE_IMPORTS:IMPORT_TYPE=[

];

export const SET_THEORY_OPERATORS_IMPORTS:IMPORT_TYPE=[...SET_THEORY_OPERATORS_CORE_IMPORTS,...SET_THEORY_OPERATORS_FEATURE_IMPORTS] as const;