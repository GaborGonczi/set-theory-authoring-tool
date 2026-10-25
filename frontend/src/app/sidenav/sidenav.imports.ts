import { IMPORT_TYPE } from '@src/angular/types';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

const SIDENAV_CORE_IMPORTS:IMPORT_TYPE=[
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
];

const SIDENAV_FEATURE_IMPORTS:IMPORT_TYPE=[

];

export const SIDENAV_IMPORTS:IMPORT_TYPE=[...SIDENAV_CORE_IMPORTS,...SIDENAV_FEATURE_IMPORTS] as const;