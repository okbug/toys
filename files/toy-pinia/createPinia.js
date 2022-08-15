import { effectScope, markRaw, ref } from "vue";
import { SymbolPinia } from "./rootStore";

export function createPinia(){
    const scope = effectScope(true);

    // run方法的返回值就是这个fn的返回结果
    const state = scope.run(()=>ref({}))

    const pinia = markRaw({
        install(app){
            // pinia 希望能被共享出去 
            // 将pinia实例暴露到app上，所有的组件都可以通过inject注入进来
            pinia._a = app;
            app.provide(SymbolPinia,pinia);
            app.config.globalProperties.$pinia = pinia
            // useStore setup
        },
        _a:null,
        state, // 所有的状态
        _e:scope, // 用来管理这个应用的effectScope
        _s:new Map() // 记录所有的store
    });


    return pinia;
}