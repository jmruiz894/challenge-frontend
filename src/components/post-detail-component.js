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
    //
  }
}