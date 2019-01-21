import React, { Component } from 'react';
import { MockData } from "../../mock/index";
import { Icon } from "antd";
import request from "../../services/request";

export default class Sery extends Component {
    state = {
        serylist: []
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { langs, onSave } = this.props;
        request.post('p/category/list', {}, (res) => {
            onSave('serylist', res.categoryList);
            this.setState({
                serylist: res.categoryList
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
        const { serylist } = this.state;
        return (
            <div className="appContainer">
                <nav>
                    <ul className="series-wrapper">
                        {
                            serylist.map((sery, index) => (
                                <li onClick={() => onJumpTo('Lesson', sery.categoryName, sery.id)} key={index}>
                                    <a>
                                        <span>{sery.categoryName}</span>
                                        <Icon type="right" />
                                    </a>
                                    <div className="sign"></div>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            </div>
        )
    }
}
