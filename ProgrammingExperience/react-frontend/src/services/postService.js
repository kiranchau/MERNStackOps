import axios from "axios";

class Post{
    create(formData){
        const url= "http://localhost:8000/api/create-post";
        const config = {
            headers:{
                "content-type":'multipart/form-data',
            }
        };
        return axios.post(url,formData,config);
    }

    getPost(){
        const url = "http://localhost:8000/api/get-posts";
        return axios.get(url);
    }

    deletePost(id){
        const url = `http://localhost:8000/api/delete-posts/${id}`;
        return axios.get(url);
    }

    updatePost(formData){
        const url= `http://localhost:8000/api/update-posts`;
        const config = {
            headers:{
                "content-type":'multipart/form-data',
            }
        };
        return axios.post(url,formData,config);
    }
}

export default new Post();