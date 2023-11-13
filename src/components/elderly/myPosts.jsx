import { useEffect, useState } from "react";
import { Card, Space, Button } from "antd";
import { CheckCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "../../services/axios";
import "./css/MyPosts.css"
import DeleteImage from './../../images/delete.png';
import Edit from './../../images/edit.png';
import postImage from './../../images/postImage.png';
import moment from "moment";


const MyPosts = ({ posts }) => {

  useEffect(() => {
  }, []);


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
              <div className="cardBody">

                <img className="eventImage" src={postImage} alt="Post Image" />

                <div className="eventDetails">
                  <h2>{post.serviceTitle}</h2>
                  <h3>location</h3>

                  <div className="myPostDT">
                    {moment(post.date).format("D MMMM")} {moment(post.startTime, "HH:mm").format("h:mm A")} - {moment(post.endTime, "HH:mm").format("h:mm A")}
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

