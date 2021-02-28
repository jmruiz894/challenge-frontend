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

    savePost() {
        let data = {
            title: this.state.title,
            body: this.state.body
        };

        PostsServices.newPost(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    body: response.data.body,
                    published: response.data.published,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newPost() {
        this.setState({
            id: null,
            title: "",
            body: "",
            published: false,

            submitted: false
        })
    }

    render() {
        //
    }
}