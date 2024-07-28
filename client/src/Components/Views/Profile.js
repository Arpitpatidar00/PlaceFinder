import React, { useEffect, useState } from 'react';
import {
    MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography,
    MDBModal, MDBModalBody, MDBModalDialog, MDBModalContent, MDBModalHeader
} from 'mdb-react-ui-kit';
import "../Views/Profile.css";
import { useSelector } from "react-redux";
import axios from 'axios';

export default function Profile() {
    const { userData } = useSelector((state) => state.auth);
    const [userImages, setUserImages] = useState([]);
    const [showAllImages, setShowAllImages] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [hoverEffect, setHoverEffect] = useState(true);
    const [userStatus, setUserStatus] = useState('Online');

    useEffect(() => {
        const fetchUserImages = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/upload/user/${userData._id}`);
                setUserImages(response.data);
            } catch (error) {
                console.error('Error fetching user images:', error);
            }
        };

        fetchUserImages();
    }, [userData._id]);

    const handleShowAllImages = () => {
        setShowAllImages(!showAllImages);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const toggleModal = () => {
        setSelectedImage(null);
    };

    const toggleUserStatus = async () => {
        try {
            const newStatus = userStatus === 'Online' ? 'Offline' : 'Online';
            setUserStatus(newStatus);

            // Make an API call to delete guides when going offline
            if (newStatus === 'Offline') {
                await axios.delete(`http://localhost:4000/guide/delete/${userData._id}`);
                await axios.delete(`http://localhost:4000/driver/delete/${userData._id}`);
            }
        } catch (error) {
            console.error('Error toggling user status:', error);
            setUserStatus(userStatus === 'Online' ? 'Online' : 'Offline');
        }
    };

    return (
        <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="9" xl="7">
                        <MDBCard>
                            <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                    <MDBCardImage src={`data:image/png;base64,${userData.image}`} alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                                    <MDBBtn outline color="dark" style={{ height: '36px', overflow: 'visible' }}>
                                        Edit profile
                                    </MDBBtn>
                                </div>
                                <div className="ms-3" style={{ marginTop: '130px' }}>
                                    <MDBTypography tag="h5">{userData.username}</MDBTypography>
                                </div>
                            </div>
                            <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                <div className="d-flex justify-content-end text-center py-1">
                                    <div>
                                        <MDBCardText className="mb-1 h5">{userImages.length}</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
                                    </div>
                                </div>
                            </div>
                            <MDBCardBody className="text-black p-4">
                                <div className="mb-5">
                                    <p className="lead fw-normal mb-1">About</p>
                                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                                        <MDBCardText className="font-italic mb-1">Web Developer</MDBCardText>
                                        <MDBCardText className="font-italic mb-1">Lives in New York</MDBCardText>
                                        <MDBCardText className="font-italic mb-0">Photographer</MDBCardText>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <MDBCardText className="lead fw-normal mb-0">Recent photos</MDBCardText>
                                    <MDBCardText className="mb-0">
                                        <a href="#!" className="text-muted" onClick={handleShowAllImages}>
                                            {showAllImages ? 'Show less' : 'Show all'}
                                        </a>
                                    </MDBCardText>
                                </div>
                                <MDBRow>
                                    {(showAllImages ? userImages : userImages.slice(0, 6)).map((image, index) => (
                                        <MDBCol key={index} className="mb-2" lg="4" md="6" sm="12">
                                            <MDBCardImage
                                                src={image.imageString}
                                                alt={`image ${index + 1}`}
                                                className={`w-100 rounded-3 ${hoverEffect ? 'hover-image' : ''}`}
                                                onClick={() => handleImageClick(image.imageString)}
                                            />
                                        </MDBCol>
                                    ))}
                                </MDBRow>
                                {(userData.role === 'guide' || userData.role === 'driver') && (
                                    <MDBBtn className="mt-3" onClick={toggleUserStatus}>
                                        {userStatus === 'Online' ? 'Go Offline' : 'Go Online'}
                                    </MDBBtn>
                                )}
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            {selectedImage && (
                <MDBModal show={true} tabIndex='-1' setShow={toggleModal}>
                    <MDBModalDialog centered>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBBtn className='btn-close' color='none' onClick={toggleModal}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                                <img src={selectedImage} alt="Selected" className="w-100" />
                            </MDBModalBody>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            )}
        </div>
    );
}
