;((global) => {
    // const h = React.createElement

    
    /**
     * 
     * @param {string | VNode} type 组件 或者 HTML原生标签
     * @param {*} config attrs
     * @param {VNode | VNode[] | string | string[] | number | number[]} children
     * 
     */
    function createElement(type, config, children) {
        let ref, key;
        if (config) {
            ref = config.ref;
            key = config.key;
        }
        let props = { ...config };
        if (arguments.length > 3) {
            props.children = Array.prototype.slice(arguments, 2);
        } else {
            props.children = children || [];
        }

        return {
            // $$typeof: Symbol(react.element),
            type,
            ref,
            key,
            props,
        }
    }
    // console.log(h(Child, {a: 1}).props);
    // {a: 1}
    const React = {
        createElement
    };
    global.React = React;
})(window)