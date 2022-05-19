/* 
    React.createElement
    返回的东西给render函数
    所以render函数需要接受一个对象
    有以下参数
    { type, ref, key, props }
*/

((global) => {
  /**
   *
   * @param {VNode} vdom React.createElement创建的节点
   * @param {DOM} container 真实的DOM节点
   */
  function render(vdom, container) {
    mount(vdom, container);
  }

  function mount(vdom, container) {
    let newDOM = createDOM(vdom);
    if (newDOM) {
      container.addendChild(newDOM);
      if (newDOM.componentDidMount) {
        newDOM.componentDidMount();
      }
    }
  }

  /**
   * 把虚拟DOM转为真实DOM
   * @param {VNode} vdom
   */
  function createDOM(vdom) {
    let { type, props, ref } = vdom;
    let dom; // 真实DOM
    if (typeof type === "function") {
      // 是组件
      if (type.isReactComponent) {
        return mountClassComponent(vdom);
      } else {
        return mountFunctionComponent(vdom);
      }
    } else if (typeof type === "string") {
      // HTMl 原生元素 h1,h2,div,span,button,input,form等等
      dom = document.createElement(type);
    }
  }

  function mountClassComponent(vdom) {
    let { type: ClassComponent, props, ref } = vdom;
    let classInstance = new ClassComponent(props); // 创建类组件的实例
    vdom.classInstance = classInstance;//在虚拟DOm上挂载一个属性，指向类组件的实例
    if (ref) ref.current = classInstance;
    let renderVdom = classInstance.render();
    let dom = createDOM(renderVdom);
    return dom
  }

  function mountFunctionComponent(vdom) {
    let { type: functionComponent, props } = vdom;
    let renderVdom = functionComponent(props); // 执行函数组件 获得vdom
    vdom.oldRenderVdom = renderVdom;
    if (!renderVdom) return null;
    return createDOM(renderVdom);
  }

  const ReactDOM = {
    render,
  };

  global.ReactDOM = ReactDOM;
})(window);
