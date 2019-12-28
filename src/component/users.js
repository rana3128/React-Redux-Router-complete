import React, {Component} from 'react';
import { connect } from 'react-redux';
import {addUser} from '../actions';
import { Table, Divider, Tag, Button } from 'antd';
import Popup from './popup';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actionType : '',
            showPopup : false,
            updatePopup : false,
            updateData : null,
            deleteId : null,
            columns : [
                    {
                        title: 'Name',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: 'Email',
                        dataIndex: 'email',
                        key: 'email',
                    },
                    {
                        title: 'Action',
                        dataIndex: 'action',
                        key: 'action',
                    }
                ]
        };
    }

    componentDidMount() {

        //console.log(typeof this.props.users.alluser);

    }

    handleUpdate= (row) => {
        this.setState({
            updateData : row,
            actionType : 'user',
            updatePopup : !this.state.updatePopup
        });
        //console.log(row);
    }

    updateData = (inputData) =>{
        const id = this.state.updateData.id;
        console.log(this.props.users.alluser);
        console.log(id);

        let data = this.props.users.alluser.map(row =>{
            if(row.id == id){
                let dataRow = {
                    id,
                    name : inputData.name,
                    email : inputData.email
                }
                return dataRow;
            }
            return row;
        });
        this.props.adduserR(data);
    }

    addData = (inputData) =>{
        let data = this.props.users.alluser;
        let id = new Date().getTime();
        data.push({
            id,
            name: inputData.name,
            email : inputData.email
        });
        this.props.adduserR(data);
    }

    handlePopup =() =>{
        this.setState(preState => ({
            actionType : 'user',
            showPopup : !preState.showPopup
        }));
    }

    handleDelete=(id)=>{
        let data = this.props.users.alluser.filter(row =>{
            if(row.id !== id){
                return row;
            }
        });

        //if(typeof data != "object") data = [];
        this.props.adduserR(data);
    }

    render() {
        let tableData = [];
        this.props.users.alluser.map((row, key)=>{
            if(row){
                let tmprow ={};
                tmprow.name= row.name;
                tmprow.email= row.email;
                tmprow.key = key;
                tmprow.action = (
                    <div>
                        <Button type="primary" onClick={()=>{this.handleUpdate(row)}}>Edit</Button> /
                        <Button type="danger" onClick={()=>{this.handleDelete(row.id)}}>Delete</Button>
                    </div>
                );
                tableData.push(tmprow);
            }
        })

        return (
            <div>
                {this.state.showPopup ? <Popup handlePopup={this.handlePopup} addData={this.addData}  type='user' /> : null}
                {this.state.updatePopup ? <Popup handlePopup={this.handleUpdate} addData={this.updateData} data={this.state.updateData} type='update' /> : null}
                <h1>this is user</h1>
                <Button type="primary" onClick={this.handlePopup} > Add a user</Button>
                <br />
                <br />
                <Table columns={this.state.columns} dataSource={tableData}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    users : state.user
})
const mapDispatchToProps = dispatch => ({
    adduserR : data => dispatch(addUser(data))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Users);
