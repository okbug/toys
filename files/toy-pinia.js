const noop = () => {};

function defineStore(idOrOptions, setup, setupOptions = noop) {
  const isSetupStore = typeof setup === "function";
  let id,options;
  if (typeof idOrOptions === 'string') {
    id = idOrOptions
    // the option store setup will contain the actual options in this case
    options = isSetupStore ? setupOptions : setup
  } else {
    options = idOrOptions
    id = idOrOptions.id
  }

  return createOptionsStore(id, options);
}

function createOptionsStore(id, options) {
    const { state, actions, getters } = options

    const localState = state;

    return Object.assign(
        localState,
        actions,
        Object.keys(getters || {}).reduce((computedGetters, name) => {
            computedGetters[name] = getters[name].call(store, store)
            return computedGetters
          }, {})
    )
}

function createSetupStore() {}
