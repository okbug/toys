import { effectScope, getCurrentInstance, inject, reactive } from "./vue-next.esm";
import { SymbolPinia } from "./rootStore";

export function defineStore(idOrOptions, setup) {
  let id;
  let options;

  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
  }

  function useStore() {
    const currentInstance = getCurrentInstance();

    // 注册了一个store
    const pinia = currentInstance && inject(SymbolPinia);

    if (!pinia._s.has(id)) {
      createOptionsStore(id, options, pinia);
    }
    const store = pinia._s.get(id);

    return store;
  }
  return useStore;
}

function createOptionsStore(id, options, pinia) {
  let { state, getters, actions } = options;
  let scope;
  const store = reactive({});
  function setup() {
    // ref放入的是对象 会被自动proxy
    pinia.state.value[id] = state ? state() : {};
    const localState = pinia.state.value[id];
    return localState; // 这个地方的状态还要扩展
  }
  // _e 能停止所有的store
  // 每个store还能停止自己的
  const setupStore = pinia._e.run(() => {
    scope = effectScope();
    return scope.run(() => setup());
  });

  // 我们需要对setupStore部分属性进行再次处理

  // setupStore
  Object.assign(store, setupStore);
  pinia._s.set(id, store);
}
