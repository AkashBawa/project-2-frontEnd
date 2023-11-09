import { useEffect, useState } from "react";
import { Card, Space, Button } from "antd";
import { CheckCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "../../services/axios";
import "./css/MyPosts.css"
import Profile from './../../images/profile.png';
import Accept from './../../images/accept.png';
import moment from "moment";


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
      console.log("This is the post content From MyPost" + response);
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
          // console.log(post.invitations[0].user.userName);
          console.log(post);

          return (

            <Card
              key={`card-${postIndex}`}
              id="myPostsCard"
              title={post.invitations[0].user.userName ? `${post.invitations[0].user.userName}` : `User Name Not Found`}
            // extra={post.status}
            >

              <div className="cardBody">
                {
                  <p>{post.serviceTitle}</p>
                }
                {/* {
                  post.status == "BOOKED" &&
                  <div>
                    <h2>Booked By:
                      {post?.invitations[findBookedIndex(post)].user.user}
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

                } */}
                <div className="myPostDT">
                  {moment(post.date).format("MMM DD, YYYY")} {moment(post.time, "HH:mm").format("hh A")}

                </div>
                <div className="myPostProfile">
                <Link to='/elder/profile'><img src={Profile} alt="Profile" /></Link>


                  {/* <img src={Profile} alt="Profile Image" onClick={() => { responseInvitation(postIndex, invite.user._id, "ACCEPTED") }} /> */}
                </div>

                <div className="myPostAccept">
                  <img src={Accept} alt="Accept Image" onClick={() => { responseInvitation(postIndex, invite.user._id, "ACCEPTED") }} />
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
