import { useEffect, useState } from "react";
import { Card, Space, Button } from "antd";
import { CheckCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "../../services/axios";
import "./css/MyPosts.css"
import DeleteImage from './../../images/delete.png';
import Edit from './../../images/edit.png';
import moment from "moment";


const MyPosts = ({ posts }) => {


  useEffect(() => {
    // fetchMyPosts();
  }, []);

  // const fetchMyPosts = async () => {
  //   try {
  //     const response = await axios.getRequest("getPostByUser", true);
  //     if (response.success === true) {
  //       setPosts(response.posts);
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  return (
    <div >
      {/* <div id="postTableHeader">
        <h3>All Posts()</h3>
        <h3>Active Posts()</h3>
        <h3>History()</h3>
      </div> */}

      {
        posts.map((post, postIndex) => {
          // console.log(post.invitations[0].user.userName);
          // console.log(post);

          return (

            <Card
              key={`card-${postIndex}`}
              id="myPostsCard"
            >
              <div className="cardBody">

                <img className="eventImage" src={DeleteImage} alt="Event Image" />

                <div className="eventDetails">
                  <h3>{post.serviceTitle}</h3>
                  <p>location</p>
                  <div className="myPostDT">
                    {moment(post.date).format("MMM DD, YYYY")} {moment(post.time, "HH:mm").format("hh A")}

                  </div>
                </div>

                {
                  post.status == "PENDING" && <>
                    <div className="deleteEditSection">
                      <div className="myPostDelete">
                        <Link to='/elder/profile'><img src={DeleteImage} alt="DeleteImage" /></Link>
                      </div>

                      <div className="myPostEdit">
                        <img src={Edit} alt="Edit" />
                      </div>
                    </div>
                  </>

                }



              </div>

            </Card>
          )
        })
      }
    </div>
  )
}

export default MyPosts;


{/* <img src={Profile} alt="Profile Image" onClick={() => { responseInvitation(postIndex, invite.user._id, "ACCEPTED") }} /> */ }
{/* Accepting Invitaion Code  */ }
{/* onClick={() => { responseInvitation(postIndex, invite.user._id, "ACCEPTED") }} */ }

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