import React from "react";
import Counter from "../components/Counter";
import Counters from "../components/Counters";

export default class Clicker extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.onClickHandler}>Kliknij!</button><br />

                <Counter />
                <Counters count={0} />
           </div>
        );
    }

    onClickHandler() {
        alert("Kliknięto!");
    }
}