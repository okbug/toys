import React from 'react';
// import ReactDOM from 'react-dom';
import MyRender from './render';
function App() {
    return <div className="app-container">
        <h1>Hello World</h1>
        <button>ClickMe</button>
    </div>
}


MyRender.render(<App/>, document.querySelector('#app'))