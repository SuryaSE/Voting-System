// Home.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { users, voteUser } from '../actions/authentication';
import isEmpty from '../is-empty';

class Home extends Component {
  constructor() {
    super();
    this.state = {userList:[]};
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.users(this.props.auth.user.id);
  }

  handleClick(e,votedetail){
    this.props.voteUser({id:votedetail.id, vote:votedetail.vote+1});
    // this.props.auth;
    this.props.users(this.props.auth.user.id);
  }

  render() {
    let userlist = !isEmpty(this.props.auth.userList)?this.props.auth.userList:[];
    return (
      <div className="container" style={{ marginTop: '50px', width: '700px'}}>
        {(this.props.auth.isAuthenticated)&&
          <div>
            <h2 style={{marginBottom: '40px'}}>Users Vote</h2>
            <table className="table table-light">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Vote</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  (userlist.map((value,index) => {
                    return(
                      <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{value.name}</td>
                        <td>{!isEmpty(value.vote)?value.vote:0}</td>
                        <td>
                          <button type="button" className="btn btn-primary" onClick={(e)=>this.handleClick(e, {id:value._id,vote:value.vote})}>
                            Vote+
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )
              )
            }
          </tbody>
        </table>
      </div>
    }
  </div>
);
}
}

Home.propTypes = {
  users: PropTypes.func.isRequired,
  voteUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
  auth: state.auth,
  users: state.auth.userList,
  errors: state.errors
})

export default connect(mapStateToProps,{ users, voteUser })(withRouter(Home))
