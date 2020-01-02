// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Message from '../../components/message';

// Config
import config from '../../config';

// Actions
import { getChat } from '../../redux/actions/chatActions';

// Assets
import './index.scss';

// Utils
import { capitalize } from '../../utils/utils';

class Room extends Component {
    constructor(props) {
        super(props);
        // Init socket connection
        this.socket = io(config.baseUrl);
    }

    // Init state
    state = {
        name: '',
        message: '',
        chat: []
    };
    // Function to keep chat box at the bottom
    scrollToBot(id) {
        const divToScrollTo = document.getElementById(id);
        if (divToScrollTo) {
            let amountToScroll = divToScrollTo.scrollHeight;
            divToScrollTo.scrollBy({
                top: amountToScroll + 1000,
                left: 0,
                behavior: 'smooth'
            });
        }
    }
    UNSAFE_componentWillMount() {
        // Retrieve chats
        this.props.getChat();
        console.log(this.props.auth);
    }
    componentDidMount() {
        // Check if user is already authenticated
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        } else {
            // Listen for msg
            this.socket.on('msg', data => {
                if (data) {
                    // Update incoming messages
                    this.setState({
                        chat: [...this.state.chat, data]
                    });
                    // Scroll down
                    this.scrollToBot('chatBox');
                }
            });
            // Load chat in to state
            let newChat = [];
            this.props.chat.chat.map((data, index) => {
                let { username, content, time } = data;
                username = capitalize(username);
                content = capitalize(content);
                let tempMsg = { username, content, time };
                newChat.push(tempMsg);
            });
            this.setState(
                {
                    chat: newChat,
                    user: this.props.auth.user.data.username
                },
                () => {
                    this.scrollToBot('chatBox');
                }
            );
        }
    }
    componentWillUnmount() {
        // Remove socket listeners
        this.socket.removeAllListeners();
    }
    handleChange(data) {
        this.setState({
            [data.target.name]: [data.target.value]
        });
        console.log(this.props.auth);
    }
    Submit(e) {
        e.preventDefault();
        // Format data from state to submit
        let { name, message } = this.state;
        let date = new Date();
        let username = capitalize(name);
        let content = capitalize(message[0]);
        let hour = date.getHours();
        let min = date.getMinutes();
        let time = `${hour}:${min}`;
        let msg = { username, content, time };
        // Submit the msg
        this.socket.emit('msg', msg);
        // Push the sended msg to state to show in screen
        let lastChat = this.state.chat;
        lastChat.push(msg);
        this.setState(
            {
                message: '',
                chat: lastChat
            },
            () => {
                this.scrollToBot('chatBox');
            }
        );
    }
    render() {
        let { chat, message, user: username } = this.state;
        return (
            <div className="wrapper">
                <div className="chatBox">
                    <p className="chatBox--title">Chat Room</p>
                    <div className="chatBox--box" id="chatBox">
                        {chat.map((data, index) => {
                            return (
                                <div key={index} className="chatBox--message">
                                    <Message
                                        username={data.username}
                                        content={data.content}
                                        time={data.time}
                                        logUser={capitalize(username)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <form className="form">
                        <label className="form--label">
                            Welcome {username}
                        </label>
                        <br />
                        <input
                            placeholder="Chat Here"
                            type="text"
                            name="message"
                            value={message}
                            onChange={this.handleChange.bind(this)}
                            className="form--input"
                        />
                        <button
                            onClick={this.Submit.bind(this)}
                            className="form--button"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
Room.propTypes = {
    getChat: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    chat: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    chat: state.chat
});

export default connect(mapStateToProps, { getChat })(withRouter(Room));
