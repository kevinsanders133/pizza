import React from "react";
import { useState, useEffect, useRef, useLayoutEffect } from "react";

interface IData {
    name: string;
    weapon: string;
    rounds: string;
    potwor: string;
    won: boolean;
}

const Form = () => {

    const [data, setData] = useState({} as IData);

    const paragraphRef = useRef<null | HTMLParagraphElement>(null);

    useEffect(() => {
        let result = '';

        if (data.won) {
            result = `${data.name} zatłukł potwora: ${data.potwor} za pomocą: ${data.weapon} po ${data.rounds} starciach`;
        } else {
            result = `${data.name} nie zatłukł potwora: ${data.potwor}`;
        }

        if (paragraphRef.current) {
            paragraphRef.current.textContent = result;
        }
    }, [data]);
    
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const elements = target.elements;
        setData({
            name: (elements[1] as HTMLInputElement).value,
            weapon: (elements[2] as HTMLInputElement).value,
            rounds: (elements[3] as HTMLInputElement).value,
            potwor: (elements[4] as HTMLSelectElement).value,
            won: (elements[5] as HTMLInputElement).checked,
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    height: "500px",
                    width: "400px",
                    margin: "100px 0 0 100px",
                }}>
                    <legend>Form</legend>
                    <input type="text" name="name" placeholder="Name" />
                    <input type="text" name="weapon" placeholder="Weapon" />
                    <label>Number of rounds: <input type="number" name="rounds" /></label>
                    <select name="potwor">
                        <option value="1">Potwor 1</option>
                        <option value="2">Potwor 2</option>
                        <option value="3">Potwor 3</option>
                    </select>
                    <label>Won: <input type="checkbox" name="won" /></label>
                    <input type="submit" className="submit" />
                </fieldset>
            </form>

            <p className="paragraph" ref={paragraphRef}></p>
        </div>
    );
}

export default Form;