import React,{Component} from 'react';
import Notifications from './Notifications';
import PostList from '../posts/PostList';
import { connect } from 'react-redux'; 
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import ReactSearchBox from 'react-search-box';
import cities from './cities';
import firebase from 'firebase';

class Dashboard extends Component{

    constructor(props){
        super(props);
        this.state = {
            searchVal : null,
            selectedCity: null,
            isUserAdmin: false
        }
    }

    componentWillMount() {
        if(firebase.auth().currentUser){
            var docRef = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid);
        } else {
            docRef = null;
        }
        var that = this;
        if(docRef){
        docRef.get().then(function(doc) {
            if (doc.exists) {
                if(doc.data().userRole == 'Government'){
                that.setState({ isUserAdmin: true, selectedCity: doc.data().userLocation })
            } else {
                that.setState({ isUserAdmin: false, selectedCity: doc.data().userLocation})
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

    render(){

        const { posts, auth, notifications } = this.props;

        if(!auth.uid) return <Redirect to="/signin" />

        return(
            <div className="dashboard container fullWidth">
                <div className="row">

                <div style={{ width: '50%', margin: 'auto', padding: '4%'}}>
                    <ReactSearchBox
                        placeholder="Şehir adı yazınız"
                        data={cities}
                        onSelect={val => this.setState({ selectedCity: val.value })}
                    />
                </div>

             
                        
                     <div>
                        <PostList posts={posts} userRole={this.state.isUserAdmin} selectedCity={this.state.selectedCity}/>
                    </div>

                    {/* <div className="col s12 m5 offset-m1">
                        <Notifications notifications={ notifications }/>
                    </div>  */}



                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {   

    return{
        posts: state.firestore.ordered.posts,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications,
        firebase: state.firebase
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'posts', orderBy: ['createdAt', 'desc'] },
        { 
            collection: 'notifications',
            limit: 3,
            orderBy: ['time', 'desc']
        }
    ])
)(Dashboard);