import React, { Component } from "react";
import PostsServices from "../services/PostsServices";

export default class AddPost extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.savePost = this.savePost.bind(this);
        this.newPost = this.newPost.bind(this);

        this.state = {
            id: null,
            title: "",
            body: "",
            publiched: false,
            submitted: false
        }
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeBody(e) {
        this.setState({
            body: e.target.value
        });
    }

    

    render() {
        //
    }
}