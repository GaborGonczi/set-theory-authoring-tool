import { Component, Type } from '@angular/core';

export type IMPORT_TYPE = Parameters<typeof Component>[0]["imports"];
export type TOOL_TYPE = Type<unknown>;