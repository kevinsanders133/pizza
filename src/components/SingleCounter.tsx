import React from "react";

class SingleCounter extends React.Component<ISingleCounter, {}> {
    constructor(props: ISingleCounter) {
        super(props);
        this.onIncrease = this.onIncrease.bind(this);
        this.onDecrease = this.onDecrease.bind(this);
    }
    onIncrease() {
        this.props.onIncrease(this.props.counterIndex);
    }
    onDecrease() {
        this.props.onDecrease(this.props.counterIndex);
    }
    render() {
        return (
            <div>
                <button onClick={this.onDecrease}>-</button>
                <span>{this.props.count}</span>
                <button onClick={this.onIncrease}>+</ button>
            </div >
        );
    }
}

interface ISingleCounter {
    onIncrease: Function,
    onDecrease: Function,
    counterIndex: number,
    count: number
}

export default SingleCounter;