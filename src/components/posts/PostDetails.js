import React from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

const PostDetails = (props) => {

   const { post, auth } = props;

   if(!auth.uid) return <Redirect to="/signin" />

   if(post){
     return(
      <div className="container section post-details">
        <div className="card z-depth-0">
          <div className="card-content">
              <span className="card-title">{ post.title }</span>
              <p>{ post.content }</p>
              <span className={ post.postType == 'Emergency' ? "new badge red" : ( post.postType == 'Complaint' ? "new badge blue" : 'new badge green')} data-badge-caption="">{ post.postType }</span>
          </div>
          <img src={ post.postImageURL } alt="" style={{ width: 500, height: 500 }} />
          <div className="card-action grey lighten-4 grey-text">
              <div>Posted By { post.authorFirstName } { post.authorLastName }</div>
              <div>{moment(post.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
      </div>
     )
   } else {
     return(
       <div className="container center">
          <p>Loading post...</p>
       </div>
     )
   }
}


const mapStateToProps = (state, ownProps) => {

  const id = ownProps.match.params.id;
  const posts = state.firestore.data.posts;
  const post = posts ? posts[id] : null;

  return {
    post: post,
    auth: state.firebase.auth
  }
}


export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'posts' }
  ])
)(PostDetails)