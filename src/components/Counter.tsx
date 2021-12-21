import React from "react";

class Counter extends React.Component<{}, { counter: number }> {
    constructor() {
        super({});
        this.state = { counter: 0 };
    }

    increment() {
        this.setState({ counter: this.state.counter + 1 });
    }

    decrement() {
        this.setState({ counter: this.state.counter - 1 });
    }

    render() {
        return (
            <div>
                <button onClick={this.decrement.bind(this)}>-</button>
                <output>{this.state.counter}</output>
                <button onClick={this.increment.bind(this)}>+</button>
            </div>
        );
    }
}

export default Counter;