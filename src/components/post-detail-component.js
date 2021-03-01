import React, { Component } from "react";
import PostsService from "../services/PostsServices";

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.getPost = this.getPost.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.deletePost = this.deletePost.bind(this);

        this.state = {
        currentPost: {
            id: null,
            title: "",
            body: "",
            published: false
        },
        message: ""
        };
    }

    componentDidMount() {
        this.getPost(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;
    
        this.setState(function(prevState) {
            return {
                currentPost: {
                  ...prevState.currentPost,
                  title: title
                }
            };
        });
    }
  
    onChangeBody(e) {
        const body = e.target.value;
        
        this.setState(prevState => ({
            currentPost: {
                ...prevState.currentPost,
                body: body
            }
        }));
    }

    getPost(id) {
        PostsService.getOnePost(id)
            .then(response => {
                this.setState({
                    currentPost: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
  
    updatePublished(status) {
        let data = {
            id: this.state.currentPost.id,
            title: this.state.currentPost.title,
            body: this.state.currentPost.body,
            published: status
        };
    
        PostsService.modifyPost(this.state.currentPost.id, data)
        .then(response => {
            this.setState(prevState => ({
              currentPost: {
                  ...prevState.currentPost,
                  published: status
              }
            }));
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }
  
    updatePost() {
        PostsService.modifyPost(
            this.state.currentPost.id,
            this.state.currentPost
        )
        .then(response => {
            console.log(response.data);
            this.setState({
                message: "The post was updated successfully!"
            });
        })
        .catch(e => {
            console.log(e);
        });
    }
  
    deletePost() {    
        PostsService.deletePost(this.state.currentPost.id)
        .then(response => {
            console.log(response.data);
            this.props.history.push('/Posts')
        })
        .catch(e => {
            console.log(e);
        });
    }

    render() {
        const { currentPost } = this.state;

        return (
            <div>
                {currentPost ? (
                    <div className="edit-form">
                        <h4>Post</h4>
                        <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={currentPost.title}
                            onChange={this.onChangeTitle}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="body">Body</label>
                            <input
                            type="text"
                            className="form-control"
                            id="body"
                            value={currentPost.body}
                            onChange={this.onChangeBody}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                            <strong>Status:</strong>
                            </label>
                            {currentPost.published ? "Published" : "Pending"}
                        </div>
                        </form>

                        {currentPost.published ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => this.updatePublished(false)}
                        >
                            UnPublish
                        </button>
                        ) : (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => this.updatePublished(true)}
                        >
                            Publish
                        </button>
                        )}

                        <button
                        className="badge badge-danger mr-2"
                        onClick={this.deletePost}
                        >
                        Delete
                        </button>

                        <button
                        type="submit"
                        className="badge badge-success"
                        onClick={this.updatePost}
                        >
                        Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                <div>
                    <br />
                    <p>Please click on a Post...</p>
                </div>
                )}
            </div>
        );
    }
}