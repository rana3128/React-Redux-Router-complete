import React, {Component} from 'react';
import { Modal, Button, Input} from 'antd';

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            field1 : '',
            field1err : '',
            field2 : '',
            field2err : ''
        }
    }

    componentDidMount() {
        console.log(this.props.data);
        if(this.props.type === 'update'){
            this.setState({
                field1 : this.props.data.name,
                field2 : this.props.data.email,
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

        if(this.state.field2 !== ''){
            data.email = this.state.field2
        }else {
            ready = false;
            this.setState({field2err : 'Please input email of user'});
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
                    <Input placeholder="Name of user" value={this.state.field1} name="field1" onChange={this.handleInputChange}/>
                    <span style={{color:'red'}}> {this.state.field1err}</span>
                    <br/><br/>
                    <Input placeholder="Email" value={this.state.field2} name="field2" onChange={this.handleInputChange}/>
                    <span style={{color:'red'}}> {this.state.field2err}</span>
                </Modal>
            </div>
        );
    }
}

export default Popup;
