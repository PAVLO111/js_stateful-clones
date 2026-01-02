'use strict';

/**
 * @param {Object} clone
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const arrStates = [];
  const clone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        if (action.extraData && typeof action.extraData === 'object') {
          Object.assign(clone, action.extraData);
        }
        break;
      }

      case 'removeProperties': {
        if (Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete clone[key];
          }
        }
        break;
      }

      case 'clear': {
        for (const key in clone) {
          delete clone[key];
        }
        break;
      }
    }

    arrStates.push({ ...clone });
  }

  return arrStates;
}

module.exports = transformStateWithClones;
