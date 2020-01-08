import React from 'react'
import moment from 'moment'
import './App.css';

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

class UsersContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    componentDidMount() {
        fetch("http://yalantis-react-school.herokuapp.com/api/task0/users").then(res => res.json())
            .then(
                (result) => {
                    this.setState({users: result})
                })
    }

    monthStyle = (length) => {
        let color = '#a3a3a3'
        if (length >= 3 && length <= 6) color = '#00688b'
        if (length >= 7 && length <= 10) color = '#41894D'
        if (length >= 11) color = '#ed1c24'
        return ({backgroundColor: color})
    }
    renderMonths = () => {
        if(this.state.users.length) {
            return months.map((elem, index) => {
                let users = this.state.users.filter(user => moment(user.dob).get('month') === index)
                return (<div key={`${elem}-${index}`}>
                        <div className="month-block">
                            <div style={this.monthStyle(users.length)} className="month-title">{elem}</div>
                            <ul className="list">
                                {users.map((user, i) =>
                                    <li key={`user-${user.id}`}>{`${user.firstName} ${user.lastName}`}</li>
                                )}
                            </ul>
                        </div>
                    </div>
                )
            })
        }
    }

    render() {
        return (
            <div>
                {this.renderMonths()}
            </div>
        )
    }
}

export default UsersContainer