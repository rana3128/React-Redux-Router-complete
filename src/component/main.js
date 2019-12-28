import React, {Component} from 'react';
import { withRouter, Route, Link, Switch } from "react-router-dom";
import { Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import Users from './users';
import Todo from './todo';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: this.props.location.pathname.toString()
        };
    }

    handleClick = (e)=>{
        this.setState({
            current: e.key,
        });
    }

    render() {
        return (
            <div>
                <div className="mainContainer">

                    <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                        <Menu.Item key="/">
                            <Link to="/">Users</Link>
                        </Menu.Item>
                        <Menu.Item key="/todos">
                            <Link to="/todos">Todos</Link>
                        </Menu.Item>
                    </Menu>

                    <Switch>
                        <Route path="/todos">
                            <Todo />
                        </Route>
                        <Route path="/">
                            <Users />
                        </Route>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(Main);
