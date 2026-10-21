import { DatePipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { IMPORT_TYPE } from '@src/angular/types';


const FILE_LIST_CORE_IMPORTS:IMPORT_TYPE=[
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    DatePipe
];

const FILE_LIST_FEATURE_IMPORTS:IMPORT_TYPE=[

];

export const FILE_LIST_IMPORTS:IMPORT_TYPE=[...FILE_LIST_CORE_IMPORTS,...FILE_LIST_FEATURE_IMPORTS] as const;