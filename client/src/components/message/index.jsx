// Dependencies
import React, { Component } from 'react';

// Assets
import './message.scss';

class Message extends Component {
    render() {
        return (
            <div className="messageBox">
                <div
                    className={`messageBox--name ${
                        this.props.logUser === this.props.username
                            ? 'messageBox--left'
                            : 'messageBox--right'
                    }`}
                >
                    {this.props.username}
                </div>
                <div
                    className={`messageBox--content ${
                        this.props.logUser === this.props.username
                            ? 'messageBox--left'
                            : 'messageBox--right'
                    }`}
                >
                    {this.props.content}
                </div>
                <div
                    className={`messageBox--time ${
                        this.props.logUser === this.props.username
                            ? 'messageBox--left'
                            : 'messageBox--right'
                    }`}
                >
                    {this.props.time}
                </div>
            </div>
        );
    }
}

export default Message;
