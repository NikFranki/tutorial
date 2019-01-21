import React, { Component } from 'react';
import logo from './logo.svg';
import { TutorialApp } from 'mblock-tutorial';
import './App.css';

class App extends Component {

    state = {
        visible: false
    };

    componentDidMount() {
        console.log(this.refs.tutorial);
    }

    handleBtn = (flag) => {
        this.setState({ visible: flag });
    }

    render() {
        return (
            <div className="App">
                <TutorialApp visible={this.state.visible} ref="tutorial" />
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                    <div>
                        <button onClick={this.handleBtn.bind(this, true)}>open drawer</button>
                        <button onClick={this.handleBtn.bind(this, false)}>close drawer</button>
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
