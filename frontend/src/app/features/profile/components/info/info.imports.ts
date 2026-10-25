import { MatCardModule } from '@angular/material/card';
import { IMPORT_TYPE } from '@src/angular/types';


const INFO_CORE_IMPORTS:IMPORT_TYPE=[
    MatCardModule
];

const INFO_FEATURE_IMPORTS:IMPORT_TYPE=[

];

export const INFO_IMPORTS:IMPORT_TYPE=[...INFO_CORE_IMPORTS,...INFO_FEATURE_IMPORTS] as const;