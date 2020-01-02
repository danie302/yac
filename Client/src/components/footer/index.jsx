// Dependencies
import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div className="bg-dark text-white mt-5 p-4 text-center">
                <footer>
                    Chat Group By Daniel Daza at {new Date().getFullYear()}
                </footer>
            </div>
        );
    }
}

export default Footer;
