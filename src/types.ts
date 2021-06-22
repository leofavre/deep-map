/* eslint-disable @typescript-eslint/no-explicit-any */

type Primitive = bigint | number | string | null | undefined;
type Obj = Record<string, unknown>;
type Arr = unknown[];
type Key = string | number

export interface TransformObject {
  (arg: Obj, key: Key | undefined, path: Key[]): Obj;
}

export interface TransformArray {
  (arg: Arr, key: Key | undefined, path: Key[]): Arr;
}

export interface TransformValue {
  (arg: Primitive, key: Key | undefined, path: Key[]): any;
}

export interface TransformKey {
  (arg: any, key: Key, path: Key[]): Key;
}

export interface Config {
  transformObject?: TransformObject;
  transformArray?: TransformArray;
  transformValue?: TransformValue;
  transformKey?: TransformKey;
  treatArraysAsObjects?: boolean;
}

export interface Recursive {
  (arg: any, key: Key | undefined, path: Key[]): any;
}

export interface DeepMap {
  <I = any, O = I>(arg: I, config?: Config | TransformValue): O;
}
