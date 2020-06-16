import React, { Component } from 'react';

class TaskForm extends Component {

    constructor(props){
        super(props);
        this.state={
            id : '',
            name:'',
            status:false
        }
    }
    onClose = () =>{
        this.props.onCloseForm();
    }

    onChange = (event) =>{
        var target= event.target;
        var name= target.name;
        var value= target.value;
        if(name === 'status'){
            value=target.value === 'true' ? true : false;
        }
        this.setState({
            [name] : value
        });
    }

    onSubmit = (event) => {
        this.props.onSubmit(this.state);
    }

    onCLear = (e) =>{
        // e.preventDefault();
        this.setState({
            name: '',
            status: false
        });
    }
    componentWillMount(){
        if(this.props.task){
            this.setState({
                id:this.props.task.id,
                name:this.props.task.name,
                status:this.props.task.status,
            });
        }
    }

    componentWillReceiveProps(nextprops){
        if(nextprops && nextprops.task){
            this.setState({
                id: nextprops.task.id,
                name: nextprops.task.name,
                status: nextprops.task.status,
            });
        }else if(nextprops && nextprops.task === null){
            this.setState({
                id : '',
                name:'',
                status:false
            });
        }
    }
    render() {
        var {id} = this.state;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        { id !== '' ? 'Cập nhật công việc ' : 'Thêm Công Việc'}
            <i className="far fa-times-circle text-right" onClick={this.onClose}></i>
                    </h3>
                </div>
                <div className="panel-body">

                    <form onSubmit={this.onSubmit}>
                        <legend>Form title</legend>

                        <div className="form-group">
                            <label>Tên :</label>
                            <input type="text" className="form-control" placeholder="Họ Tên" name="name" 
                             value={this.state.name} onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <label>Trạng Thái :</label>
                            <select className="form-control" name="status" value={this.state.status} onChange={this.onChange}>
                                <option value={true}>Kích Hoạt</option>
                                <option value={false}>Ẩn</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-warning"><i className="fas fa-plus" ></i>Lưu Lại</button>
                        <button type="button" className="btn btn-danger" onClick={this.onCLear}><i className="far fa-times-circle"></i>Hủy Bỏ</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskForm;

/**
 * render() => .jsx => thẻ html => value là những state khởi tạo
 */

/**
 * component
 * state = { a: 'tung', b: ''}
 * **********************mouting*************************
 * 1. componentWillMount => setState => a: 'huy' => mục đích là để set lại dữ liệu default khi mình muốn thay đổi (thường ko dùng, và bỏ qua)
 * 2. render () => .jsx => thẻ html => value = a: 'huy'
 * 3. componentDidMount() => call API => state a: 'huy' chuyển thành a: 'tuan', b: 'tung'
 * 
 * ***********************update*************************
 * 
 */