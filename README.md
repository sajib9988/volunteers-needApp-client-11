Volunteer Project
This is a volunteer management web application where organizers can post volunteer opportunities, and volunteers can browse and apply for these opportunities.

Table of Contents
Tech Stack
Endpoints
License


Tech Stack
Client:

React
Axios
Firebase
Tailwind CSS
DaisyUI
Swiper
Date-fns
React Router
React Helmet
React Toastify
React Icons
React Modal
AOS-Animation



Server:
Express.js
MongoDB
JWT
Cookie-parser
Cors
Dotenv


Endpoints
Public Endpoints
POST /jwt - Generate JWT token.
GET /logout - Clear the JWT token.
POST /addVolunteers - Add a new volunteer post.
GET /posts - Fetch all volunteer posts.
GET /detailsPage/:id - Fetch details of a specific post by ID.
Protected Endpoints (Require JWT Token)
POST /volunteer-request - Submit a volunteer request.
GET /my-posts - Fetch posts created by the authenticated organizer.
GET /myRequest/:email - Fetch requests for the authenticated organizer.
PATCH /myRequestApprove/:id - Approve a volunteer request.
PATCH /myRequest/:id/reject - Reject a volunteer request.
PUT /update/:id - Update a volunteer post.
DELETE /posts/:id - Delete a volunteer post.
GET /volunteer-requests/:email - Fetch requests submitted by a volunteer.



License
This project is licensed under the MIT License.