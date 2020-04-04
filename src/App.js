import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: []
        }
        this.setUpdate = this.setUpdate.bind(this);
    }

    // load data from localStorage when reload page
    componentDidMount() {
        if (localStorage.getItem("todos") != null && localStorage.getItem("todos").length > 0) {
            var items = localStorage.getItem("todos").split(",");
            this.setState({ todoList: items });
        } else
            this.setState({ todoList: [] });
    }

    render() {
        return (
            <div>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">TODO LIST</h1>
                    </div>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group">
                        <input type="text" name="todoTask" className="form-control" placeholder="Điền vào công việc mới..." autoComplete="off" />
                        <div className="input-group-append">
                            <button className="btn btn-success" type="submit">Thêm</button>
                        </div>
                    </div>
                    <ul className="list-group mt-5">
                        {
                            this.state.todoList.map((item, index) => {
                                return (
                                    <li className="list-group-item" data={index}>
                                        <input type="text" value={item}
                                            onChange={e => { this.setUpdate(e.target.value, item) }}
                                        />
                                        <button className="btn btn-danger float-right"
                                            onClick={(e) => { this.deleteTodoTask(e, index) }}
                                        >
                                            Xóa
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </form>
            </div>
        );
    }
    handleSubmit = (e) => {
        var taskDesc = e.target.elements.todoTask.value;
        if (taskDesc.length > 0) {
            this.setState({
                todoList: [...this.state.todoList, taskDesc]
            }, () => {
                localStorage.setItem("todos", this.state.todoList)
            })
            e.target.reset();
        }
        e.preventDefault();
    }

    deleteTodoTask = (e, index) => {
        var taskArray = [...this.state.todoList];
        taskArray.splice(index, 1);
        this.setState({
            todoList: taskArray
        }, () => {
            localStorage.setItem("todos", this.state.todoList) // save data to localStorage
        });
    }

    setUpdate = (text, item) => {
        var taskArray = this.state.todoList;
        var index = taskArray.indexOf(item);
        taskArray[index] = text;
        this.setState({
            todoList: taskArray
        }, () => {
            localStorage.setItem("todos", this.state.todoList) // save data to localStorage
        })
    }
}

export default App;
