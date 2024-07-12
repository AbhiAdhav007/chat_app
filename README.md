## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MongoDB

## Setup Instructions

### Prerequisites
- Node.js
- MongoDB

### Installation
1. Clone the repository:
  
   git clone https://github.com/AbhiAdhav007/chat_app
   
2. Install dependencies:
  
   npm install
   
3. Configure environment variables:
   Create a .env file in the root directory with the following content:
  
   MONGODB_URI=mongodb://localhost:27017/chatapp
   JWT_SECRET=NeoChatApp
   PORT = 5000
   
5. Start the server:
  
   node server.js or nodemon server.js
   
6. Open http://localhost:5000 in your browser to start using the chat application.

## Usage
1. Register a new user.
2. Log in with the registered user by using email id and password.
3. Start sending and receiving messages in real-time.
4. logout to disconnect.
`

With this setup, you should have a fully functional chat application with user authentication and real-time messaging using WebSockets.
