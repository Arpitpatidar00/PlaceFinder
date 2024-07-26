// import React from "react";
// // import './Adminpanel.css'
// import Sidebar from "./Sidebar";
// import { useAdmin } from "../../Context/AdminContext";
// import Placedata from "./Placedata";
// import Userdata from "./Userdata";
// import VideoUpload from "./Videospage.js";
// import CardData from "./PlaceControll.js";
// import CommentControl from "./Commentcontroler.js";
// import { useAuth } from "../../Context/AuthContext.js";

// function Adminpanel() {
//   const { placedata, userdata, videos, items } = useAdmin();
//   const { commentData }=useAuth();


//   return (
//     <>
//       <div className="app">
//         <Sidebar />

//         <div className="main-content">
//           {placedata ? (
//             <>
//               <Placedata />
//             </>
//           ) : (
//             <></>
//           )}
//           {userdata ? (
//             <>
//               <Userdata />
//             </>
//           ) : (
//             <></>
//           )}
//           {videos ? (
//             <>
//               <VideoUpload />
//             </>
//           ) : (
//             <></>
//           )}
//           {items ? (
//             <>
//               <CardData />
//             </>
//           ) : (
//             <></>
//           )}
//           {commentData ? (
//             <>
//               <CommentControl />
//             </>
//           ) : (
//             <></>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Adminpanel;
import React from "react";
import Sidebar from "./Sidebar";
import { useAdmin } from "../../Context/AdminContext";
import Placedata from "./Placedata";
import Userdata from "./Userdata";
import VideoUpload from "./Videospage.js";
import CardData from "./PlaceControll.js";
import CommentControl from "./Commentcontroler.js";
import { useAuth } from "../../Context/AuthContext.js";

function Adminpanel() {
  const { placedata, userdata, videos, items } = useAdmin();
  const { commentData } = useAuth();

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        {placedata && <Placedata />}
        {userdata && <Userdata />}
        {videos && <VideoUpload />}
        {items && <CardData />}
        {commentData && <CommentControl />}
      </div>
    </div>
  );
}

export default Adminpanel;
