import { IMPORT_TYPE } from '@src/angular/types';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


const LOGIN_CORE_IMPORTS:IMPORT_TYPE=[
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
];

const LOGIN_FEATURE_IMPORTS:IMPORT_TYPE=[
    
];

export const LOGIN_IMPORTS:IMPORT_TYPE=[...LOGIN_CORE_IMPORTS,...LOGIN_FEATURE_IMPORTS] as const;