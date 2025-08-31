# 🏫 School Management System

A modern, responsive web application built with **Next.js 14** and **MongoDB Atlas** for managing school information. Features a beautiful UI with form validation, image uploads, and an e-commerce style school listing.

## ✨ Features

- **📝 Add Schools**: Comprehensive form with validation
- **🖼️ Image Upload**: Store school images locally
- **🔍 Search & Filter**: Find schools by name, city, or state
- **📱 Responsive Design**: Works perfectly on all devices
- **🏫 School Details**: Beautiful detailed view of each school
- **☁️ Cloud Database**: MongoDB Atlas integration

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas (Cloud)
- **Form Handling**: React Hook Form
- **Styling**: Tailwind CSS with custom components

## 📋 Prerequisites

- Node.js 18+
- MongoDB Atlas account (free tier available)
- npm or yarn

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/school-management.git
cd school-management
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create `.env.local` file:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
MONGODB_DB=school_management
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### 4. MongoDB Atlas Setup
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free cluster
3. Set up database user and network access
4. Get connection string and update `.env.local`

**Important**: If your password contains special characters like `@`, encode them:
- `@` becomes `%40`
- Example: `Pandey@123` → `Pandey%40123`

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
school-management/
├── app/                          # Next.js App Router
│   ├── api/schools/             # API endpoints
│   ├── schools/[id]/            # School details page
│   ├── showSchools/             # Schools listing page
│   ├── globals.css              # Global styles
│   ├── layout.js                # Root layout
│   └── page.js                  # Add school form
├── public/schoolImages/          # Image storage
└── README.md                     # This file
```

## 🎯 Usage

### Adding a School
1. Navigate to `/` (home page)
2. Fill out the form with school details:
   - **ID**: Unique identifier
   - **Name**: School name
   - **Address**: Full address
   - **City**: City name
   - **State**: State name
   - **Contact**: Phone number
   - **Image**: School photo (stored in `schoolImages` folder)
   - **Email**: Valid email address
3. Submit and see success message

### Viewing Schools
1. Go to `/showSchools`
2. Use search and filters to find schools
3. Click "View Details" to see full information

### School Details
- Complete school information display
- Beautiful image showcase
- Contact information and location details
- Responsive design for all devices

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 API Endpoints

- `GET /api/schools` - Fetch all schools
- `POST /api/schools` - Add new school

## 📱 Responsive Design

- **Mobile**: Single column layout, touch-optimized
- **Tablet**: Adaptive grids and layouts
- **Desktop**: Full-featured multi-column interface

## 🔒 Security Features

- Input validation and sanitization
- File type and size validation
- Environment variable protection
- MongoDB injection protection

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Netlify
1. Build command: `npm run build`
2. Publish directory: `.next`
3. Set environment variables

## 🆘 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   pkill -f "next dev"
   npm run dev
   ```

2. **MongoDB Connection Failed**
   - Check your connection string
   - Ensure special characters are URL-encoded
   - Verify network access is enabled

3. **Build Errors**
   ```bash
   rm -rf .next
   npm run build
   ```

4. **Image Upload Issues**
   - Ensure `public/schoolImages` folder exists
   - Check file permissions
   - Verify file size limits

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**⭐ Star this repository if you find it helpful!**
