import { IMPORT_TYPE } from '@src/angular/types';
import { DocumentRow } from '@src/app/features/evaluator/components/tools/components/document/components/document-row/document-row';


const DOCUMENT_CORE_IMPORTS:IMPORT_TYPE=[

];

const DOCUMENT_FEATURE_IMPORTS:IMPORT_TYPE=[
    DocumentRow
];

export const DOCUMENT_IMPORTS:IMPORT_TYPE=[...DOCUMENT_CORE_IMPORTS,...DOCUMENT_FEATURE_IMPORTS] as const;