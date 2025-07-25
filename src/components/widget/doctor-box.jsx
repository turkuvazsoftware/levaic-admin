import { Fragment, memo } from "react";
import { Link } from "react-router-dom";
// react-botstrap
import { CardBody, Card } from 'react-bootstrap'

const DoctorBox = memo ((props) => {
    return (
        <Fragment>
            <Card className="p-5 text-center">
                <div  className="mt-5">
                    <img src={props.DoctorImage} alt="blog-image"
                        className="img-fluid rounded-circle p-1 border border-danger avatar" height="100" width="100" loading="lazy" />
                </div>
                <div>
                    <div className="mt-5 d-inline-block bg-primary-subtle px-3 py-2 rounded-pill">
                        <span className="fw-500">{props.DoctorStatus}</span>
                    </div>
                </div>
                <h3 className="mt-4 mb-2">{props.DoctorName}</h3>
                <h6 className="mx-0 text-body fw-normal">{props.DoctorDesignation}</h6>
                <div className="mt-3 d-flex align-items-center flex-wrap gap-2 justify-content-center">
                    <svg className="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd"
                            d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z"
                            fill="#FFD329"></path>
                    </svg>
                    <h6 className="mb-0 text-body">{props.DoctorReviews}</h6>
                </div>
                <div className="d-flex flex-wrap align-items-center justify-content-center gap-3 mb-3 mt-5">
                    <Link className="btn btn-primary" to="/patient-appointment">
                        <span className="btn-inner">
                            <span className="text d-inline-block align-middle">Book Appointment</span>
                            <span className="icon d-inline-block align-middle ms-1 ps-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                    <path
                                        d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                        fill="currentColor"></path>
                                </svg>
                            </span>
                        </span>
                    </Link>
                    <Link className="btn btn-secondary" to="/app/user-profile">
                        <span className="btn-inner">
                            <span className="text d-inline-block align-middle">View Profile</span>
                            <span className="icon d-inline-block align-middle ms-1 ps-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                    <path
                                        d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                        fill="currentColor"></path>
                                </svg>
                            </span>
                        </span>
                    </Link>
                </div>
            </Card>
        </Fragment>
    )
})
DoctorBox.displayName = "DoctorBox"
export default DoctorBox