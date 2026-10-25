import { IMPORT_TYPE } from '@src/angular/types';
import { MatCardModule } from '@angular/material/card';


const DASHBOARD_CORE_IMPORTS:IMPORT_TYPE=[
    MatCardModule
];

const DASHBOARD_FEATURE_IMPORTS:IMPORT_TYPE=[

];

export const DASHBOARD_IMPORTS:IMPORT_TYPE=[...DASHBOARD_CORE_IMPORTS,...DASHBOARD_FEATURE_IMPORTS] as const;