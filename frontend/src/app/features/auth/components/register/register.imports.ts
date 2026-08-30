import { IMPORT_TYPE } from '@src/angular/types';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';



const REGISTER_CORE_IMPORTS:IMPORT_TYPE=[
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
];

const REGISTER_FEATURE_IMPORTS:IMPORT_TYPE=[
    
];

export const REGISTER_IMPORTS:IMPORT_TYPE=[...REGISTER_CORE_IMPORTS,...REGISTER_FEATURE_IMPORTS] as const;