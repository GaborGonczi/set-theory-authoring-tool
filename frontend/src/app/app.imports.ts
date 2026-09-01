import { IMPORT_TYPE } from '@src/angular/types';

import { RouterOutlet } from '@angular/router';

import { Sidenav } from '@src/app/sidenav/sidenav';


const APP_CORE_IMPORTS:IMPORT_TYPE=[
    RouterOutlet
];

const APP_FEATURE_IMPORTS:IMPORT_TYPE=[
    Sidenav
];

export const APP_IMPORTS:IMPORT_TYPE=[...APP_CORE_IMPORTS,...APP_FEATURE_IMPORTS] as const;