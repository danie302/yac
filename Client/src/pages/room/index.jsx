// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import Router from 'next/router';

import './index.scss';

class Room extends Component {
    state = {
        name: '',
        message: '',
        chat: []
    };
    capitalize(s) {
        if (typeof s !== 'string') return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    }
    scrollToBot(id) {
        const divToScrollTo = document.getElementById(id);
        if (divToScrollTo) {
            let amountToScroll = divToScrollTo.scrollHeight;
            divToScrollTo.scrollBy({
                top: amountToScroll + 100,
                left: 0,
                behavior: 'smooth'
            });
        }
    }
    componentDidMount() {
        console.log(this.props.auth);

        if (!this.props.auth.isAuthenticated) {
            Router.push('/login');
        } else {
            this.socket = io('http://192.168.1.4:5000');
            this.socket.on('msg', data => {
                if (data) {
                    this.setState({
                        chat: [...this.state.chat, data]
                    });
                    this.scrollToBot('chatBox');
                }
            });
            if (this.props.auth.user.data) {
                this.setState({ name: this.props.auth.user.data.username });
            }
        }
    }
    handleChange(data) {
        this.setState({
            [data.target.name]: [data.target.value]
        });
    }
    Submit(e) {
        e.preventDefault();
        let { name, message, chat } = this.state;
        name = this.capitalize(name);
        message = this.capitalize(message[0]);

        this.socket.emit('msg', {
            name: name,
            msg: message
        });
        this.setState({
            message: '',
            chat: [...chat, `${name}: ${message}`]
        });
        this.scrollToBot('chatBox');
    }
    render() {
        let { chat, message, name } = this.state;
        return (
            <div className="wrapper">
                <h1 className="home">Chat Room</h1>
                <form className="form">
                    <label>Welcome {this.state.name}</label>
                    <br />
                    <input
                        placeholder="Chat Here"
                        type="text"
                        name="message"
                        value={message}
                        onChange={this.handleChange.bind(this)}
                        className="form--input"
                    />
                    <br />
                    <button
                        onClick={this.Submit.bind(this)}
                        className="form--button"
                    >
                        Send
                    </button>
                </form>
                <div className="chatBox">
                    <p className="chatBox--title">Chat messages</p>
                    <ul className="chatBox--box" id="chatBox">
                        {chat.map((data, index) => {
                            return (
                                <li key={index} className="chatBox--message">
                                    {data}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}
Room.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Room);
