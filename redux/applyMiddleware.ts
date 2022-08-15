type AnyFunc = (...args: any) => any;
interface State<T = any> {
    getState: () => T;
    dispatch: (...args: any) => void;
    subscribe: () => () => void;
}

type CreateStore<T> = (reducer: AnyFunc) => State<T>

function compose(...functions: AnyFunc[]): AnyFunc {
    if (functions.length === 0) {
        return o => o;
    }
    if (functions.length === 1) {
        return functions[0];
    }

    return functions.reduce((a, b) => (...args) => a(b(...args)))
}


function applyMiddleware(...middlewareArray) {
    return (createStore: CreateStore<any>) => reducer => {
        const store = createStore(reducer);
        let dispatch = store.dispatch;

        const API = {
            getState: store.getState,
            dispatch: (action, ...args: any[]) => dispatch(action, ...args),
        }

        const middlewareChain = middlewareArray.map(m => m(API));

        dispatch = compose(...middlewareChain)(store.dispatch);

        return {
            ...store,
            dispatch,
        }
    }
}