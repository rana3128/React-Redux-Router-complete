import React, {Component} from 'react';
import { Modal, Button, Input} from 'antd';

class TodoPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            field1 : '',
            field1err : '',
        }
    }

    componentDidMount() {
        console.log(this.props.data);
        if(this.props.type === 'update'){
            this.setState({
                field1 : this.props.data.action,
            })
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {

            this.setState({ loading: false, visible: false });
            this.props.handlePopup();
        }, 3000);

    };

    handleCancel = () => {
        this.setState({ visible: false });
        this.props.handlePopup();
    };

    handleInputChange = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        let nameerr = name +'err';
        if(value !==''){
            this.setState({
                [name] : value,
                [nameerr] : ''
            })
        }
    }

    handleSubmit =()=>{
        let ready = true;
        let data = {};
        console.log(this.state);
        if(this.state.field1 !== ''){
            data.name = this.state.field1
        }else {
            ready = false;
            this.setState({field1err : 'Please input Name of user'});
        }

        if(ready){
            this.props.addData(data);
            this.handleOk();
        }
    }

    render() {

        return (
            <div>
                <Modal
                    visible={this.state.visible}
                    title="Title"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleSubmit}>
                            Submit
                        </Button>,
                    ]}
                >
                    <Input placeholder="Todo Message" value={this.state.field1} name="field1" onChange={this.handleInputChange}/>
                    <span style={{color:'red'}}> {this.state.field1err}</span>
                    <br/><br/>
                </Modal>
            </div>
        );
    }
}

export default TodoPopup;
