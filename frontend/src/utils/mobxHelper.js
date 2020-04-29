import assignDeep from 'assign-deep';
import lodash from 'lodash';
import {
  observable,
  runInAction,
  toJS,
  isObservableArray,
  isBoxedObservable,
  isObservableMap,
  isObservable
} from 'mobx';

/**
 * Merges the given items into the observable.
 * This does mutate the observable!
 *
 * @param {Observable} baseItem
 * @param {Array} items
 * @returns {Observable}
 */
export function mobxMerge(baseItem, ...items) {
  if (!isObservable(baseItem)) {
    throw new Error('MobxMerge requires the base item to be an observable.');
  } else if (!items || !items.length) {
    return baseItem;
  }

  let optionsIndex = null;
  let options = {};
  items.forEach((item, index) => {
    if (item.mergeOptions) {
      options = item.mergeOptions;
      optionsIndex = index;
    }
  });

  items.forEach((item, index) => {
    if (optionsIndex === index) {
      return;
    }

    const isItemArray = validateItemAndIsArray(baseItem, item, index);

    if (isItemArray) {
      mobxMergeArrays(baseItem, item, options);
    } else {
      mobxMergeItems(baseItem, item, options);
    }
  });
  return baseItem;
}

/**
 * Validates that the item will go with the base item.
 *
 * @param {Observable} baseItem
 * @param {*} item
 * @param {number} index
 * @returns {boolean}
 */
function validateItemAndIsArray(baseItem, item, index) {
  const isBaseItemAnArray = isObservableArray(baseItem);

  const isItemArray = (Array.isArray(item) || isObservableArray(item));
  if (isBaseItemAnArray && !isItemArray) {
    throw new Error(`MobxMerge: Item '${index}' is not an array or ObservableArray but the base item is.`);
  } else if (!isBaseItemAnArray && isItemArray) {
    throw new Error(`MobxMerge: Item '${index}' is an array or ObservableArray but the base item is not.`);
  }

  return Boolean(isBaseItemAnArray && isItemArray);
}

/**
 * Merges an array into an ObservableArray.
 *
 * @param {ObservableArray} baseObservableArray
 * @param {Array|ObservableArray} mergeArray
 * @param {{arrayAppend: boolean, arrayPrepend: boolean}=} options
 * @returns {Observable}
 */
export function mobxMergeArrays(baseObservableArray, mergeArray, options) {
  const safeOptions = options || {};

  let safeMergeArray = mergeArray;
  if (isObservableArray(mergeArray)) {
    safeMergeArray = mergeArray.slice();
  }

  runInAction('mobxMergeArrays', () => {
    if (safeOptions.arrayPrepend) {
      safeMergeArray.forEach((mergeItem) => {
        baseObservableArray.unshift(mergeItem);
      });
    } else if (safeOptions.arrayAppend) {
      safeMergeArray.forEach((mergeItem) => {
        baseObservableArray.push(mergeItem);
      });
    } else {
      baseObservableArray.replace(mergeArray);
    }
  });

  return baseObservableArray;
}

/**
 * Merges an object, ObservableObject, or ObservableMap into an ObservableMap.
 *
 * @param {Observable} baseObservable
 * @param {{}|Observable|ObservableMap} mergeItem
 * @param {{mapDeleteOnNull: boolean}=} options
 * @returns {Observable}
 */
export function mobxMergeItems(baseObservable, mergeItem, options) {
  const safeOptions = options || {};

  let safeMergeItem = mergeItem;
  if (isBoxedObservable(mergeItem)) {
    safeMergeItem = mergeItem.get();
  } if (isObservableMap(mergeItem)) {
    safeMergeItem = mergeItem.toJSON();
  } else if (mergeItem instanceof Map) {
    throw new Error('MobxMerge: Merging of vanilla Maps is not supported.');
  } else if (isObservable(mergeItem)) {
    safeMergeItem = toJS(mergeItem);
  }

  if (isBoxedObservable(baseObservable)) {
    return mobxMergeBox(baseObservable, safeMergeItem, safeOptions);
  }

  if (isObservableMap(baseObservable)) {
    return mobxMergeMaps(baseObservable, safeMergeItem, safeOptions);
  }

  return mobxMergeObjects(baseObservable, safeMergeItem, safeOptions);
}

/**
 * Merges an item into the given observableMap.
 *
 * @param {ObservableMap} baseMap
 * @param {*} mergeItem
 * @param {{mapDeleteOnNull: boolean}=} options
 */
