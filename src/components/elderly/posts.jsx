import { Radio, Tabs } from 'antd';
import MyPosts from './myPosts';
import AppPost from "./addPost";

const Posts = () => {
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        type="card"
        size={"middle"}
        items={
          [
            {
              label: `My Posts`,
              key: "1",
              children: <MyPosts/>,
            },
            {
              label: `Add post`,
              key: "2",
              children: <AppPost/>,
            },
        ]
        }
      />
    </div>
  )
}

export default Posts;
