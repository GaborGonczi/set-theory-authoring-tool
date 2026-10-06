import { NgComponentOutlet } from '@angular/common';
import { IMPORT_TYPE } from '@src/angular/types';



const TOOL_CORE_IMPORTS:IMPORT_TYPE=[
    NgComponentOutlet
];

const TOOL_FEATURE_IMPORTS:IMPORT_TYPE=[
   
];

export const TOOL_IMPORTS:IMPORT_TYPE=[...TOOL_CORE_IMPORTS,...TOOL_FEATURE_IMPORTS] as const;