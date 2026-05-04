export const projects = [
  {
    id: 1,
    title: "Hospital Management System",
    description: "A comprehensive full-stack hospital management system with patient records, appointment scheduling, billing, and real-time analytics dashboard for healthcare professionals.",
    longDescription: "Built a complete hospital management solution featuring patient registration, doctor schedules, appointment booking, medical records management, billing system, inventory tracking, and an analytics dashboard. The system supports multiple user roles including admin, doctor, nurse, and receptionist.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    category: "Full Stack",
    tech: ["React", "Node.js", "MongoDB", "Express", "JWT", "Socket.io"],
    github: "https://github.com/MuhammadShahzaib88",
    live: "https://hospital-ms-demo.vercel.app",
    featured: true,
    stars: 48,
    forks: 12,
    features: [
      "Patient registration & medical records",
      "Doctor appointment scheduling",
      "Real-time notifications",
      "Billing & invoice generation",
      "Analytics dashboard",
      "Multi-role authentication"
    ],
    challenges: "Implementing real-time appointment updates across multiple devices while maintaining data consistency was challenging. Solved using Socket.io with Redis for session management."
  },
  {
    id: 2,
    title: "Doctor Appointment App",
    description: "A modern telemedicine platform enabling patients to book appointments with doctors, view medical history, and conduct video consultations from anywhere.",
    longDescription: "Full-featured telemedicine application with video consultation support, prescription management, appointment reminders, and integrated payment gateway. Doctors can manage their schedules and patient history efficiently.",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    category: "Full Stack",
    tech: ["React", "Express", "MongoDB", "Socket.io", "WebRTC"],
    github: "https://github.com/MuhammadShahzaib88",
    live: "https://doctor-app-demo.vercel.app",
    featured: false,
    stars: 35,
    forks: 8,
    features: [
      "Video consultation via WebRTC",
      "Smart appointment scheduling",
      "Digital prescription system",
      "Payment gateway integration",
      "SMS/Email reminders"
    ],
    challenges: "Integrating WebRTC for peer-to-peer video calls with fallback to TURN servers for NAT traversal was the biggest technical challenge."
  },
  {
    id: 3,
    title: "E-Commerce Store",
    description: "A fully functional e-commerce platform with product catalog, cart management, Stripe payment integration, order tracking, and admin dashboard.",
    longDescription: "Complete e-commerce solution with product listings, category filtering, search, wishlist, shopping cart, Stripe payments, order management, and a powerful admin panel for inventory management.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    category: "Frontend",
    tech: ["React", "Redux Toolkit", "Stripe", "Firebase", "Tailwind CSS"],
    github: "https://github.com/MuhammadShahzaib88",
    live: "https://ecommerce-demo.vercel.app",
    featured: false,
    stars: 62,
    forks: 19,
    features: [
      "Product catalog with filters",
      "Shopping cart & wishlist",
      "Stripe payment integration",
      "Order tracking system",
      "Admin dashboard",
      "Responsive design"
    ],
    challenges: "Managing complex state across cart, wishlist, and user auth while keeping performance optimal required careful Redux architecture design."
  },
  {
    id: 4,
    title: "College CMS",
    description: "A Content Management System for colleges featuring student enrollment, course management, grade tracking, attendance, and faculty portal.",
    longDescription: "Comprehensive college management system with modules for admissions, student records, course registration, grade management, attendance tracking, timetable scheduling, and faculty management.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    category: "Full Stack",
    tech: ["React", "Node.js", "MySQL", "Express", "JWT", "Chart.js"],
    github: "https://github.com/MuhammadShahzaib88",
    live: "https://college-cms-demo.vercel.app",
    featured: false,
    stars: 28,
    forks: 7,
    features: [
      "Student enrollment system",
      "Course & grade management",
      "Attendance tracking",
      "Faculty portal",
      "Report generation",
      "Role-based access"
    ],
    challenges: "Designing a flexible database schema that could accommodate different course structures and grading systems across multiple departments."
  },
  {
    id: 5,
    title: "Weather Dashboard",
    description: "An interactive weather application with real-time forecasts, location-based weather, interactive maps, and beautiful data visualizations using Chart.js.",
    longDescription: "Beautiful weather dashboard featuring current conditions, 7-day forecasts, hourly breakdowns, weather maps, and historical data visualizations. Supports multiple locations with auto-detection.",
    image: "https://images.unsplash.com/photo-1504608524841-42584120d693?w=800&q=80",
    category: "Frontend",
    tech: ["React", "OpenWeather API", "Chart.js", "Framer Motion", "Tailwind"],
    github: "https://github.com/MuhammadShahzaib88",
    live: "https://weather-dash-demo.vercel.app",
    featured: false,
    stars: 41,
    forks: 11,
    features: [
      "Real-time weather data",
      "7-day forecast",
      "Interactive weather maps",
      "Location auto-detection",
      "Beautiful data charts",
      "Dark/light themes"
    ],
    challenges: "Handling API rate limits while providing smooth real-time updates required implementing a smart caching strategy with background refresh."
  },
  {
    id: 6,
    title: "Chat Application",
    description: "Real-time chat application with private messaging, group chats, file sharing, emoji reactions, and end-to-end message encryption.",
    longDescription: "Feature-rich real-time chat application supporting private conversations, group channels, file/image sharing, emoji reactions, typing indicators, read receipts, and online status. Built with Socket.io for instant messaging.",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80",
    category: "Full Stack",
    tech: ["React", "Socket.io", "Node.js", "MongoDB", "JWT", "Cloudinary"],
    github: "https://github.com/MuhammadShahzaib88",
    live: "https://chat-app-demo.vercel.app",
    featured: false,
    stars: 53,
    forks: 16,
    features: [
      "Real-time messaging",
      "Group chat rooms",
      "File & image sharing",
      "Typing indicators",
      "Read receipts",
      "Online/offline status"
    ],
    challenges: "Implementing efficient message delivery and ensuring messages are never lost during connection drops required a robust queue system with Socket.io acknowledgments."
  },
  {
    id: 7,
    title: "Portfolio Website",
    description: "This portfolio website – built with React, Framer Motion, and Tailwind CSS featuring stunning animations, particle effects, and smooth interactions.",
    longDescription: "Premium portfolio website featuring particle background, glassmorphism design, smooth scroll animations, dark/light theme, contact form integration, and comprehensive sections showcasing skills, projects, and experience.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    category: "Frontend",
    tech: ["React", "Framer Motion", "Tailwind CSS", "Typed.js", "tsParticles"],
    github: "https://github.com/MuhammadShahzaib88",
    live: "https://shahzaib-portfolio.vercel.app",
    featured: false,
    stars: 89,
    forks: 24,
    features: [
      "Particle background effect",
      "Dark/light mode toggle",
      "Smooth scroll animations",
      "Typing text animation",
      "Project filter system",
      "EmailJS contact form"
    ],
    challenges: "Optimizing performance while maintaining 60fps animations across all devices required careful use of will-change, GPU compositing, and lazy loading strategies."
  },
  {
    id: 8,
    title: "Task Manager App",
    description: "A productivity-focused task management app with drag-and-drop kanban board, priority labels, due dates, reminders, and team collaboration features.",
    longDescription: "Full-featured task management application with Kanban board view, list view, priority tagging, due date management, subtasks, file attachments, team collaboration, and productivity analytics dashboard.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    category: "Frontend",
    tech: ["React", "Firebase", "Redux Toolkit", "React DnD", "Framer Motion"],
    github: "https://github.com/MuhammadShahzaib88",
    live: "https://task-manager-demo.vercel.app",
    featured: false,
    stars: 37,
    forks: 9,
    features: [
      "Drag-and-drop Kanban board",
      "Priority & label system",
      "Due date & reminders",
      "Subtask management",
      "Team collaboration",
      "Productivity analytics"
    ],
    challenges: "Implementing smooth drag-and-drop with optimistic UI updates while syncing with Firebase in real-time required careful state management and conflict resolution."
  }
]

export const categories = ["All", "Frontend", "Full Stack", "React", "Node.js"]
