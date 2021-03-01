import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPost from "./components/add-post-component";
import Post from "./components/post-detail-component";
import PostsList from "./components/posts-list-component";

class App extends Component {
    render() {
        return (
          <div className="container container-fluid ">
              <div className="mt-3">
                  <Switch>
                      <Route exact path={["/", "/Posts"]} component={PostsList} />
                      <Route exact path="/add" component={AddPost} />
                      <Route path="/Posts/:id" component={Post} />
                  </Switch>
              </div>
          </div>
        );
    }
}

export default App;
