import React from 'react';
import './App.css';

const regexOperation = /[\+\-\*\/=]/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
      lastAcceptedValue: "",
      prevOperation: "",
      formula: "",
      result: "",
      negativeValue: false
    };
  }
  handleClear() {
    this.setState({
      display: "0",
      lastAcceptedValue: "",
      prevOperation: "",
      formula: "",
      result: "",
    })
  }
  handleFirstInput(value) {
    this.setState((state) => {
      return {
        display: value,
        lastAcceptedValue: value,
        formula: value,
        result: value
      }
    })
  }
  handleOperations(value) {
    let _result = this.calulateResult(this.state.prevOperation, this.state.result, this.state.lastAcceptedValue)
    if (value === "=") {
      this.setState((state) => {
        return {
          display: _result,
          prevOperation: "",
          formula: state.formula + value + _result,
          result: _result,
        }
      })
    } else if (value === "-" && regexOperation.test(this.state.display)) {
      this.setState((state) => {
        return {
          display: value,
          formula: state.formula + value,
          lastAcceptedValue: "",
          negativeValue: true
        }
      })
    } else {
      this.setState((state) => {
        return {
          display: value,
          lastAcceptedValue: "",
          prevOperation: value,
          formula: state.formula + value,
          result: _result,
          negativeValue: false
        }
      })
    }
  }
  handleNumber(value) {
    //clean display from operation
    if (regexOperation.test(this.state.display)) {
      this.setState({
        display: ""
      })
    }
    //no more than one 0 or . can be taken
    if ((value === "0" && this.state.display === "0") || (value === "." && this.state.display.includes("."))) {
      return;
    }
    //handle the first value
    if (this.state.prevOperation === "") {
      this.setState((state) => {
        return {
          display: state.display + value,
          lastAcceptedValue: state.lastAcceptedValue + value,
          formula: state.formula + value,
          result: state.result + value
        }
      })
    } else {
      if (this.state.negativeValue) {
        this.setState((state) => {
          return {
            display: state.display + value,
            lastAcceptedValue: "-" + value,
            formula: state.formula + value,
            negativeValue: false,
          }
        })
      } else {
        this.setState((state) => {
          return {
            display: state.display + value,
            lastAcceptedValue: state.lastAcceptedValue + value,
            formula: state.formula + value,
          }
        })
      }
    }
  }
  handleInput(e) {
    let value = e.target.value
    //handle default state 0
    if (this.state.formula === "") {
      this.handleFirstInput(value)
    } else {
      //operation entered
      if (regexOperation.test(value)) {
        this.handleOperations(value)
      }
      //number is enetered 
      else {
        this.handleNumber(value)
      }
    }
  }
  calulateResult(operation, a, b) {
    console.log("operation:", operation, " a:", a, " b:", b)
    //if number was accepted and operation wasn't entered
    if (this.state.prevOperation === "" || regexOperation.test(this.state.display)) {
      return a
    }
    switch (operation) {
      case "+": return parseFloat(a) + parseFloat(b);
      case "-": return parseFloat(a) - parseFloat(b);
      case "*": return parseFloat(a) * parseFloat(b);
      case "/": return (Math.round((parseFloat(a) / parseFloat(b)) * 10000)) / 10000;
    }
  }

  render() {
    return (
      <div id="calculator">
        <div className="container">
          <div className="containerDisplay">
            <div id="formula" className="formula display">{this.state.formula}</div>
            <div id="display" className="input display">{this.state.display}</div>
          </div>
          <Buttons clear={this.handleClear.bind(this)} input={this.handleInput.bind(this)} />
        </div >
      </div>
    );
  }
}

class Buttons extends React.Component {
  render() {
    return (
      <div>
        <button id="clear" className="button clear" onClick={this.props.clear}>AC</button>
        <button id="divide" className="button operations" onClick={this.props.input} value="/">/</button>
        <button id="multiply" className="button operations" onClick={this.props.input} value="*">*</button>
        <button id="seven" className="button" onClick={this.props.input} value="7">7</button>
        <button id="eight" className="button" onClick={this.props.input} value="8">8</button>
        <button id="nine" className="button" onClick={this.props.input} value="9">9</button>
        <button id="subtract" className="button operations" onClick={this.props.input} value="-">-</button>
        <button id="four" className="button" onClick={this.props.input} value="4">4</button>
        <button id="five" className="button" onClick={this.props.input} value="5">5</button>
        <button id="six" className="button" onClick={this.props.input} value="6">6</button>
        <button id="add" className="button operations" onClick={this.props.input} value="+">+</button>
        <button id="one" className="button" onClick={this.props.input} value="1">1</button>
        <button id="two" className="button" onClick={this.props.input} value="2">2</button>
        <button id="three" className="button" onClick={this.props.input} value="3">3</button>
        <button id="equals" className="button" onClick={this.props.input} value="=">=</button>
        <button id="zero" className="button" onClick={this.props.input} value="0">0</button>
        <button id="decimal" className="button" onClick={this.props.input} value=".">.</button>
      </div>
    );
  }
}

export default App;

