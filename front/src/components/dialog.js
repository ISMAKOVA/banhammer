import * as React from "react";
import {DialogActionsBar, Window} from "@progress/kendo-react-dialogs";
import '@progress/kendo-theme-default/dist/all.css';
import * as PropTypes from "prop-types";

class SaveCloseDialogComponent extends React.Component   {
    static propTypes = {
        /** Заголовок окна */
        title: PropTypes.string,
        /** Содерживое окна */
        content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        /** Действие на закрытие с сохранением */
        onSaveClose: PropTypes.func,
        /** Действие на закрытие без сохранения */
        onClose: PropTypes.func,
        /** Допустимо ли изменение размеров **/
        resizable: PropTypes.bool,
        /** Стартовые размеры **/
        initialSize: PropTypes.object,
    }

    static defaultProps = {
        resizable: false,
        onSaveClose: ()=>{},
        onClose: ()=>{},
    }

    constructor(props) {
        super(props);
    }
    state = {
        visible: true,
        left: 100,
        top: 100,
        width: this.props.initialSize.width,
        windowStage: "DEFAULT",
        height: this.props.initialSize.height,
    };

    handleMove = (event) => {
        this.setState({
            left: event.left,
            top: event.top,
        });
    };


    handleResize = (event) => {
        if(this.props.resizable)
            this.setState({
                left: event.left,
                top: event.top,
                width: event.width,
                height: event.height,
            });
    };

    handleStageChange = (e) => {
        this.setState({
            windowStage: e.state,
        });
        if(e.state === 'MINIMIZED'){
            this.setState({top: window.screen.height - 50})
        }
    };

    close = () => {
        if(this.props.onClose)
            this.props.onClose();
        this.toggleDialog();
    }

    toggleDialog = () => {
        this.setState({
            visible: !this.state.visible,
        });
    };

    saveClose = () => {
        if (this.props.onSaveClose)
            this.props.onSaveClose();
        this.toggleDialog();
    }

    render() {
        return (
            <div>
                {this.state.visible && (
                    <Window minWidth={400}
                            modal={!this.props.resizable}
                            left={this.state.left}
                            top={this.state.top}
                            height={this.state.height}
                            width={this.state.width}
                            onMove={this.handleMove}
                            onResize={this.handleResize}
                            title={this.props.title}
                            stage={this.props.resizable ? this.state.windowStage : "DEFAULT"}
                            onStageChange={this.handleStageChange}
                            onClose={this.close}>
                        <div
                            style={{
                                textAlign: "center",
                            }}
                        >
                            {this.props.content}
                        </div>
                        <DialogActionsBar>
                            <button
                                className="btn"
                                onClick={this.saveClose}
                            >
                                Save & Close
                            </button>
                            <button
                                className="btn close"
                                onClick={this.close}
                            >
                                Close
                            </button>
                        </DialogActionsBar>
                    </Window>
                )}
            </div>
        );
    }
}
export default SaveCloseDialogComponent;
