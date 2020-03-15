import React from 'react';
import PostSummary from './PostSummary';
import { Link } from 'react-router-dom';
import firebase from 'firebase'

//class PostList = ({ posts, userRole, selectedCity }) => {
  
class PostList extends React.Component {
    
    _handleOngoing = post => {
        firebase.firestore()
        .collection("posts")
        .doc(post.id)
        .update({
           postStatus: 'Ongoing' 
        });
     }

     _handleEmergency = post => {
        firebase.firestore()
        .collection("posts")
        .doc(post.id)
        .update({
           postStatus: 'Emergency' 
        });
     }
 
     _handleSolved = post => {
        firebase.firestore()
        .collection("posts")
        .doc(post.id)
        .update({
           postStatus: 'Solved' 
        });
     }
 
     _handleRemove = post => {
        
        firebase.firestore()
        .collection("posts")
        .doc(post.id).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
     }
     render(){

        let { posts, selectedCity, userRole} = this.props;

   
            return(

                    <div className="dashboardBox">

                        <div className="dashboardSingleBox">
                        <h4>Issues</h4>
                        
                        <div className="post-list section">
                        { posts && posts.map(post => {
                            if(post.postStatus == 'Issues' && post.postLocation == selectedCity){
                            return(
                                <div key={post.id}>
                                <Link to={'/post/' + post.id} key={post.id}>
                                    <PostSummary post={post}  />
                                </Link>
                                
                                {
                                    userRole
                                    ?
                                    <div className="postButtons"> 
                                        <a className="waves-effect waves-light btn-small" onClick={() => this._handleEmergency(post)}>Emergency </a>
                                        <a className="waves-effect waves-light btn-small" onClick={() => this._handleOngoing(post)}>Ongoing </a>
                                        <a className="waves-effect waves-light btn-small" onClick={() => this._handleSolved(post)}>Solved </a>
                                        <a className="waves-effect waves-light btn-small" onClick={() => this._handleRemove(post)}>Remove</a>
                                    </div>
                                     :
                                    <div></div>
                                } 
                                </div>
                            )
                        }
                            })}
                        </div>

                    </div>

                    <div className="dashboardSingleBox">
                        <h4>Emergency</h4>
                        
                        <div className="post-list section">
                        { posts && posts.map(post => {
                            if(post.postStatus == 'Emergency' && post.postLocation == selectedCity){
                            return(
                                <div key={post.id}>
                                <Link to={'/post/' + post.id} key={post.id}>
                                    <PostSummary post={post}  />
                                </Link>
                                
                                {
                                    userRole
                                    ?
                                    <div className="postButtons"> 
                                        <a className="waves-effect waves-light btn-small" onClick={() => this._handleOngoing(post)}>Ongoing </a>
                                        <a className="waves-effect waves-light btn-small" onClick={() => this._handleSolved(post)}>Solved </a>
                                        <a className="waves-effect waves-light btn-small" onClick={() => this._handleRemove(post)}>Remove</a>
                                    </div>
                                     :
                                    <div></div>
                                } 
                                </div>
                            )
                        }
                            })}
                        </div>

                    </div>
                    <div className="dashboardSingleBox">
                        <h4>Ongoing</h4>
                        
                        <div className="post-list section">
                        { posts && posts.map(post => {
                            if(post.postStatus == 'Ongoing' && post.postLocation == selectedCity){
                            return(
                                <div key={post.id}>
                                <Link to={'/post/' + post.id} key={post.id}>
                                    <PostSummary post={post} userRole={userRole} />
                                </Link>

                                {
                                    userRole
                                    ?
                                    <div className="postButtons"> 
                                        <a className="waves-effect waves-light btn-small" onClick={() => this._handleEmergency(post)}>Emergency </a>
                                        <a className="waves-effect waves-light btn-small" onClick={() => this._handleSolved(post)}>Solved </a>
                                        <a className="waves-effect waves-light btn-small" onClick={() => this._handleRemove(post)}>Remove</a>
                                    </div>
                                     :
                                    <div></div>
                                } 

                                </div>
                            )
                        }
                            })}
                        </div>
                    </div>
                    <div className="dashboardSingleBox">
                        <h4>Solved</h4>
                        <div className="post-list section">
                        { posts && posts.map(post => {
                            if(post.postStatus == 'Solved' && post.postLocation == selectedCity){
                            return(
                                <div key={post.id}>
                                <Link to={'/post/' + post.id} key={post.id}>
                                    <PostSummary post={post} userRole={userRole} />
                                </Link>

                                {
                                    userRole
                                    ?
                                    <div className="postButtons"> 
                                        <a className="waves-effect waves-light btn-small" onClick={() => this._handleEmergency(post)}>Emergency </a>
                                        <a className="waves-effect waves-light btn-small" onClick={() => this._handleOngoing(post)}>Ongoing </a>
                                        <a className="waves-effect waves-light btn-small" onClick={() => this._handleRemove(post)}>Remove</a>
                                    </div>
                                     :
                                    <div></div>
                                } 

                                </div>
                            )
                        }
                            })}
                        </div>
                    </div>
                </div>

       
    )
}
}


export default PostList;