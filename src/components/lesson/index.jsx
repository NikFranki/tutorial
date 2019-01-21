import React, { Component } from 'react';
import { MockData } from "../../mock/index";
import request from "../../services/request";

export default class Lesson extends Component {
    state = {
        lessonlist: []
    };

    componentDidMount() {
        const { langs, id, onSave } = this.props;
        request.post('p/cover/list', { categoryId: id }, (res) => {
            onSave('lessonlist', res.coverList);
            this.setState({
                lessonlist: res.coverList
            });
        }, (error) => { 
            console.log(error);
            if (error.code === 99999) {
                message.error(langs["MSG.99999"]);
                return;
            }
        });
    }

    render() {
        const { onJumpTo } = this.props;
        const { lessonlist } = this.state;
        return (
            <div className="series">
                <ul>
                    {
                        lessonlist.map((item, index) => (
                            <li onClick={() => onJumpTo('Content', item.coverName, item.id)} key={index}>
                                <a>{item.coverName}</a>
                                <div className="sign"></div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}
