import { useEffect, useState } from "react";
import { Card, Space, Button } from "antd";
import axios from "../../services/axios";
import "./css/MyPosts.css"
import DeleteImage from './../../images/delete.png';
import Edit from './../../images/edit.png';
import moment from "moment";


const MyPosts = ({ posts, fetchMyPosts, changeSingleView }) => {

  useEffect(() => {
  }, []);

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
      {
        posts.map((post, postIndex) => {
          console.log(posts);
          return (

            <Card
              key={`card-${postIndex}`}
              id="myPostsCard"
            >
              <div className="cardBody" onClick={() => { changeSingleView(post) }}>

                <div className="eventDetails">
                  <h1>{post.serviceTitle}</h1>
                  <h2>{post.location.coordinates}</h2>

                  <div className="myPostDT">
                    <h2>
                      {moment(post.date).format("D MMMM")} {moment(post.time, "HH:mm").format("h:mm A")} - {moment(post.endTime, "HH:mm").format("h:mm A")}
                    </h2>
                  </div>
                </div>
                {
                  post.status == "PENDING" && <>
                    <div className="deleteEditSection">
                      <div className="myPostDelete">
                        <img src={DeleteImage} alt="DeleteImage" />
                      </div>

                      {/* ${isDeleteVisible ? 'Visually-hidden' : ''} */}{/* 
                      <div id= "myPostDelete" className={`myPostDelete`}>
                        <img src={DeleteImage} alt="DeleteImage" />
                        // <img src={DeleteImage} alt="DeleteImage" onClick={handleDeleteClick} />
                      </div> */}

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

