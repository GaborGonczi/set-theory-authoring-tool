import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IMPORT_TYPE } from '@src/angular/types';



const MODE_CORE_IMPORTS:IMPORT_TYPE=[
    MatSlideToggleModule
];

const MODE_FEATURE_IMPORTS:IMPORT_TYPE=[

];

export const MODE_IMPORTS:IMPORT_TYPE=[...MODE_CORE_IMPORTS,...MODE_FEATURE_IMPORTS] as const;