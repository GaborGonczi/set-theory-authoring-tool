import { IMPORT_TYPE } from '@src/angular/types';
import { Tool } from '@src/app/features/evaluator/components/tools/tool/tool';


const TOOLBAR_CORE_IMPORTS:IMPORT_TYPE=[

];

const TOOLBAR_FEATURE_IMPORTS:IMPORT_TYPE=[
    Tool
];

export const TOOLBAR_IMPORTS:IMPORT_TYPE=[...TOOLBAR_CORE_IMPORTS,...TOOLBAR_FEATURE_IMPORTS] as const;