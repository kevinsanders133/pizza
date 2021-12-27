import React, { useState, useEffect } from 'react';
import IPage from '../interfaces/page';
import axios from 'axios';

const Cart: React.FunctionComponent<IPage> = (props) => {

    const [data, setData] = useState({});

    const getData = async () => {
        const res = await axios.get('http://localhost:8081/cart2');
        const obj = res.data;
        console.log(obj);
        setData(obj);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <h1>This is the cart page</h1>
            {/* {data} */}
        </div>
    )
}

export default Cart;
