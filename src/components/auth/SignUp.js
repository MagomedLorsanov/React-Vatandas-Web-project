import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions';
import ReactSearchBox from 'react-search-box';
import cities from '../dashboard/cities';

class SignUp extends Component {

    state ={
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        biography: '',
        userRole: '',
        userOrganization: '',
        phoneNumber: '',
        selectedCity: null,
    }

    _handleChange = e => {
        this.setState({ 
            [e.target.id]: e.target.value
        })
    }

    _handleSubmit = e => {
        e.preventDefault();
        this.props.signUp(this.state);
    }

    render() {

         const { auth, authError } = this.props;

         if(auth.uid) return <Redirect to="/" />

        return (
        <div className="container">
            <form onSubmit={this._handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Sign Up</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" onChange={this._handleChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" id="firstName" onChange={this._handleChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" id="lastName" onChange={this._handleChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="biography">Biography</label>
                    <input type="text" name="biography" id="biography" onChange={this._handleChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="number" name="phoneNumber" id="phoneNumber" onChange={this._handleChange}/>
                </div>
                <div className="input-field">

                <div className="input-field">
                <ReactSearchBox
                    placeholder="Şehir adı yazınız"
                    value={this.state.selectedCity}
                    data={cities}
                    onSelect={val => this.setState({ selectedCity: val.value })}
                />
                </div>
               
               <p>
                   <label>
                       <input className="with-gap" name="group1" type="radio"  onClick={() => this.setState({ userRole: 'Government'})}/>
                       <span>Governmental Organization</span>
                   </label>
               </p>
               <p>
                   <label>
                       <input className="with-gap" name="group1" type="radio"  onClick={() => this.setState({ userRole: 'Individual'})}/>
                       <span>Individual</span>
                   </label>
               </p>
               </div>

               {
                   this.state.userRole == 'Government'
                   ?
                    <div className="input-field">
                        <label htmlFor="userOrganization">Organization</label>
                        <input type="text" name="userOrganization" id="userOrganization" onChange={this._handleChange}/>
                    </div>
                    :
                    <div></div>
               }
               
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={this._handleChange}/>
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
                    <div className="red-text center">
                        { authError ? <p>{ authError }</p> : null}
                    </div>
                </div>
            </form>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: creds => dispatch(signUp(creds))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);