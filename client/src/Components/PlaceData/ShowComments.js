import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useAuth } from "../../Context/AuthContext";
import { useSelector } from "react-redux";
import { formatDistanceToNow, parseISO } from "date-fns";

import "./Placedata.css"; // Import CSS file for custom styles

export default function ShowComments() {
  const placeId = useSelector((state) => state.place.placeId);
  const { commentData } = useAuth();

  return (
    <section >
      <MDBContainer className="py-5" style={{ maxWidth: "auto" }}>
        <MDBRow className="justify-content-center">
          <MDBCol md="12" lg="10">
            <div id="comments" className="comment-container">
              {commentData
                .filter((comment) => comment.placeId === placeId) // Filter comments by placeId
                .map((comment) => (
                  <React.Fragment key={comment._id}>
                    <MDBCard className="text-dark comment-card">
                      <MDBCardBody className="p-4">
                        <div className="d-flex align-items-center mb-3">
                          <MDBCardImage
                            className="rounded-circle shadow-1-strong me-3"
                            src={`${comment.avatarUrl}`} // Replace with actual avatar URL logic
                            alt="avatar"
                            width="65"
                            height="65"                          />
                          <MDBTypography tag="h5">{comment.fullName}</MDBTypography>
                          <p className="small ms-auto">
                            {formatDistanceToNow(parseISO(comment.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                        <p>{comment.text}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <a href="#!" className="link-muted me-2">
                              <MDBIcon fas icon="thumbs-up me-1" />
                              132
                            </a>
                            <a href="#!" className="link-muted">
                              <MDBIcon fas icon="thumbs-down me-1" />
                              15
                            </a>
                          </div>
                          <a href="#!" className="link-muted">
                            <MDBIcon fas icon="reply me-1" /> Reply
                          </a>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </React.Fragment>
                ))}
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
