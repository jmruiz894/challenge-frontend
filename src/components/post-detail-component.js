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

  render() {
    //
  }
}