function mobxMergeMaps(baseMap, mergeItem, options) {
  const safeOptions = options || {};

  runInAction('mobxMergeMaps', () => {
    if (!lodash.isPlainObject(mergeItem)) {
      throw new Error('MobxMerge: Could not merge non-object/non-map into Observable Map.');
    }

    lodash.forEach(mergeItem, (itemValue, itemKey) => {
      if (safeOptions.mapDeleteOnNull && itemValue === null) {
        baseMap.delete(itemKey);
        return;
      }

      const subMergeItem = baseMap.get(itemKey);
      if (subMergeItem && canMergeItems(subMergeItem, itemValue)) {
        mobxMerge(subMergeItem, itemValue, {mergeOptions: safeOptions});
        return;
      }

      baseMap.set(itemKey, itemValue);
    });
  });
}

/**
 * Merges an item into the given observableValue (box).
 *
 * @param {ObservableValue} baseBox
 * @param {*} mergeItem
 * @param {{}=} options
 */
function mobxMergeBox(baseBox, mergeItem, options) {
  const safeOptions = options || {};

  runInAction('mobxMergeBox', () => {
    const existingItem = baseBox.get();

    if (isObservable(existingItem)) {
      mobxMerge(existingItem, mergeItem, {mergeOptions: options});
      return;
    }

    if (!canMergeItems(baseBox, mergeItem)) {
      baseBox.set(mergeItem);
      return;
    }

    // Note: There is only one level of depth for arrays/maps inside observable boxes.
    // Maybe we should throw an error if someone puts a non-primitive inside an observable box...

    const existingIsArray = Array.isArray(existingItem);
    const mergeIsArray = Array.isArray(mergeItem);

    if (existingIsArray || mergeIsArray) {
      if (!existingIsArray && !mergeIsArray) {
        // The canMergeItems() checks for this case, but just in case it gets removed there, check here too.
        baseBox.set(mergeItem);
        return;
      }

      if (safeOptions.arrayPrepend) {
        baseBox.set(mergeItem.concat(existingItem));
      } else if (safeOptions.arrayAppend) {
        baseBox.set(existingItem.concat(mergeItem));
      } else {
        baseBox.set(mergeItem);
      }
      return;
    }

    if (existingItem instanceof Map) {
      lodash.forEach(mergeItem, (itemValue, itemName) => {
        existingItem.set(itemName, itemValue);
      });
      baseBox.set(existingItem);
      return;
    }

    // Deep merging for objects only, since we have assignDeep to handle it for us.
    baseBox.set(assignDeep(existingItem, mergeItem));
  });
}

/**
 * Merges an item into the given observableObject.
 *
 * @param {ObservableObjectAdministration} baseObject
 * @param {*} mergeItem
 * @param {{}=} options
 */
function mobxMergeObjects(baseObject, mergeItem, options) {
  const safeOptions = options || {};

  const existingValues = baseObject.$mobx.values;

  runInAction('mobxMergeObjects', () => {
    if (!lodash.isPlainObject(mergeItem)) {
      throw new Error('MobxMerge: Could not merge non-object/non-map into Observable Object.');
    }

    lodash.forEach(mergeItem, (itemValue, itemKey) => {
      if (!existingValues[itemKey]) {
        throw new Error(
          `MobxMerge: Attempting to add non-tracked key '${itemKey}' to Observable Object.`
          + 'The key must be defined upon Observable creation or use an Observable Map.'
        );
      }

      const subMergeItem = baseObject[itemKey];
      if (subMergeItem && canMergeItems(subMergeItem, itemValue)) {
        mobxMerge(subMergeItem, itemValue, {mergeOptions: safeOptions});
        return;
      }

      if (lodash.isPlainObject(itemValue) && !isObservable(itemValue)) {
        baseObject[itemKey] = observable(itemValue);
      } else {
        baseObject[itemKey] = itemValue;
      }
    });
  });
}

/**
 * Determines whether or not the given items can go into a sub-merge recursion or perform a box merge.
 *
 * @param {Observable} baseItem
 * @param {*} newItem
 * @returns {boolean}
 */
function canMergeItems(baseItem, newItem) {
  const itemIsArray = Array.isArray(newItem);

  const isMergeable = Boolean(lodash.isPlainObject(newItem) || itemIsArray || newItem instanceof Map);
  if (!isMergeable) {
    return false;
  }

  if (!isObservable(baseItem)) {
    return false;
  }

  if (!isBoxedObservable(baseItem)) {
    const baseIsArray = isObservableArray(baseItem);
    if (baseIsArray || itemIsArray) {
      return Boolean(baseIsArray && itemIsArray);
    }

    return true;
  }

  const checkItem = baseItem.value;
  const baseIsArray = Array.isArray(checkItem);

  const baseIsMergeable = Boolean(lodash.isPlainObject(checkItem) || baseIsArray || checkItem instanceof Map);
  if (!baseIsMergeable) {
    return false;
  }

  if (baseIsArray || itemIsArray) {
    return Boolean(baseIsArray && itemIsArray);
  }

  return true;
}
