import { Card } from "antd";
import { CheckCircleOutlined, CloseOutlined } from "@ant-design/icons";

const { Meta } = Card;

const HistoryListPost = ({ posts }) => {
    return (
        <div id="historyListPost">
            {
                posts && posts.map((post, index) => {
                    return (
                        <Card
                            hoverable
                            style={{ width: 240 }}
                        >
                            <Meta title={post.serviceTitle} description={post.serviceType} />
                        
                        <div className="button">
                            <button>My button</button>
                        </div>
                        </Card>
                    )
                })
            }

        </div>
    )
}

export default HistoryListPost
