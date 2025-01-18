# ClubConnect

**ClubConnect** is a university-centric platform that bridges the gap between clubs and students. It allows clubs to manage their activities efficiently and provides students with an easy way to stay connected, explore events, and engage with their favorite clubs.

---

## Features

### For Clubs
- Create and update club profiles.
- Post updates with text and images.
- Host and manage events.
- Notify followers about posts via email.

### For Students
- Explore and follow university clubs.
- Register for events and volunteer.
- Receive notifications from favorite clubs.

### General Features
- Email and in-app notifications for event and post updates.
- Secure user authentication for clubs and students.
- Sleek, responsive UI with dynamic content based on user type.

---

## Tech Stack

### Frontend
- **Next.js**
- **TailwindCSS**

### Backend
- **Node.js (Express)**
- **Prisma**
- **PostgreSQL**
- **DigitalOcean Spaces** for file uploads

### State Management
- **Jotai**

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Abhishek-Mishra-GH/club-connect.git
   cd club-connect
   ```

2. Set up the backend:
   - Navigate to the `server` directory.
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file and configure:
     ```env
     DATABASE_URL=your_postgresql_database_url
     JWT_SECRET="your_jwt_secret"
     SPACES_ENDPOINT=your_digitalocean_spaces_endpoint
     SPACES_BUCKET_NAME=your_bucket_name
     SPACES_REGION=your_region
     SPACES_ACCESS_KEY=your_access_key
     SPACES_SECRET_KEY=your_secret_key
     EMAIL_USER="EMAIL_USER_FOR_NOTIFICATIONS"
     EMAIL_PASS="EMAIL_PASS_FOR_NOTIFICATIONS"
     ```
   - Start the backend:
     ```bash
     npm run dev
     ```

3. Set up the frontend:
   - Navigate to the `client` directory.
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file and configure:
     ```env
     NEXT_PUBLIC_BACKEND_SERVICE=http://localhost:your_backend_port
     ```
   - Start the frontend:
     ```bash
     npm run dev
     ```

---

## How It Works

1. **Clubs** can log in, update their profiles, post updates, and create events.
2. **Students** can explore clubs, register for events, and follow clubs to get notifications.
3. Email notifications are sent automatically when clubs post updates.
4. Files such as images for posts or avatars are uploaded to DigitalOcean Spaces.

---

## Contributing

We welcome contributions to improve ClubConnect. Feel free to fork the repository and submit a pull request.

---

## License

This project is licensed under the MIT License.

---

## Team

**Team 10xDevs**  
Innovators bringing university life closer together. 🚀
