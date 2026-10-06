import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IMPORT_TYPE } from '@src/angular/types';


const DOCUMENT_ROW_CORE_IMPORTS:IMPORT_TYPE=[
    MatInputModule,
    MatFormFieldModule
];

const DOCUMENT_ROW_FEATURE_IMPORTS:IMPORT_TYPE=[

];

export const DOCUMENT_ROW_IMPORTS:IMPORT_TYPE=[...DOCUMENT_ROW_CORE_IMPORTS,...DOCUMENT_ROW_FEATURE_IMPORTS] as const;