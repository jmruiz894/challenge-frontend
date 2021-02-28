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
      return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newPost}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                      type="text"
                      className="form-control"
                      id="title"
                      required="required"
                      value={this.state.title}
                      onChange={this.onChangeTitle}
                      name="title"
                  />
              </div>
    
              <div className="form-group">
                  <label htmlFor="body">Body</label>
                  <input
                      type="text"
                      className="form-control"
                      id="body"
                      required="required"
                      value={this.state.body}
                      onChange={this.onChangeBody}
                      name="body"
                  />
              </div>   
              <button onClick={this.savePost} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
    }
}