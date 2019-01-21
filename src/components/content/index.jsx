import React, { Component } from 'react';
import { MockData } from "../../mock/index";
import { Button, Modal } from "antd";
import request from "../../services/request";

export default class Content extends Component {
    
    state = {
        contentlist: [],
        curindex: 0,
        visible: false,
        curselectItem: { content: '', type: '' },
        curModalType: 'media', //弹框类型 媒体资源、引导学习
        isLastLesson: false
    };

    componentWillUnmount () {
        console.warn('willUnmount !!!')
    }

    componentDidMount() {
        const { langs, id, onSave } = this.props;
        request.post('p/content/list', { coverId: id }, (res) => {
            onSave('contentlist', res.contentList);
            this.setState({
                contentlist: res.contentList
            });
        }, (error) => { 
            console.log(error);
            if (error.code === 99999) {
                message.error(langs["MSG.99999"]);
                return;
            }
        });
    }

    handlePrevBtn = () => {
        this.setState({
            curindex: this.state.curindex - 1
        });
    }

    handleNextBtn = () => {
        const { curindex } = this.state;
        const { lessonlist, contentlist, id } = this.props;
        if (curindex === (contentlist.length - 1)) {
            const lessonIds = lessonlist.map(item => { return item.id; });
            const lessonIndex = lessonIds.indexOf(id);
            if (lessonIndex === (lessonlist.length - 1)) {
                this.setState({
                    curModalType: 'guidance',
                    isLastLesson: true
                });
                this.showModal('guidance');
                return;
            }
            this.showModal('guidance');
            return;
        }
        this.setState({
            curindex: curindex + 1
        });
    }

    showModal = (item) => {
        if (item === 'guidance') {
            this.setState({
                visible: true,
                curModalType: 'guidance'
            });
        } else {
            this.setState({
                visible: true,
                curselectItem: item,
                curModalType: 'media'
            });
        }
    }

    renderModal = () => {
        const { langs } = this.props;
        const { curselectItem, curModalType, isLastLesson } = this.state;
        const actions = new Map([
            ['media', {
                width: 800,
                className: "media-modal",
                title: "",
                footer: null,
                onOk: undefined
            }],
            ['guidance', {
                width: 360,
                className: 'guidance-modal',
                title: <i className="mblock-icon icon-success"></i>,
                onOk: this.handleOk,
                okText: isLastLesson ? langs['tutorial-browse-more-lesson'] : langs['tutorial-start-next-lesson']
            }]
        ]);
        const mediaCon = curselectItem.type === 'image'
            ?
            <img src={curselectItem.content} alt="" />
            :
            <video controls
                src={curselectItem.content}
                width="100%" height="100%">
                Sorry, your browser doesn't support embedded videos,
                but don't worry
            </video>;
        const guidaceMain = isLastLesson ?
            <div>
                <p>{langs['tutorial-finish-last-lesson-row1']}</p>
                <p>{langs['tutorial-finish-last-lesson-row2']}</p>
            </div>
            :
            <div>
                <p>{langs['tutorial-finish-ond-lesson-row1']}</p>
                <p>{langs['tutorial-finish-ond-lesson-row2']}</p>
            </div>;
        const guidanceCon = <div className="guidace-wrapper">
            {guidaceMain}
        </div>;
        const conObj = {
            'media': mediaCon,
            'guidance': guidanceCon
        };
        return (
            <Modal
                {...actions.get(curModalType) }
                onCancel={this.hideModal}
                align={{}}
                visible={this.state.visible}
                maskClosable={false}
                centered
                zIndex={100000}
            >
                {conObj[curModalType]}
            </Modal>
        );
    }

    handleOk = () => {
        this.setState({
            visible: false,
        });
        const { lessonlist, id, onJumpTo, onSave } = this.props;
        const lessonIds = lessonlist.map(item => { return item.id; });
        const lessonIndex = lessonIds.indexOf(id);
        if (lessonIndex === (lessonlist.length - 1)) {
            onJumpTo('Sery');
        } else {
            // next lesson
            const nextLessoId = lessonIds[lessonIndex + 1];
            const nextLesson = lessonlist[lessonIndex + 1];
            this.setState({
                isLastLesson: false
            });
            onJumpTo('Content', nextLesson.coverName, nextLessoId);
            document.querySelector('.hasBackBtn .title').innerText = nextLesson.coverName;
            request.post('p/content/list', { coverId: nextLessoId }, (res) => {
                onSave('contentlist', res.contentList);
                this.setState({
                    contentlist: res.contentList
                });
            }, (error) => {
                console.log(error);
            });
        }
    }

    hideModal = () => {
        this.setState({
            visible: false,
        });
    }

    render() {
        const { langs } = this.props;
        const { contentlist, curindex } = this.state;
        const isStart = curindex === 0;
        const isFinished = curindex === (contentlist.length - 1);
        return (
            <div className="content">
                {
                    contentlist.length > 0 &&
                    <header>
                        <span className="process">{curindex + 1}/{contentlist.length}</span>
                        <span className="title">{contentlist[curindex]['contentTitle']}</span>
                    </header>
                }
                <main className="content-wrapper">
                    {
                        contentlist.length > 0 && contentlist[curindex]['contents'].map((item, index) => {
                            return (
                                <div key={index}>
                                    {
                                        item.type === 'video'
                                            ?
                                            <p>video</p>
                                            :
                                            item.type === 'image'
                                                ?
                                                <img onClick={() => this.showModal(item)} src={item.content} alt="" />
                                                :
                                                <p>{item.content}</p>
                                    }
                                </div>
                            )
                        })
                    }
                </main>
                <footer className={curindex === 0 ? 'start' : ''}>
                    {!isStart && <Button onClick={this.handlePrevBtn} className="prev" type="primary" htmlType="submit">{langs['tutorial-prev-step-btn']}</Button>}
                    <Button onClick={this.handleNextBtn} className="next" type="primary" htmlType="submit">{isFinished ? langs['tutorial-finish-btn'] : langs['tutorial-next-step-btn']}</Button>
                </footer >
                {this.renderModal()}
            </div>
        )
    }
}
