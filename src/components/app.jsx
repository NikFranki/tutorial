import React, { Component } from 'react';
import Sery from './sery/index';
import Lesson from './lesson/index';
import Content from './content/index';
import { Icon } from 'antd';
import Storage from "../util/localstorage";
import Zh from "../resource/language/i18n/zh.json";
import En from "../resource/language/i18n/en.json";
import 'antd/dist/antd.less';
import "./app.less";

export default class App extends Component {
    static defaultProps = {
        visible: true
    };

    state = {
        curShowComponent: 'Sery',
        cursery: '',
        curlesson: '',
        curstep: '',
        curseryId: 0,
        curlessonId: 0,
        serylist: [],
        contentlist: [],
        lessonlist: []
    };

    jumpToComponent = (componentname, value, id) => {
        if (componentname === 'Lesson') {
            this.setState({
                cursery: value,
                curseryId: id
            });
        } else if (componentname === 'Content') {
            this.setState({
                curlesson: value,
                curlessonId: id
            });
        }
        this.setState({
            curShowComponent: componentname
        });
    }

    handleSaveList = (type, list) => {
        const con = {};
        con[type] = list;
        this.setState(con);
    }

    renderComponent = () => {
        const languages = { zh: Zh, en: En };
        const langKey = Storage.get('lang') || 'en';
        const {
            curShowComponent,
            curseryId,
            curlessonId,
            lessonlist,
            contentlist
        } = this.state;
        const props = {
            langs: languages[langKey],
            onJumpTo: this.jumpToComponent,
            onSave: this.handleSaveList
        };
        const actions = new Map([
            ['Sery', {
                component: <Sery {...props} />
            }],
            ['Lesson', {
                component: <Lesson id={curseryId} {...props} />
            }],
            ['Content', {
                component: <Content id={curlessonId} lessonlist={lessonlist} contentlist={contentlist} {...props} />
            }]
        ]);
        return actions.get(curShowComponent).component;
    }

    back = () => {
        const { curShowComponent } = this.state;
        const actions = new Map([
            ['Sery', 'Sery'],
            ['Lesson', 'Sery'],
            ['Content', 'Lesson']
        ]);
        this.setState({
            curShowComponent: actions.get(curShowComponent)
        });
    }

    render() {
        const { visible } = this.props;
        const { curShowComponent, cursery, curlesson } = this.state;
        const titleObj = {
            'Sery': 'tutorials',
            'Lesson': cursery,
            'Content': curlesson
        };
        const title = titleObj[curShowComponent];
        const isNeedBackBtn = curShowComponent !== 'Sery';
        return (
            <div className="tutorial-app">
                <div className={`drawer-open ${visible ? 'active' : ''}`}>
                    <div className="mask"></div>
                    <div className="drawer-wrapper">
                            {
                                isNeedBackBtn &&<header className='hasBackBtn'>
                                    <div onClick={this.back}>
                                        <label>
                                            <Icon type="left" />
                                        </label>
                                        <span className="title">
                                            {title}
                                        </span>
                                    </div>
                                </header>
                            }
                            <main>
                                {this.renderComponent()}
                            </main>
                    </div>
                </div>
            </div>
        )
    }
}
