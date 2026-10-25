import { IMPORT_TYPE } from '@src/angular/types';
import { Toolbar } from '@src/app/features/evaluator/components/toolbar/toolbar';


const EDITOR_CORE_IMPORTS:IMPORT_TYPE=[

];

const EDITOR_FEATURE_IMPORTS:IMPORT_TYPE=[
    Toolbar
];

export const EDITOR_IMPORTS:IMPORT_TYPE=[...EDITOR_CORE_IMPORTS,...EDITOR_FEATURE_IMPORTS] as const;