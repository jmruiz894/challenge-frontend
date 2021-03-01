import React, { Component } from "react";
import PostsServices from "../services/PostsServices";
import { Link } from "react-router-dom";

export default class PostsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrievePosts = this.retrievePosts.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActivePost = this.setActivePost.bind(this);
        this.removeAllPosts = this.removeAllPosts.bind(this);

        this.state = {
            posts: [],
            currentPost: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrievePosts();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrievePosts() {
        PostsServices.getMultPosts()
        .then(response => {
            this.setState({
                posts: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    render() {
      const { posts, currentPost, currentIndex } = this.state;
        
        return (
            <div className="list row">
                <div className="post col-60 border-info border-right border-top">
                    {currentPost ? (
                        <div>
                            <h4>Post</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentPost.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Body:</strong>
                                </label>{" "}
                                {currentPost.body}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {currentPost.published ? "Published" : "Pending"}
                            </div>
              
                            <Link
                                to={"/posts/" + currentPost.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                  ) : (
                    <div>
                        <br />
                        <p>Please click on a Post...</p>
                    </div>
                  )}
                </div>
                
            </div>
        );
    }
}