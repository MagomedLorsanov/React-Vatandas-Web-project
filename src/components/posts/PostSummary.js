import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';


const PostSummary = ({ post }) => {

    return(

        <div className="card z-depth-0 post-summary">
        <div className="card-content grey-text text-darken-3 rowSummary">
        <div>
            <img src={post.postImageURL} style={{ width: 100, height: 100}} alt=""/>
        </div>
        <div>
            <span className="card-title">{ post.title }</span>
            <p>Posted by {post.authorFirstName} {post.authorLastName}</p>
            <p className="grey-text">{ moment(post.createdAt.toDate()).calendar()}</p>
        </div>
        </div>
    </div>

    )
}

export default PostSummary;