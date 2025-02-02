import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }


    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async () => {
        let response = await getAllUsers('All');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            },)
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })

    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleEditUserModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e)
        }

    }

    handleDeleteuser = async (user) => {
        console.log('Click delete', user)
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0) {
                await this.getAllUserFromReact();
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleEdituser = (user) => {
        // console.log('check edit user', user)
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })
                this.getAllUserFromReact()
            } else {
                alert(res.errCode)
            }

        } catch (e) {
            console.log(e)
        }

    }


    /** Life cycle
     * Run component
     * 1. Run construct ->  init state
     * 2. Did mount (set state) : born ; unmount
     * 3. Render (re-render)
    */





    render() {
        // console.log('check reder ', this.state)
        let arrUsers = this.state.arrUsers;
        //console.log(arrUsers)
        //properties ; nested
        return (
            <div className="user-container" >
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleEditUserModal}
                        currenUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className='title text-center'>Manage users with react</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}>

                        <i className='fas fa-plus'></i>Add new users</button>
                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Actions</th>

                            </tr>

                            {arrUsers && arrUsers.map((item, index) => {
                                // console.log('check map', item, index);
                                return (
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleEdituser(item)}><i className='fas fa-pencil-alt'></i> </button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteuser(item)}><i className='fas fa-trash'></i> </button>

                                        </td>
                                    </tr>


                                )
                            })
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }

}




const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
