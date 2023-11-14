import { Card, Space, Button } from "antd";
import "./dashboard.css"
import { useState } from "react";

import axios from "../../services/axios";
import { useEffect } from "react";
import localStorage from "../../services/localStorage";

import { useDispatch } from "react-redux";
import { setLoader } from '../../redux/user';

const Dashboard = () => {

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(setLoader({loader: true}));
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
      dispatch(setLoader({loader: false}));
      if(response.success) {
        console.log(response.posts);
        setPosts(response.posts);
      }

    } catch(err) {
      dispatch(setLoader({loader: false}));
      console.log(err)
    }
  };

  const sendRequest = async (postId, index) => {
    try {

      const response = await axios.putRequest("sendInvitation", {postId}, true);

      if(response.success == true) {

        let newPosts = [...posts];
        newPosts[index].invitations = response.updatePost.invitations;
        setPosts(newPosts);
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
            extra={
              post.invitations.map((invite) => invite.user).indexOf(userId) > -1 ? 
              <Button type="default" disabled>Already send</Button> : 
              <Button type="default" onClick={() => {sendRequest(post._id, index)}}>Send Request</Button>
            }
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
