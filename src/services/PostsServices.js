import http from "./config";

class PostsService {
    getMultPosts() {
        return http.get("/posts");
    }

    getOnePost(id) {
        return http.get(`/posts/${id}`);
    }

    newPost(data) {
        return http.post("/posts", data)
    }

    modifyPost(id, data) {
        return http.put(`/posts/${id}`, data)
    }

    deletePost(id) {
        return http.delete(`/posts/${id}`);
    }
}

export default new PostsService();
