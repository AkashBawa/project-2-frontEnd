import { useEffect, useState } from "react";
import { Card } from "antd";
import { CheckCircleOutlined, CloseOutlined } from "@ant-design/icons";
import axios from "../../services/axios";
import "./css/MyPosts.css";
import profile from './../../images/profile.png';
import reject from './../../images/reject.png';
import accept from './../../images/accept.png';

const MyPosts = () => {
  
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState();

useEffect(() => {
  fetchMyPosts();
  fetchId();
}, []);


const fetchId = () => {
  const userId = localStorage.getItem('userId');
  setUserId(userId);
}


  const fetchMyPosts = async () => {
    try {
      const response = await axios.getRequest("getPostByUser", true);
      if (response.success === true) {
        setPosts(response.posts);
      }
    } catch (err) {
      console.log(err)
    }
  }

  const findBookedIndex = (post) => {
    const index = post?.invitations.findIndex((invite) => invite.status === "ACCEPTED");
    return index !== -1 ? index : 0;
  }
  const responseInvitation = async (postIndex, acceptedUserId, status) => {
    try {
      const postId = posts[postIndex]._id;
      const response = await axios.putRequest("responseInvitation", { postId, acceptedUserId, status }, true);
      console.log(response);
      fetchMyPosts();

    } catch (err) {
      console.log(err)
    }
  }
  const sendRequest = async (postId, index) => {
    try {

      const response = await axios.putRequest("sendInvitation", { postId }, true);

      if (response.success === true) {

        let newPosts = [...posts];
        newPosts[index].invitations = response.updatePost.invitations;
        setPosts(newPosts);
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      {
        posts.map((post, index) => {
          return (
            <Card
              key={`card-${index}`}
              title={post.serviceTitle}
              style={{ width: "100%", }}
            >
              <div className="cardStyle">
                <p>{post?.userId.name}</p>
                <p>{post?.serviceType}</p>
                <div className="dateTimeStyle" >
                  <p>{new Date(post.date).getDate()}/{new Date(post.date).getMonth()}/{new Date(post.date).getFullYear()}</p>
                  <p>
                    {post.time}</p>
                </div>
                <p>{post?.serviceStatus}</p>

                <button type="default" className="acceptbtn" onClick={() => { sendRequest(post._id, index) }} >
                  <img src={accept} alt="Accept" />
                </button>
                <button type="default" className="rejectbtn" onClick={() => { sendRequest(post._id, index) }}>
                  <img src={reject} alt="Reject" />
                </button>
                <button type="default" className="profilebtn" onClick={() => { sendRequest(post._id, index) }}>
                  <img src={profile} alt="profile" />
                </button>
              </div>
            </Card>
          )
        })
      }
    </div>
  )
}

export default MyPosts;
