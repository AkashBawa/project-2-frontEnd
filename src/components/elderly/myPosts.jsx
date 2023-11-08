import { useEffect, useState } from "react";
import { Card, Space, Button } from "antd";
import { CheckCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "../../services/axios";
import "./css/MyPosts.css"
import Profile from './../../images/profile.png';
import Accept from './../../images/accept.png';

const MyPosts = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchMyPosts();
  }, []);

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
    const index = post?.invitations.map((invite) => { return invite.status }).indexOf("ACCEPTED");
    return index;
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

  return (
    <div >
      <div id="postTableHeader">
        <h3>Name</h3>
        <h3>Task</h3>
        <h3>Date and Time</h3>
      </div>

      {
        posts.map((post, postIndex) => {

          return (

            <Card
              key={`card-${postIndex}`}
              id="myPostsCard"
              title={post.user ? `${post.user.name}` : `User Name Not Loaded`}
            // extra={post.status}
            >

              <div className="cardBody">
                {
                  post.status == "BOOKED" &&
                  <div>
                    <h2>Booked By:
                      {post?.invitations[findBookedIndex(post)].user.name}
                      <Link to={`/elder/reviewelder/${post._id}`}>
                        <button type="primary">Review</button>
                      </Link>
                    </h2>
                  </div>
                }
                {
                  post.status == "PENDING" &&
                  <div>
                    <h2>Pending</h2>
                    <ul>
                      {post?.invitations.map((invite, invitationIndex) => {
                        return (
                          <li className="requestList">
                            <p>Name: {invite.user.name} </p>
                            {
                              invite.status == "REJECTED" ? "Rejected" :
                                <>
                                  <p> <CheckCircleOutlined onClick={() => { responseInvitation(postIndex, invite.user._id, "ACCEPTED") }} /> </p>
                                  <p> <CloseOutlined onClick={() => { responseInvitation(postIndex, invite.user._id, "REJECTED") }} /> </p>
                                </>
                            }
                          </li>
                        )
                      })
                      }
                    </ul>
                  </div>

                }
                <div className="myPostDT">
                  {`${post.date} ${post.time}`}
                </div>
                <div className="myPostProfile">
                  <img src={Profile} alt="Profile Image" />
                </div>
                <div className="myPostAccept">
                  <img src={Accept} alt="Accept Image" />
                </div>
              </div>

            </Card>
          )
        })
      }
    </div>
  )
}

export default MyPosts;
