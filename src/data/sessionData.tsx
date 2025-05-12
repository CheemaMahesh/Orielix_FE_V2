// Session data for the Sessions page
export const sessionData = [
  // Existing sessions
  {
    id: 1,
    title: "Mastering Portrait Lighting",
    description: "Learn professional lighting techniques to create stunning portrait photography in any environment.",
    duration: "90 min",
    date: "May 20, 2025",
    time: "3:00 PM",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    status: "live",
    level: "intermediate",
    rating: 4.8,
    presenter: {
      name: "Sarah Johnson",
      role: "Portrait Photographer",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      fallback: "SJ"
    },
    enrolled: 24,
    color: "indigo"
  },
  {
    id: 2,
    title: "Composition Techniques",
    description: "Master the fundamentals of composition to create visually compelling and balanced photographs.",
    duration: "60 min",
    date: "May 22, 2025",
    time: "4:30 PM",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    status: "upcoming",
    level: "beginner",
    rating: 4.6,
    presenter: {
      name: "David Lee",
      role: "Visual Artist",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      fallback: "DL"
    },
    enrolled: 18,
    color: "purple"
  },
  {
    id: 3,
    title: "Advanced Photo Editing",
    description: "Take your editing skills to the next level with advanced techniques for color grading, retouching, and creative effects.",
    duration: "120 min",
    date: "May 25, 2025",
    time: "6:00 PM",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    status: "upcoming",
    level: "advanced",
    rating: 4.9,
    presenter: {
      name: "Maya Patel",
      role: "Professional Retoucher",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      fallback: "MP"
    },
    enrolled: 32,
    color: "indigo"
  },
  
  // New sessions
  {
    id: 4,
    title: "Creative Motion Graphics",
    description: "Learn to create eye-catching motion graphics for social media, websites, and video projects using industry-standard tools.",
    duration: "90 min",
    date: "June 2, 2025",
    time: "2:00 PM",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    status: "upcoming",
    level: "intermediate",
    rating: 4.7,
    presenter: {
      name: "Alex Turner",
      role: "Motion Designer",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      fallback: "AT"
    },
    enrolled: 27,
    color: "purple"
  },
  {
    id: 5,
    title: "UI/UX Design Principles",
    description: "Master the fundamentals of user interface and experience design to create intuitive, beautiful digital products.",
    duration: "75 min",
    date: "June 5, 2025",
    time: "5:30 PM",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    status: "upcoming",
    level: "beginner",
    rating: 4.9,
    presenter: {
      name: "Emma Wilson",
      role: "UX Designer",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
      fallback: "EW"
    },
    enrolled: 45,
    color: "indigo"
  },
  {
    id: 6,
    title: "3D Modeling Fundamentals",
    description: "Learn the basics of 3D modeling and create your first 3D assets using industry-standard software and techniques.",
    duration: "120 min",
    date: "June 8, 2025",
    time: "1:00 PM",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    status: "upcoming",
    level: "beginner",
    rating: 4.5,
    presenter: {
      name: "Michael Chen",
      role: "3D Artist",
      avatar: "https://randomuser.me/api/portraits/men/33.jpg",
      fallback: "MC"
    },
    enrolled: 36,
    color: "purple"
  },
  {
    id: 7,
    title: "Character Animation Workshop",
    description: "Bring characters to life with professional animation techniques for games, films, and digital content.",
    duration: "100 min",
    date: "June 12, 2025",
    time: "4:00 PM",
    image: "https://images.unsplash.com/photo-1633467067670-e6f3b5ba9326?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    status: "upcoming",
    level: "intermediate",
    rating: 4.8,
    presenter: {
      name: "Natalie Park",
      role: "Character Animator",
      avatar: "https://randomuser.me/api/portraits/women/75.jpg",
      fallback: "NP"
    },
    enrolled: 22,
    color: "indigo"
  },
  {
    id: 8,
    title: "Web Design Trends 2025",
    description: "Explore the latest web design trends and learn how to implement them in your projects for modern, cutting-edge websites.",
    duration: "60 min",
    date: "June 15, 2025",
    time: "11:00 AM",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    status: "upcoming",
    level: "intermediate",
    rating: 4.6,
    presenter: {
      name: "Thomas Wright",
      role: "Web Designer",
      avatar: "https://randomuser.me/api/portraits/men/82.jpg",
      fallback: "TW"
    },
    enrolled: 39,
    color: "purple"
  },
  {
    id: 9,
    title: "Digital Illustration Masterclass",
    description: "Master digital illustration techniques to create stunning artwork for various applications and platforms.",
    duration: "90 min",
    date: "June 18, 2025",
    time: "3:30 PM",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    status: "upcoming",
    level: "advanced",
    rating: 4.9,
    presenter: {
      name: "Sophia Rodriguez",
      role: "Illustrator",
      avatar: "https://randomuser.me/api/portraits/women/42.jpg",
      fallback: "SR"
    },
    enrolled: 28,
    color: "indigo"
  },
  {
    id: 10,
    title: "Game UI Design Principles",
    description: "Learn how to design intuitive and engaging user interfaces specifically for games across different platforms.",
    duration: "75 min",
    date: "June 22, 2025",
    time: "5:00 PM",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    status: "upcoming",
    level: "intermediate",
    rating: 4.7,
    presenter: {
      name: "Ryan Patel",
      role: "Game UI Designer",
      avatar: "https://randomuser.me/api/portraits/men/62.jpg",
      fallback: "RP"
    },
    enrolled: 34,
    color: "purple"
  },
  {
    id: 11,
    title: "Typography for Designers",
    description: "Master the art of typography to enhance your design projects with effective and beautiful text treatments.",
    duration: "60 min",
    date: "June 25, 2025",
    time: "1:30 PM",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    status: "upcoming",
    level: "beginner",
    rating: 4.8,
    presenter: {
      name: "Daniel Garcia",
      role: "Typography Expert",
      avatar: "https://randomuser.me/api/portraits/men/72.jpg",
      fallback: "DG"
    },
    enrolled: 41,
    color: "indigo"
  },
  {
    id: 12,
    title: "Color Theory for Digital Design",
    description: "Understand the principles of color theory and how to apply them effectively in your digital design projects.",
    duration: "70 min",
    date: "June 28, 2025",
    time: "4:30 PM",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    status: "upcoming",
    level: "beginner",
    rating: 4.6,
    presenter: {
      name: "Olivia Kim",
      role: "Color Specialist",
      avatar: "https://randomuser.me/api/portraits/women/56.jpg",
      fallback: "OK"
    },
    enrolled: 37,
    color: "purple"
  },
  {
    id: 13,
    title: "Animation Principles for UI",
    description: "Learn how to incorporate animation into user interfaces to enhance user experience and add visual delight.",
    duration: "80 min",
    date: "July 2, 2025",
    time: "2:00 PM",
    image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    status: "upcoming",
    level: "intermediate",
    rating: 4.7,
    presenter: {
      name: "Jason Wong",
      role: "UI Animation Expert",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      fallback: "JW"
    },
    enrolled: 29,
    color: "indigo"
  }
];
