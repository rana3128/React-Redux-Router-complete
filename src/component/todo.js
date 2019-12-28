import React, {Component} from 'react';
import { connect } from 'react-redux';
import {addTodo} from '../actions';
import { Table, Divider, Tag, Button } from 'antd';
import TodoPopup from "./todoPopup";

class Todo extends Component {
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
                    title: 'Action',
                    dataIndex: 'actionMsg',
                    key: 'action',
                },
                {
                    title: 'Added Date',
                    dataIndex: 'dateAdded',
                    key: 'dateAdded',
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
        console.log(this.props.todos);
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
        console.log(this.props.todos);
        console.log(id);

        let data = this.props.todos.map(row =>{
            if(row.id == id){
                let dataRow = {
                    id,
                    action : inputData.name,
                    dateAdded : this.state.updateData.dateAdded
                }
                return dataRow;
            }
            return row;
        });
        this.props.addTodoR(data);
    }

    addData = (inputData) =>{
        let data = this.props.todos;
        let id = new Date().getTime();
        data.push({
            id,
            action: inputData.name,
            dateAdded : new Date()
        });
        this.props.addTodoR(data);
    }

    handlePopup =() =>{
        this.setState(preState => ({
            actionType : 'user',
            showPopup : !preState.showPopup
        }));
    }

    handleDelete=(id)=>{
        let data = this.props.todos.filter(row =>{
            if(row.id !== id){
                return row;
            }
        });

        //if(typeof data != "object") data = [];
        this.props.addTodoR(data);
    }

    render() {
        let tableData = [];
        this.props.todos.map((row, key)=>{
            if(row){
                let tmprow ={};
                tmprow.actionMsg= row.action;
                tmprow.dateAdded= row.dateAdded.toLocaleString();
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
                {this.state.showPopup ? <TodoPopup handlePopup={this.handlePopup} addData={this.addData}  type='user' /> : null}
                {this.state.updatePopup ? <TodoPopup handlePopup={this.handleUpdate} addData={this.updateData} data={this.state.updateData} type='update' /> : null}
                <h1>this is user</h1>
                <Button type="primary" onClick={this.handlePopup} > Add Todo</Button>
                <br />
                <br />
                <Table columns={this.state.columns} dataSource={tableData}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    todos : state.todo.todos
})
const mapDispatchToProps = dispatch => ({
    addTodoR : data => dispatch(addTodo(data))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Todo);
