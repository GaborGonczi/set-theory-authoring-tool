import { environment } from "@src/environments/environment";

type UppercaseApi<T> = {
  [K in keyof T as Uppercase<K & string>]: {
    [E in keyof T[K] as Uppercase<E & string>]: string;
  };
};

type ApiRuntimeShape = Record<string, Record<string, string>>;

function createEndpoints<T extends ApiRuntimeShape>(baseUrl:string, apiPrefix:string, api:T): UppercaseApi<T> {
    
  const result: ApiRuntimeShape = {};

  for (const [apiType, endpoints] of Object.entries(api)) {
    const apiTypeKey = apiType.toUpperCase();

    result[apiTypeKey] = {};

    for (const [name, endpoint] of Object.entries(endpoints)) {
      const nameKey = name.toUpperCase();

      result[apiTypeKey][nameKey] =
        `${baseUrl}/${apiPrefix}/${apiType}/${endpoint}`;
    }
  }

  return result as UppercaseApi<T>;
}

const BASE_URL = environment.apiUrl;
const API_PREFIX = 'api';

const apiDefinition = {
  auth: {
    login: 'login',
    register: 'register',
    logout: 'logout',
  },

  expression: {
    evaluate: 'evaluate',
    get_figure: 'get_figure',
  },

  file: {
    get_my_files: 'get_my_files',
    get_examples_by_others: 'get_examples_by_others',
    update_example: 'update_example',
    delete: 'delete',
    copy: 'copy',
    export: 'export',
    import: 'import',
    load: 'load',
  },

  help: {
    usage: 'usage',
  },

  profile: {
    info: 'info',
  },
} as const;



export const API = createEndpoints(
  BASE_URL,
  API_PREFIX,
  apiDefinition,
); 