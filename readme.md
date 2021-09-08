## STRIVE.SCHOOL BUILDWEEK 4

Here's backend for a WhatsApp clone

## endpoints

### USERS RELATED ENDPOINTS

# WAKEUP

GET /api/v1/wakeup
returns 200 along with a message
Needed for inital load, just to wake the server up because heroku free tier falls asleep after 30 minutes of inactivity

# REGISTER

POST /api/v1/user/register
requires:
name: { type: String, required: true, unique: true },
email: { type: String, required: true, unique: true },
password: { type: String, required: true },
avatar: {
type: String,
default: "url to the image",
}

# LOGIN

POST /api/v1/user/login
requires email and password
returns tokens (as cookie and as a response)

# LOGOUT

POST /api/v1/user/logout
returns message: "Logged out successfully!"

# RENEW TOKENS

POST /api/v1/user/renew-tokens
returns 2 new tokens (as a cookie and as a response)

# FIND USER

GET /api/v1/user/users
requires req.body.userId
returns found user object

# CURRENT USER

GET /api/v1/user/me
returns current user object

### CHATS RELATED ENDPOINTS

# I DONT EVEN KNOW WHY IS IT HERE

GET /api/v1/chats
returns current user object

# CREATE ROOM

POST /api/v1/chats/create-room
requires:
name: { type: String, default: "New Room" },
avatar: { type: String, default: "https://i.imgur.com/X2JhY8Y.png" }
returns created room object

# JOIN ROOM

POST /api/v1/chats/join-room
requires req.body.roomId
returns room object

# FIND A ROOM

GET /api/v1/chats/room
requires req.query.roomId
returns room object

# NEW MESSAGE

POST /api/v1/chats/new-message
requires: req.body.message, req.body.roomId
returns room object (with array of messages inside)

# MY ROOMS

GET /api/v1/chats/my-rooms
requires cookie or auth header
returns array of rooms
