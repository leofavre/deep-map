import type {
  TransformObject,
  TransformArray,
  TransformValue,
  TransformKey,
  Config,
  Recursive,
  DeepMap
} from './types';

const isFunction = arg => typeof arg === 'function';
const isArray = Array.isArray;
const isPlainObject = arg =>
  arg != null && typeof arg === 'object' && !isArray(arg);

const passObject: TransformObject = arg => arg;
const passArray: TransformArray = arg => arg;
const passValue: TransformValue = arg => arg;
const passKey: TransformKey = (arg, key) => key;

const deepMap: DeepMap = (arg, config = {}) => {
  const transformValue = isFunction(config)
    ? (config as TransformValue)
    : (config as Config).transformValue ?? passValue;

  const {
    transformObject = passObject,
    transformArray = passArray,
    transformKey = passKey,
    treatArraysAsObjects
  } = (config || {}) as Config;

  const recursive: Recursive = (arg, key, initialPath) => {
    const path = key != null
      ? [...initialPath, key]
      : [...initialPath];

    if (isPlainObject(arg) || (treatArraysAsObjects && isArray(arg))) {
      return Object.fromEntries(
        Object
          .entries(transformObject(arg, key, path))
          .map(([itemKey, itemValue]) => {
            return [
              transformKey(itemValue, itemKey, [...path, itemKey]),
              recursive(itemValue, itemKey, path)
            ];
          })
      );
    }

    if (isArray(arg)) {
      return transformArray(arg, key, path)
        .map((itemValue, itemKey) => {
          return recursive(itemValue, itemKey, path);
        });
    }

    return transformValue(arg, key, path);
  };

  return recursive(arg, undefined, []);
};

export default deepMap;
