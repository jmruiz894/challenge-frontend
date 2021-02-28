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

    
}