import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import * as PropTypes from "prop-types";
import {Fragment} from "react";

export default class ComplainDialog extends React.Component {
    state = {
        visible: true,
        reasons:[
            {id: 0, label: "Токсично", enLabel: "toxic"},
            {id: 1, label: "Нетоксично", enLabel: "no_toxic"}
        ]
    };
    toggleDialog = () => {
        this.setState({
            visible: !this.state.visible,
        });
    };
    static propTypes = {
        /** Mem Id */
        id: PropTypes.number,
        visible: PropTypes.bool
    }
    static defaultProps = {
        visible: false
    }

    render() {
        return <Fragment>
            {this.state.visible && <Dialog title={"Жалоба"} onClose={this.toggleDialog}>
                <div className="p-10">
                    <div className="px-8 py-2">
                        <div className="text-sm mb-2 text-gray-400">Причина жалобы {this.props.id}</div>

                        {this.state.reasons.map(reason =>
                            <div className="form-check">
                                <input
                                    className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-700 checked:border-blue-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                    type="radio" name="radio" id={reason.id}/>
                                <label className="form-check-label inline-block text-gray-800"
                                       htmlFor={reason.id}>
                                    {reason.label}
                                </label>
                            </div>)}
                    </div>
                    <div className="px-8 py-2">
                        <div className="text-sm mb-2 text-gray-400">Текст мема</div>
                        <textarea
                            className="w-5/6 rounded-3xl bg-gray-200 text-sm px-6 py-4 resize-none hover:resize"
                            placeholder="Текст" readOnly="true">
                                </textarea>
                    </div>

                </div>
                <div className="flex flex-row-reverse items-center px-8 py-6">
                    <button
                        className="rounded-full bg-blue-700 hover:bg-blue-800 text-neutral-50 px-4 py-1.5 w-32 ml-2">Отправить
                    </button>
                </div>
            </Dialog>}
        </Fragment>
        ;
    }

}
