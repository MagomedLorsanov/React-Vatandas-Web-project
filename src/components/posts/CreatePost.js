import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../store/actions/postActions';
import { Redirect } from 'react-router-dom';
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import ReactSearchBox from 'react-search-box';
import cities from '../dashboard/cities';

class CreatePost extends Component {

    state ={
        title: '',
        content: '',
        postImage: "",
        isUploading: false,
        progress: 0,
        postImageURL: "",
        postType: 'Emergency',
        postStatus: 'Issues',
        postLocation: null
    }

    componentWillMount(){
        if(firebase.auth().currentUser){
            var docRef = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid);
        } else {
            docRef = null;
        }
        var that = this;
        if(docRef){
        docRef.get().then(function(doc) {
            if (doc.exists) {
                if(doc.data().userLocation){
                    that.setState({ postLocation: doc.data().userLocation })
            } 
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    } else {
        console.log('No users found')
    }
    }

    _handleChange = e => {
        this.setState({ 
            [e.target.id]: e.target.value
        })
    }

    _handleSubmit = e => {
        e.preventDefault();
        this.props.createPost(this.state);
        this.props.history.push('/');
    }

    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };
    handleUploadSuccess = filename => {
        this.setState({ postImage: filename, progress: 100, isUploading: false });
        firebase
        .storage()
        .ref("images")
        .child(filename)
        .getDownloadURL()
        .then(url => this.setState({ postImageURL: url }));
    };

    render() {
        const { auth } = this.props;

        if(!auth.uid) return <Redirect to="/signin" />

        return (
        <div className="container">
            <form onSubmit={this._handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Create New Post</h5>
                <div className="input-field">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" onChange={this._handleChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="content">Post Content</label>
                    <textarea name="content" className="materialize-textarea" id="content" onChange={this._handleChange}></textarea>
                </div>
                
               <div className="input-field">
                    <ReactSearchBox
                        placeholder="Type City Name"
                        data={cities}
                        onSelect={val => this.setState({ postLocation: val.value })}
                    />
               </div>

                <div className="input-field">
               
                <p>
                    <label>
                        <input className="with-gap" name="group1" type="radio"  onClick={() => this.setState({ postType: 'Emergency'})}/>
                        <span>Emergency</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input className="with-gap" name="group1" type="radio"  onClick={() => this.setState({ postType: 'Complaint'})}/>
                        <span>Complaint</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input className="with-gap" name="group1" type="radio"  onClick={() => this.setState({ postType: 'Advice'})}/>
                        <span>Advice</span>
                    </label>
                </p>
                </div>
                <label>Post Image:</label>
                {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                {this.state.postImageURL && <img src={this.state.postImageURL} style={{ width: 400, height:300}}/>}
                <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, pointer: 'cursor'}}>
                    Select your post Image
                    <FileUploader
                        hidden
                        accept="image/*"
                        storageRef={firebase.storage().ref('images/')}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                    />
                    </label>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">Create</button>
                </div>
            </form>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch => {
    return{
        createPost: post => dispatch(createPost(post))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreatePost);