
import Sidebar from "./Sidebar";
import { useAdmin } from "../../Context/AdminContext";
import Placedata from "./Placedata";
import Userdata from "./Userdata";
import VideoUpload from "./Videospage.js";
import CardData from "./PlaceControll.js";
import CommentControl from "./Commentcontroler.js";
import Feedbackcontroller from "./Feedbackcontroller.js";

function Adminpanel() {
  const { placedata, userdata, videos, items, comments,feedback } = useAdmin();

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        {placedata && <Placedata />}
        {userdata && <Userdata />}
        {videos && <VideoUpload />}
        {items && <CardData />}
        {comments &&  <CommentControl />}
        {feedback &&  <Feedbackcontroller />}

      </div>
    </div>
  );
}

export default Adminpanel;
