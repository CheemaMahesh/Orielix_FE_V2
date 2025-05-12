// Event data for the Events page
export const eventData = [
  // Existing events
  {
    id: 1,
    title: "Advanced Photography Techniques",
    description: "Learn professional photography techniques from industry experts. Perfect for intermediate photographers looking to enhance their skills.",
    date: "May 15, 2025",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    presenter: {
      name: "Sarah Johnson",
      role: "Photography Expert",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      fallback: "SJ"
    },
    attending: 24,
    color: "purple"
  },
  {
    id: 2,
    title: "Creative Design Showcase",
    description: "Join fellow designers for an evening of inspiration, networking, and showcasing your latest creative projects.",
    date: "May 22, 2025",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    presenter: {
      name: "David Lee",
      role: "Design Director",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      fallback: "DL"
    },
    attending: 56,
    color: "indigo"
  },
  {
    id: 3,
    title: "AI-Powered Art Creation",
    description: "Explore the intersection of art and artificial intelligence in this hands-on workshop. Learn to use AI tools to enhance your creative process.",
    date: "June 5, 2025",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    presenter: {
      name: "Emily Martinez",
      role: "AI Artist",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      fallback: "EM"
    },
    attending: 32,
    color: "purple"
  },
  
  // New events
  {
    id: 4,
    title: "Web Animation Masterclass",
    description: "Master the art of creating engaging web animations using the latest techniques and tools. Perfect for front-end developers and designers.",
    date: "June 12, 2025",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    presenter: {
      name: "Jason Wong",
      role: "Animation Specialist",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      fallback: "JW"
    },
    attending: 41,
    color: "indigo"
  },
  {
    id: 5,
    title: "Blockchain Development Workshop",
    description: "Dive into blockchain technology and learn how to build decentralized applications. Hands-on coding sessions included.",
    date: "June 18, 2025",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80",
    presenter: {
      name: "Michael Chen",
      role: "Blockchain Engineer",
      avatar: "https://randomuser.me/api/portraits/men/33.jpg",
      fallback: "MC"
    },
    attending: 38,
    color: "purple"
  },
  {
    id: 6,
    title: "UX Research Fundamentals",
    description: "Learn essential UX research methods and how to apply them to create user-centered designs that solve real problems.",
    date: "June 25, 2025",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    presenter: {
      name: "Sophia Rodriguez",
      role: "UX Research Lead",
      avatar: "https://randomuser.me/api/portraits/women/42.jpg",
      fallback: "SR"
    },
    attending: 45,
    color: "indigo"
  },
  {
    id: 7,
    title: "3D Modeling for Game Design",
    description: "Create stunning 3D models for games using industry-standard tools. Learn techniques used by professional game studios.",
    date: "July 3, 2025",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    presenter: {
      name: "Alex Turner",
      role: "3D Artist",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
      fallback: "AT"
    },
    attending: 29,
    color: "purple"
  },
  {
    id: 8,
    title: "Motion Graphics Essentials",
    description: "Learn the fundamentals of motion graphics and create captivating animations for various platforms and media.",
    date: "July 10, 2025",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    presenter: {
      name: "Olivia Kim",
      role: "Motion Designer",
      avatar: "https://randomuser.me/api/portraits/women/56.jpg",
      fallback: "OK"
    },
    attending: 36,
    color: "indigo"
  },
  {
    id: 9,
    title: "AR/VR Development Workshop",
    description: "Explore the world of augmented and virtual reality development. Build immersive experiences using cutting-edge technologies.",
    date: "July 17, 2025",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2078&q=80",
    presenter: {
      name: "Ryan Patel",
      role: "XR Developer",
      avatar: "https://randomuser.me/api/portraits/men/62.jpg",
      fallback: "RP"
    },
    attending: 27,
    color: "purple"
  },
  {
    id: 10,
    title: "UI Design Systems Workshop",
    description: "Learn how to create and implement scalable design systems that improve consistency and efficiency in product development.",
    date: "July 24, 2025",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    presenter: {
      name: "Emma Wilson",
      role: "Design Systems Lead",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
      fallback: "EW"
    },
    attending: 52,
    color: "indigo"
  },
  {
    id: 11,
    title: "Data Visualization Techniques",
    description: "Master the art of transforming complex data into clear, compelling visual stories that drive insights and decision-making.",
    date: "July 31, 2025",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    presenter: {
      name: "Daniel Garcia",
      role: "Data Visualization Expert",
      avatar: "https://randomuser.me/api/portraits/men/72.jpg",
      fallback: "DG"
    },
    attending: 43,
    color: "purple"
  },
  {
    id: 12,
    title: "Character Animation Workshop",
    description: "Learn professional techniques for bringing characters to life through animation. Perfect for illustrators and animators.",
    date: "August 7, 2025",
    image: "https://images.unsplash.com/photo-1633467067670-e6f3b5ba9326?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    presenter: {
      name: "Natalie Park",
      role: "Character Animator",
      avatar: "https://randomuser.me/api/portraits/women/75.jpg",
      fallback: "NP"
    },
    attending: 31,
    color: "indigo"
  },
  {
    id: 13,
    title: "Frontend Performance Optimization",
    description: "Discover techniques to optimize your web applications for maximum performance and improved user experience.",
    date: "August 14, 2025",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
    presenter: {
      name: "Thomas Wright",
      role: "Frontend Architect",
      avatar: "https://randomuser.me/api/portraits/men/82.jpg",
      fallback: "TW"
    },
    attending: 47,
    color: "purple"
  }
];
