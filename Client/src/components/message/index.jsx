// Dependencies
import React, { Component } from 'react';

// Assets
import './message.scss';

// Utils
import { isDefined } from '../../utils/is';
import { scrollToBot, capitalize } from '../../utils/utils';

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            username: '',
            content: '',
            time: '',
            video: null
        };
    }
    componentDidMount() {
        this.setState(
            {
                id: this.props.id,
                username: this.props.username,
                content: this.props.content,
                time: this.props.time
            },
            () => {
                scrollToBot('chatBox');
            }
        );
        if (this.props.content.search(/youtube/) === 1) {
            let video = this.props.content.replace('/youtube', '');
            if (isDefined(video)) {
                video = encodeURIComponent(video.trim());
                if (isDefined(video)) {
                    fetch(
                        `https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=${video}&type=video&videoDefinition=any&key=AIzaSyAaUgFuVypDeWug-2htEXKEssI7TpifSg8`
                    )
                        .then(res => {
                            return res.json();
                        })
                        .then(res => {
                            this.setState({
                                video: res.items[0].id.videoId,
                                content: res.items[0].snippet.title
                            });
                        });
                }
            }
        }
    }

    render() {
        let message;

        if (isDefined(this.state.video)) {
            message = (
                <iframe
                    title="ytVideo"
                    className="messageBox--video"
                    src={`https://www.youtube.com/embed/${this.state.video}`}
                ></iframe>
            );
        } else {
            message = (
                <div
                    className={`messageBox--content ${
                        this.props.logUser === this.props.username
                            ? 'messageBox--left'
                            : 'messageBox--right'
                    }`}
                >
                    {this.state.content}
                </div>
            );
        }
        return (
            <div className="messageBox">
                <div
                    className={`messageBox--name ${
                        this.props.logUser === this.props.username
                            ? 'messageBox--left'
                            : 'messageBox--right'
                    }`}
                >
                    {capitalize(this.state.username)}
                </div>
                {message}
                <div
                    className={`messageBox--time ${
                        this.props.logUser === this.props.username
                            ? 'messageBox--left'
                            : 'messageBox--right'
                    }`}
                >
                    {this.state.time}
                </div>
            </div>
        );
    }
}

export default Message;
