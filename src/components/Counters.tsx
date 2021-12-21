import React from "react";
import SingleCounter from "./SingleCounter";
import '../styles/Counters.css';

class Counters extends React.Component<{ count: number }, { [counter: string]: number }> {
    constructor() {
        super({count: 0});
        this.onIncreaseAll = this.onIncreaseAll.bind(this);
        this.onDecreaseAll = this.onDecreaseAll.bind(this);
        this.increaseCounter = this.increaseCounter.bind(this);
        this.decreaseCounter = this.decreaseCounter.bind(this);
        this.state = {
            counter1: 0, counter2: 0, counter3: 0
        };
    }
    increaseCounter(counterIndex: number) {
        const counter = `counter${counterIndex}`;
        this.setState({ [counter]: this.state[counter] + 1 });
    }
    decreaseCounter(counterIndex: number) {
        const counter = `counter${counterIndex}`;
        this.setState({ [counter]: this.state[counter] - 1 });
    }
    onIncreaseAll() {
        for (let counterIndex = 1; counterIndex <= 3; counterIndex++) {
            this.increaseCounter(counterIndex);
        }
    }
    onDecreaseAll() {
        for (let counterIndex = 1; counterIndex <= 3; counterIndex++) {
            this.decreaseCounter(counterIndex);
        }
    }
    render() {
        return (
            <div>
                <SingleCounter count={this.state.counter1}
                    counterIndex={1}
                    onIncrease={this.increaseCounter}
                    onDecrease={this.decreaseCounter}
                />
                <SingleCounter count={this.state.counter2}
                    counterIndex={2}
                    onIncrease={this.increaseCounter}
                    onDecrease={this.decreaseCounter}
                />
                <SingleCounter count={this.state.counter3}
                    counterIndex={3}
                    onIncrease={this.increaseCounter}
                    onDecrease={this.decreaseCounter}
                />

                <button onClick={this.onDecreaseAll}>-</button>
                <span>DecreaseAll IncreaseAll</span>
                <button onClick={this.onIncreaseAll}>+</ button>
            </div >
        );
    }
}



export default Counters;