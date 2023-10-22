import { Card, Space } from "antd";
import "./dashboard.css"
import { useState, useEffect } from "react";
import axios from "../../services/axios";
import localStorage from "../../services/localStorage";
import profile from './../../images/profile.png';
import reject from './../../images/reject.png';
import accept from './../../images/accept.png';

const Dashboard = () => {
  
    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState();

  useEffect(() => {
    fetchPost();
    fetchId();
  }, []);


  const fetchId = () => {
    const userId = localStorage.getItem('userId');
    setUserId(userId);
  }

  const fetchPost = async () => {
    try {
      const response = await axios.postRequest("fetchpost", {}, true);
      if (response.success) {
        console.log(response.posts);
        setPosts(response.posts);
      }

    } catch (err) {
      console.log(err)
    }
  };

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
    <div className="list-posts">
      <Space direction="vertical">

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
                  <p>{new Date(post.date).getDate()}/{new Date(post.date).getMonth()}/{new Date(post.date).getFullYear()}
                    {post.time}</p>
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
      </Space>
    </div>
  )
}

export default Dashboard
