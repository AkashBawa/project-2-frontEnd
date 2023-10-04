import { Card, Space, Button } from "antd";
import "./dashboard.css"
import { useState } from "react";

import axios from "../../services/axios";
import { useEffect } from "react";
import localStorage from "../../services/localStorage";

const Dashboard = () => {

  useEffect(() => {
    fetchPost();
    fetchId();
  },[]);


  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState();

  const fetchId = () => {
    const userId = localStorage.getItem('userId');
    setUserId(userId);
  }

  const fetchPost = async () => {
    try {
      const response = await axios.postRequest("fetchpost", {}, true);
      if(response.success) {
        console.log(response.posts);
        setPosts(response.posts);
      }

    } catch(err) {
      console.log(err)
    }
  };

  const sendRequest = async (postId, index) => {
    try {

      const response = await axios.putRequest("sendInvitation", {postId}, true);
      debugger;
      if(response.success == true) {

        let newPosts = [...posts];
        newPosts[index].invitations = response.updatePost.invitations;
        setPosts(newPosts);
        debugger;
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="list-posts">
      <Space direction="vertical">

       {
        posts.map((post, index) => {
          return (
            <Card
            key={`card-${index}`}
            title= {post.serviceTitle}
            extra={<Button type="default" onClick={() => {sendRequest(post._id)}}>Send Request</Button>}
            style={{
              width: "100%",
            }}
          >
            <p>Description</p>
            <p>By: {post?.userId.name}</p>
            <p>On: {new Date(post.date).getDate()}/{new Date(post.date).getMonth()}/{new Date(post.date).getFullYear()} at: {post.time}</p>
          </Card>
          )
        })
       }
      </Space>
    </div>
  )
}

export default Dashboard
