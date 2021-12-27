import React from 'react';
import Client from './Client';
import '../styles/client.css';

class ClientsList extends React.Component {
    render(): React.ReactNode {
        return (
            <main className="main">
                <div className="client-list">
                    <Client name="Jarek" address="Adres 1" number="123"/><br />
                    <Client name="Marek" address="Adres 2" number="456"/><br />
                    <Client name="Czarek" address="Adres 3" number="789"/>
                </div>
            </main>
        )   
    }
}

export default ClientsList;
