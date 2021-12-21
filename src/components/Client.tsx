import React from 'react';

interface IClient {
    name: string;
    address: string;
    number: string;
}

class Client extends React.Component<IClient, {}> {
    constructor(props: IClient) {
        super(props);
    }
    render(): React.ReactNode {
        return(
            <ul className="client-item">
                <li>Name: {this.props.name}</li>
                <li>Address: {this.props.address}</li>
                <li>Number: {this.props.number}</li>
            </ul>
        )
    }
}

export default Client
