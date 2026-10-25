import { IMPORT_TYPE } from '@src/angular/types';
import { MarkdownComponent } from 'ngx-markdown';


const USAGE_CORE_IMPORTS:IMPORT_TYPE=[
    MarkdownComponent
];

const USAGE_FEATURE_IMPORTS:IMPORT_TYPE=[

];

export const USAGE_IMPORTS:IMPORT_TYPE=[...USAGE_CORE_IMPORTS,...USAGE_FEATURE_IMPORTS] as const;