import { useEffect, useState } from "react";

import { Card, Space, Button } from "antd";
import { CheckCircleOutlined, CloseOutlined } from "@ant-design/icons";

import axios from "../../services/axios";

import "./css/MyPosts.css"

const MyPosts = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      const response = await axios.getRequest("getPostByUser", true);
      if(response.success == true) {
        setPosts(response.posts);
      }
    } catch (err) {
      console.log(err)
    }
  }

  const findBookedIndex = (post) => {
    const index = post?.invitations.map((invite) => { return invite.status}).indexOf("ACCEPTED");
    return index;
  }

  const responseInvitation = async (postIndex, acceptedUserId, status) => {
    try {
        const postId = posts[postIndex]._id;
        const response = await axios.putRequest("responseInvitation", { postId , acceptedUserId, status }, true);
        console.log(response);
        fetchMyPosts();

    } catch (err) {
        console.log(err)
    }
  }

  return (
    <div>
      {
        posts.map((post, postIndex) => {
          return (
            <Card
            key={`card-${postIndex}`}
            title= {post.serviceTitle}
            extra={ post.status}
            className="myPostElderly"
            style={{
              width: "100%",
            }}
          >
            {
               post.status == "BOOKED" ? <p>Booked By: { post?.invitations[findBookedIndex(post)].user.name } </p> :  <div>

                <h2>Invitations</h2>

                        <ul>

                            {
                                post?.invitations.map((invite, invitationIndex) => {
                                    return  (
                                        <li className="requestList">
                                            <p>Name: {invite.user.name} </p>
                                            {
                                                invite.status == "REJECTED" ? "Rejected" : 
                                                <>
                                                    <p> <CheckCircleOutlined onClick={() => { responseInvitation(postIndex, invite.user._id, "ACCEPTED")}} /> </p>
                                                    <p> <CloseOutlined onClick={() => { responseInvitation(postIndex,  invite.user._id, "REJECTED")}}/> </p>
                                                </>
                                            }
                                            
                                        </li>
                                    )
                                })
                            }
                            
                        </ul>
                        
               </div>
            }
             </Card>
          )
        })
       }
    </div>
  )
}

export default MyPosts;
