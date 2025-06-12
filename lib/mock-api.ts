// Mock API for  preview environment
interface User {
  id: string
  email: string
  name: string
  role: "student" | "admin"
  college: string
  studentId?: string
  department?: string
}

interface Job {
  id: string
  title: string
  description: string
  location: string
  jobType: string
  salary: string
  salaryPeriod: string
  deadline: string
  requirements: string[]
  college: string
  postedBy: string
  status: "active" | "closed"
  applicantCount: number
  hasApplied: boolean
  createdAt: string
}

interface Application {
  id: string
  jobId: string
  studentId: string
  status: "pending" | "accepted" | "rejected" | "interview_scheduled" | "offer_received"
  appliedAt: string
}

interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  readTime: string
  author: string
  likes: number
  date: string
  authorId: string
}

interface Candidate {
  id: string
  name: string
  email: string
  title: string
  location: string
  experience: string
  education: string
  skills: string[]
  bio: string
  college: string
  studentId: string
  department: string
  gpa: string
  projects: Array<{
    name: string
    description: string
    technologies: string[]
    link?: string
  }>
  achievements: string[]
}

interface DashboardStats {
  admin: {
    totalJobs: number
    activeJobs: number
    totalApplicants: number
    newApplicationsThisWeek: number
    candidatesInPipeline: number
    interviewsScheduled: number
  }
  student: {
    jobsApplied: number
    applicationsRejected: number
    interviewsCompleted: number
    offersReceived: number
    applicationsPending: number
    profileViews: number
  }
}

// Mock data storage (in real app, this would be in database)
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@iitd.ac.in",
    name: "IIT Delhi Admin",
    role: "admin",
    college: "Indian Institute of Technology Delhi",
  },
  {
    id: "2",
    email: "rahul.sharma@iitd.ac.in",
    name: "Rahul Sharma",
    role: "student",
    college: "Indian Institute of Technology Delhi",
    studentId: "2021CS10001",
    department: "Computer Science & Engineering",
  },
  {
    id: "3",
    email: "admin@iitb.ac.in",
    name: "IIT Bombay Admin",
    role: "admin",
    college: "Indian Institute of Technology Bombay",
  },
  {
    id: "4",
    email: "priya.patel@iitb.ac.in",
    name: "Priya Patel",
    role: "student",
    college: "Indian Institute of Technology Bombay",
    studentId: "2021EC10015",
    department: "Electronics & Communication",
  },
]

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Software Development Intern",
    description:
      "Join Infosys to work on cutting-edge web applications using React, Node.js, and cloud technologies. Great opportunity to learn enterprise-level development.",
    location: "Bangalore, Karnataka",
    jobType: "Internship",
    salary: "₹25,000",
    salaryPeriod: "Monthly",
    deadline: "2025-03-15",
    requirements: ["React", "Node.js", "JavaScript", "MySQL"],
    college: "Indian Institute of Technology Delhi",
    postedBy: "1",
    status: "active",
    applicantCount: 12,
    hasApplied: false,
    createdAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Digital Marketing Intern",
    description:
      "Work with Flipkart's marketing team to create and execute digital marketing campaigns across various platforms and social media channels.",
    location: "Mumbai, Maharashtra",
    jobType: "Internship",
    salary: "₹20,000",
    salaryPeriod: "Monthly",
    deadline: "2025-03-20",
    requirements: ["Social Media Marketing", "Content Creation", "Google Analytics", "SEO"],
    college: "Indian Institute of Technology Delhi",
    postedBy: "1",
    status: "active",
    applicantCount: 8,
    hasApplied: true,
    createdAt: "2025-01-16T10:00:00Z",
  },
  {
    id: "3",
    title: "Data Science Intern",
    description:
      "Join Zomato's data science team to work with large datasets, build ML models, and derive insights to improve user experience and business decisions.",
    location: "Gurgaon, Haryana",
    jobType: "Internship",
    salary: "₹30,000",
    salaryPeriod: "Monthly",
    deadline: "2025-03-25",
    requirements: ["Python", "SQL", "Machine Learning", "Pandas", "Scikit-learn"],
    college: "Indian Institute of Technology Bombay",
    postedBy: "3",
    status: "active",
    applicantCount: 15,
    hasApplied: false,
    createdAt: "2025-01-17T10:00:00Z",
  },
  {
    id: "4",
    title: "UI/UX Design Intern",
    description:
      "Work with Paytm's design team to create user-centered designs for mobile and web applications. Focus on improving user experience across fintech products.",
    location: "Noida, Uttar Pradesh",
    jobType: "Internship",
    salary: "₹22,000",
    salaryPeriod: "Monthly",
    deadline: "2025-04-01",
    requirements: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems"],
    college: "Indian Institute of Technology Delhi",
    postedBy: "1",
    status: "active",
    applicantCount: 6,
    hasApplied: false,
    createdAt: "2025-01-18T10:00:00Z",
  },
  {
    id: "5",
    title: "Full Stack Developer",
    description:
      "Join Swiggy as a full-stack developer to build and maintain scalable web applications. Work with modern tech stack and contribute to India's leading food delivery platform.",
    location: "Bangalore, Karnataka",
    jobType: "Full-time",
    salary: "₹8,00,000",
    salaryPeriod: "Annually",
    deadline: "2025-04-10",
    requirements: ["React", "Node.js", "TypeScript", "MongoDB", "AWS", "Docker"],
    college: "Indian Institute of Technology Delhi",
    postedBy: "1",
    status: "active",
    applicantCount: 20,
    hasApplied: false,
    createdAt: "2025-01-19T10:00:00Z",
  },
  {
    id: "6",
    title: "Android Developer Intern",
    description:
      "Work with PhonePe's mobile development team to build and enhance Android applications. Learn about fintech, payments, and mobile app development at scale.",
    location: "Pune, Maharashtra",
    jobType: "Internship",
    salary: "₹28,000",
    salaryPeriod: "Monthly",
    deadline: "2025-04-05",
    requirements: ["Java", "Kotlin", "Android SDK", "REST APIs", "Git"],
    college: "Indian Institute of Technology Bombay",
    postedBy: "3",
    status: "active",
    applicantCount: 10,
    hasApplied: false,
    createdAt: "2025-01-20T10:00:00Z",
  },
  {
    id: "7",
    title: "Machine Learning Engineer",
    description:
      "Work with Ola's AI team to develop machine learning models for ride optimization, demand forecasting, and route planning.",
    location: "Bangalore, Karnataka",
    jobType: "Full-time",
    salary: "₹12,00,000",
    salaryPeriod: "Annually",
    deadline: "2025-04-15",
    requirements: ["Python", "TensorFlow", "PyTorch", "SQL", "Statistics"],
    college: "Indian Institute of Technology Delhi",
    postedBy: "1",
    status: "active",
    applicantCount: 25,
    hasApplied: false,
    createdAt: "2025-01-21T10:00:00Z",
  },
  {
    id: "8",
    title: "Product Manager Intern",
    description:
      "Join Razorpay's product team to work on fintech solutions, conduct market research, and assist in product strategy development.",
    location: "Bangalore, Karnataka",
    jobType: "Internship",
    salary: "₹35,000",
    salaryPeriod: "Monthly",
    deadline: "2025-04-20",
    requirements: ["Product Management", "Market Research", "Analytics", "Communication"],
    college: "Indian Institute of Technology Delhi",
    postedBy: "1",
    status: "active",
    applicantCount: 18,
    hasApplied: false,
    createdAt: "2025-01-22T10:00:00Z",
  },
  {
    id: "9",
    title: "DevOps Engineer",
    description:
      "Work with Myntra's infrastructure team to manage cloud deployments, CI/CD pipelines, and monitoring systems.",
    location: "Bangalore, Karnataka",
    jobType: "Full-time",
    salary: "₹10,00,000",
    salaryPeriod: "Annually",
    deadline: "2025-04-25",
    requirements: ["AWS", "Docker", "Kubernetes", "Jenkins", "Linux"],
    college: "Indian Institute of Technology Bombay",
    postedBy: "3",
    status: "active",
    applicantCount: 14,
    hasApplied: false,
    createdAt: "2025-01-23T10:00:00Z",
  },
  {
    id: "10",
    title: "Cybersecurity Analyst",
    description:
      "Join HDFC Bank's cybersecurity team to monitor threats, conduct security assessments, and implement security protocols.",
    location: "Mumbai, Maharashtra",
    jobType: "Full-time",
    salary: "₹9,00,000",
    salaryPeriod: "Annually",
    deadline: "2025-04-30",
    requirements: ["Network Security", "Ethical Hacking", "SIEM", "Incident Response"],
    college: "Indian Institute of Technology Bombay",
    postedBy: "3",
    status: "active",
    applicantCount: 12,
    hasApplied: false,
    createdAt: "2025-01-24T10:00:00Z",
  },
]

const mockApplications: Application[] = [
  {
    id: "1",
    jobId: "2",
    studentId: "2",
    status: "pending",
    appliedAt: "2025-01-20T10:00:00Z",
  },
  {
    id: "2",
    jobId: "1",
    studentId: "2",
    status: "interview_scheduled",
    appliedAt: "2025-01-18T10:00:00Z",
  },
  {
    id: "3",
    jobId: "4",
    studentId: "2",
    status: "rejected",
    appliedAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "4",
    jobId: "3",
    studentId: "4",
    status: "offer_received",
    appliedAt: "2025-01-12T10:00:00Z",
  },
  {
    id: "5",
    jobId: "1",
    studentId: "4",
    status: "pending",
    appliedAt: "2025-01-19T10:00:00Z",
  },
  {
    id: "6",
    jobId: "5",
    studentId: "2",
    status: "pending",
    appliedAt: "2025-01-21T10:00:00Z",
  },
  {
    id: "7",
    jobId: "7",
    studentId: "5",
    status: "pending",
    appliedAt: "2025-01-25T10:00:00Z",
  },
  {
    id: "8",
    jobId: "8",
    studentId: "6",
    status: "interview_scheduled",
    appliedAt: "2025-01-24T10:00:00Z",
  },
  {
    id: "9",
    jobId: "9",
    studentId: "7",
    status: "pending",
    appliedAt: "2025-01-23T10:00:00Z",
  },
  {
    id: "10",
    jobId: "10",
    studentId: "5",
    status: "offer_received",
    appliedAt: "2025-01-22T10:00:00Z",
  },
]

const mockArticles: Article[] = [
  {
    id: "1",
    title: "How to Crack Campus Placements in India",
    excerpt: "Essential tips and strategies to succeed in campus placement drives at Indian colleges and universities.",
    content: `# How to Crack Campus Placements in India

Campus placements are crucial for engineering and management students in India. With proper preparation and strategy, you can secure your dream job during campus recruitment drives.

## Understanding the Indian Placement Process

### Pre-Placement Talks (PPTs)
Companies conduct PPTs to introduce themselves and explain their hiring process. Attend these sessions to understand company culture and expectations.

### Eligibility Criteria
Most companies have minimum CGPA requirements (usually 6.5-7.0 for tier-1 companies). Some also have specific branch requirements or no active backlogs policy.

### Selection Rounds
1. **Online Assessment**: Aptitude, technical, and coding questions
2. **Group Discussion**: Communication and leadership skills
3. **Technical Interview**: Core subject knowledge and problem-solving
4. **HR Interview**: Personality assessment and cultural fit

## Preparation Strategy

### Technical Preparation
- **Data Structures & Algorithms**: Focus on arrays, linked lists, trees, graphs
- **Core Subjects**: Strengthen fundamentals in your branch subjects
- **Programming Languages**: Master at least one language (C++, Java, Python)
- **System Design**: For senior positions, understand scalability concepts

### Aptitude & Reasoning
- **Quantitative Aptitude**: Practice from R.S. Aggarwal, Arun Sharma books
- **Logical Reasoning**: Solve puzzles and pattern recognition problems
- **Verbal Ability**: Improve grammar, vocabulary, and reading comprehension

### Soft Skills Development
- **Communication**: Practice speaking clearly and confidently
- **Group Discussion**: Stay updated with current affairs and practice expressing views
- **Resume Building**: Highlight projects, internships, and achievements effectively

## Company-Specific Preparation

### IT Services (TCS, Infosys, Wipro, Accenture)
- Focus on programming fundamentals and logical thinking
- Practice coding problems on HackerRank, CodeChef
- Prepare for email writing and communication assessment

### Product Companies (Microsoft, Amazon, Google, Flipkart)
- Strong DSA knowledge is essential
- Practice on LeetCode, GeeksforGeeks
- Understand system design basics
- Prepare for behavioral questions using STAR method

### Core Companies (L&T, BHEL, ONGC)
- Deep knowledge of core engineering subjects
- Current affairs related to your industry
- Technical projects and practical applications

## Common Mistakes to Avoid

- **Neglecting CGPA**: Maintain good academic performance throughout
- **Last-minute preparation**: Start preparing from 2nd year onwards
- **Ignoring soft skills**: Technical knowledge alone isn't sufficient
- **Not practicing mock interviews**: Regular practice builds confidence
- **Limiting options**: Apply to multiple companies across different sectors

## Final Tips

- **Stay Updated**: Follow industry trends and company news
- **Network**: Connect with seniors and alumni for guidance
- **Mock Tests**: Take regular online assessments to improve speed and accuracy
- **Stay Calm**: Manage stress and maintain confidence during interviews
- **Backup Plans**: Have multiple options and don't depend on a single company

Remember, campus placements are just one way to start your career. Focus on continuous learning and skill development for long-term success.`,
    category: "Campus Placements",
    readTime: "8 min read",
    author: "Placement Officer",
    authorId: "1",
    likes: 342,
    date: "2025-01-15",
  },
  {
    id: "2",
    title: "Top Programming Languages for Indian IT Industry",
    excerpt:
      "Discover which programming languages are most in-demand in the Indian tech job market and how to master them.",
    content: `# Top Programming Languages for Indian IT Industry

The Indian IT industry is one of the largest employers of software engineers globally. Understanding which programming languages are in high demand can significantly boost your career prospects.

## Most In-Demand Languages in India

### 1. Java
**Why it's popular:**
- Backbone of many enterprise applications
- Used by major Indian IT companies like TCS, Infosys, Wipro
- Strong demand in banking and financial services
- Platform independence makes it versatile

**Career opportunities:**
- Backend Developer
- Full Stack Developer
- Android Developer
- Enterprise Application Developer

### 2. Python
**Why it's popular:**
- Rapid growth in data science and AI/ML fields
- Simple syntax makes it beginner-friendly
- Used in automation and scripting
- High demand in startups and product companies

**Career opportunities:**
- Data Scientist
- Machine Learning Engineer
- Backend Developer
- DevOps Engineer

### 3. JavaScript
**Why it's popular:**
- Essential for web development
- Full-stack development with Node.js
- High demand in e-commerce and fintech
- Used by companies like Flipkart, Paytm, Zomato

**Career opportunities:**
- Frontend Developer
- Full Stack Developer
- React/Angular Developer
- Node.js Developer

### 4. C++
**Why it's popular:**
- Competitive programming favorite
- System programming and embedded systems
- Game development
- High-performance applications

**Career opportunities:**
- System Programmer
- Game Developer
- Embedded Systems Engineer
- Competitive Programmer

### 5. SQL
**Why it's popular:**
- Essential for database management
- Required in almost every software role
- Data analysis and reporting
- Backend development support

**Career opportunities:**
- Database Administrator
- Data Analyst
- Backend Developer
- Business Intelligence Developer

## Industry-Specific Preferences

### IT Services Companies
- **Java**: Enterprise applications, web services
- **C++**: System programming, competitive coding rounds
- **SQL**: Database operations and reporting
- **Python**: Automation and scripting

### Product Companies
- **JavaScript**: Frontend and full-stack development
- **Python**: Backend services, data science
- **Java**: Scalable backend systems
- **Go/Rust**: High-performance services

### Startups
- **JavaScript**: Rapid prototyping and development
- **Python**: Quick development cycles, AI/ML integration
- **React Native/Flutter**: Cross-platform mobile development

### Banking & Finance
- **Java**: Core banking systems
- **C++**: High-frequency trading systems
- **Python**: Risk analysis and algorithmic trading
- **SQL**: Data analysis and reporting

## Learning Path Recommendations

### For Beginners
1. Start with **Python** for its simplicity
2. Learn **SQL** for database fundamentals
3. Move to **JavaScript** for web development
4. Pick up **Java** for enterprise development

### For Competitive Programming
1. Master **C++** for speed and efficiency
2. Learn **Java** as an alternative
3. Practice **Python** for quick prototyping
4. Understand **algorithms and data structures**

### For Data Science Career
1. **Python** with libraries (NumPy, Pandas, Scikit-learn)
2. **R** for statistical analysis
3. **SQL** for data manipulation
4. **Scala** for big data processing

## Salary Trends (India - 2025)

### Fresher Level (0-2 years)
- **Java Developer**: ₹3-6 LPA
- **Python Developer**: ₹3.5-7 LPA
- **JavaScript Developer**: ₹3-6 LPA
- **Data Scientist**: ₹4-8 LPA

### Mid-Level (3-5 years)
- **Java Developer**: ₹6-12 LPA
- **Python Developer**: ₹7-15 LPA
- **JavaScript Developer**: ₹6-12 LPA
- **Data Scientist**: ₹8-18 LPA

### Senior Level (5+ years)
- **Java Architect**: ₹12-25 LPA
- **Python Expert**: ₹15-30 LPA
- **JavaScript Architect**: ₹12-25 LPA
- **Senior Data Scientist**: ₹18-40 LPA

## Tips for Success

1. **Master the Fundamentals**: Don't just learn syntax, understand concepts
2. **Build Projects**: Create a portfolio showcasing your skills
3. **Contribute to Open Source**: Gain real-world experience
4. **Stay Updated**: Technology evolves rapidly, keep learning
5. **Practice Regularly**: Consistency is key to mastering programming
6. **Join Communities**: Connect with other developers for learning and opportunities

The key is to choose languages that align with your career goals and the industry you want to work in. Focus on becoming proficient in 2-3 languages rather than trying to learn everything superficially.`,
    category: "Programming",
    readTime: "10 min read",
    author: "Tech Lead",
    authorId: "1",
    likes: 289,
    date: "2025-01-10",
  },
  {
    id: "3",
    title: "Salary Negotiation Tips for Indian Job Market",
    excerpt: "Learn how to effectively negotiate your salary and benefits in the Indian corporate environment.",
    content: `# Salary Negotiation Tips for Indian Job Market

Salary negotiation in India requires understanding cultural nuances, market standards, and company policies. Here's how to negotiate effectively while maintaining professional relationships.

## Understanding the Indian Job Market

### Salary Structure Components
- **Basic Salary**: 40-50% of CTC
- **HRA (House Rent Allowance)**: 40-50% of basic salary
- **Special Allowance**: Variable component
- **PF (Provident Fund)**: 12% of basic salary
- **Gratuity**: 4.81% of basic salary
- **Medical Insurance**: Usually provided by company
- **Variable Pay**: Performance-based bonus

### Industry Standards (2025)

#### IT Services
- **Fresher**: ₹3-4.5 LPA
- **2-4 years**: ₹5-8 LPA
- **5-7 years**: ₹8-15 LPA
- **8+ years**: ₹15-25 LPA

#### Product Companies
- **Fresher**: ₹6-12 LPA
- **2-4 years**: ₹10-18 LPA
- **5-7 years**: ₹18-30 LPA
- **8+ years**: ₹25-50 LPA

#### Consulting
- **Fresher**: ₹8-15 LPA
- **2-4 years**: ₹12-20 LPA
- **5-7 years**: ₹20-35 LPA
- **8+ years**: ₹30-60 LPA

## Pre-Negotiation Preparation

### Research Market Rates
- Use platforms like Glassdoor, PayScale, AmbitionBox
- Check with friends and colleagues in similar roles
- Consider location-based variations (Mumbai/Bangalore vs Tier-2 cities)
- Factor in company size and funding stage

### Document Your Value
- List your achievements with quantifiable results
- Highlight skills that are in high demand
- Prepare examples of how you've added value to previous roles
- Research the company's financial health and growth

### Understand Your Leverage
- **High leverage**: Rare skills, multiple offers, strong performance
- **Medium leverage**: Good performance, some market demand
- **Low leverage**: Common skills, single offer, average performance

## Negotiation Strategies

### For Job Offers

#### Do's
- **Express enthusiasm** for the role and company
- **Ask for time** to consider the offer (24-48 hours)
- **Negotiate the entire package**, not just base salary
- **Be specific** with your counter-offer and reasoning
- **Remain professional** throughout the process

#### Don'ts
- **Don't lie** about competing offers
- **Don't make unrealistic demands** (50%+ increase)
- **Don't negotiate via email** for important discussions
- **Don't burn bridges** if negotiation fails
- **Don't accept immediately** without reviewing terms

### For Salary Reviews

#### Preparation Steps
1. **Document achievements** from the past year
2. **Gather market data** for your role and experience
3. **Schedule a formal meeting** with your manager
4. **Prepare a presentation** showcasing your contributions
5. **Set realistic expectations** based on company policy

#### During the Discussion
- **Start with achievements**, not salary demands
- **Link contributions to business impact**
- **Present market research professionally**
- **Be open to non-monetary benefits** if budget is tight
- **Ask about growth path** and future opportunities

## Indian-Specific Considerations

### Cultural Factors
- **Hierarchy respect**: Approach seniors with proper etiquette
- **Relationship building**: Invest time in building rapport
- **Indirect communication**: Read between the lines
- **Long-term thinking**: Show commitment to the organization

### Common Benefits to Negotiate
- **Flexible working hours** or work-from-home options
- **Additional leaves** beyond company policy
- **Learning and development** budget
- **Laptop/mobile allowance** for personal use
- **Cab facility** or transport allowance
- **Health insurance** for family members
- **Stock options** in startups
- **Joining bonus** to compensate for lost benefits

### Regional Variations
- **Metro cities**: Higher salaries but also higher cost of living
- **Tier-2 cities**: Lower salaries but better work-life balance
- **Remote work**: Negotiate based on company location, not yours

## Handling Different Scenarios

### Multiple Offers
- **Be transparent** about timeline with all companies
- **Use competing offers** as leverage, but don't lie
- **Consider total package**, not just salary
- **Factor in growth opportunities** and company culture

### Internal Promotions
- **Highlight increased responsibilities** you've taken on
- **Show market rates** for the new role
- **Demonstrate readiness** for the next level
- **Be patient** with bureaucratic processes

### Startup vs Corporate
- **Startups**: Higher risk, potentially higher rewards, equity important
- **Corporates**: Stable salary, better benefits, structured growth
- **Consider your risk appetite** and career stage

## Common Mistakes to Avoid

1. **Negotiating too early** in the interview process
2. **Being too aggressive** or demanding
3. **Not considering the complete package**
4. **Comparing with irrelevant benchmarks**
5. **Not having a backup plan** if negotiation fails
6. **Focusing only on money** and ignoring growth opportunities
7. **Not understanding company constraints** and policies

## Sample Scripts

### Initial Response to Offer
"Thank you for the offer. I'm very excited about the opportunity to join [Company]. Could I have 24 hours to review the terms and get back to you?"

### Counter-Offer Presentation
"Based on my research and the value I can bring to this role, I was hoping we could discuss the compensation package. Given my experience in [specific skills] and the market rate for similar positions, I was expecting something in the range of ₹X to ₹Y."

### Salary Review Request
"I'd like to schedule a meeting to discuss my performance and career growth. Over the past year, I've [specific achievements], and I'd like to explore opportunities for advancement."

## Final Tips

- **Timing matters**: Avoid negotiating during company financial stress
- **Be prepared to walk away**: But only if you have alternatives
- **Think long-term**: Sometimes accepting lower salary for better growth is wise
- **Maintain relationships**: You might work with these people again
- **Get everything in writing**: Verbal promises can be forgotten
- **Be grateful**: Acknowledge the opportunity regardless of outcome

Remember, salary negotiation is a skill that improves with practice. Start with smaller negotiations and build your confidence for bigger opportunities.`,
    category: "Career Growth",
    readTime: "12 min read",
    author: "HR Specialist",
    authorId: "1",
    likes: 456,
    date: "2025-01-05",
  },
]

const mockCandidates: Candidate[] = [
  {
    id: "2",
    name: "Rahul Sharma",
    email: "rahul.sharma@iitd.ac.in",
    title: "Software Engineer",
    location: "New Delhi, Delhi",
    experience: "2 years",
    education: "Indian Institute of Technology Delhi",
    skills: ["React", "Node.js", "TypeScript", "Python", "MongoDB"],
    bio: "Passionate computer science student with experience in full-stack development. Love building scalable web applications and exploring new technologies in the Indian tech ecosystem.",
    college: "Indian Institute of Technology Delhi",
    studentId: "2021CS10001",
    department: "Computer Science & Engineering",
    gpa: "8.5",
    projects: [
      {
        name: "E-commerce Platform for Local Businesses",
        description:
          "Built a full-stack e-commerce platform to help local Indian businesses go online using React, Node.js, and MongoDB",
        technologies: ["React", "Node.js", "MongoDB", "Razorpay API"],
        link: "https://github.com/rahulsharma/local-ecommerce",
      },
      {
        name: "Smart City Traffic Management",
        description:
          "Developed a traffic management system using IoT sensors and machine learning for Indian smart cities",
        technologies: ["Python", "TensorFlow", "IoT", "Flask"],
        link: "https://github.com/rahulsharma/traffic-management",
      },
    ],
    achievements: [
      "Dean's List for 3 consecutive semesters",
      "Winner of Smart India Hackathon 2023",
      "Published research paper on AI in Indian agriculture",
      "President of Computer Science Student Association",
    ],
  },
  {
    id: "4",
    name: "Priya Patel",
    email: "priya.patel@iitb.ac.in",
    title: "Electronics Engineer",
    location: "Mumbai, Maharashtra",
    experience: "1 year",
    education: "Indian Institute of Technology Bombay",
    skills: ["VLSI Design", "Embedded Systems", "MATLAB", "Verilog", "PCB Design"],
    bio: "Electronics engineering student passionate about embedded systems and IoT solutions for Indian industries. Interested in developing technology solutions for rural India.",
    college: "Indian Institute of Technology Bombay",
    studentId: "2021EC10015",
    department: "Electronics & Communication",
    gpa: "8.8",
    projects: [
      {
        name: "Smart Agriculture IoT System",
        description:
          "Designed an IoT-based system for monitoring soil conditions and automating irrigation for Indian farmers",
        technologies: ["Arduino", "Sensors", "LoRaWAN", "Mobile App"],
      },
      {
        name: "Low-Cost Medical Device",
        description: "Developed a portable ECG monitoring device for rural healthcare centers in India",
        technologies: ["Embedded C", "PCB Design", "Signal Processing"],
      },
    ],
    achievements: [
      "Gold Medal in Electronics Engineering",
      "Best Project Award at IIT Bombay Tech Fest",
      "Intern at ISRO Satellite Centre",
      "Women in Engineering Scholarship recipient",
    ],
  },
  {
    id: "5",
    name: "Arjun Mehta",
    email: "arjun.mehta@iitd.ac.in",
    title: "Data Scientist",
    location: "New Delhi, Delhi",
    experience: "1.5 years",
    education: "Indian Institute of Technology Delhi",
    skills: ["Python", "Machine Learning", "SQL", "Tableau", "Statistics"],
    bio: "Data science enthusiast with experience in machine learning and statistical analysis. Passionate about using data to solve real-world problems in Indian industries.",
    college: "Indian Institute of Technology Delhi",
    studentId: "2021DS10003",
    department: "Data Science & Engineering",
    gpa: "8.7",
    projects: [
      {
        name: "Stock Market Prediction System",
        description:
          "Built a machine learning model to predict Indian stock market trends using historical data and news sentiment analysis",
        technologies: ["Python", "Scikit-learn", "LSTM", "NLP"],
        link: "https://github.com/arjunmehta/stock-prediction",
      },
      {
        name: "Customer Churn Analysis",
        description: "Developed a predictive model for telecom customer churn analysis for Indian market",
        technologies: ["Python", "Pandas", "Random Forest", "XGBoost"],
      },
    ],
    achievements: [
      "Winner of Data Science Hackathon 2023",
      "Published paper on ML applications in finance",
      "Internship at Flipkart Data Science team",
      "Google Analytics Certified",
    ],
  },
  {
    id: "6",
    name: "Sneha Gupta",
    email: "sneha.gupta@iitb.ac.in",
    title: "Product Manager",
    location: "Mumbai, Maharashtra",
    experience: "2 years",
    education: "Indian Institute of Technology Bombay",
    skills: ["Product Strategy", "Market Research", "Analytics", "Agile", "User Experience"],
    bio: "Product management enthusiast with experience in fintech and e-commerce. Passionate about building products that solve problems for Indian consumers.",
    college: "Indian Institute of Technology Bombay",
    studentId: "2021PM10007",
    department: "Management Studies",
    gpa: "8.9",
    projects: [
      {
        name: "Fintech App for Rural Banking",
        description: "Designed and managed development of a mobile banking app specifically for rural Indian markets",
        technologies: ["Product Strategy", "User Research", "Figma", "Analytics"],
      },
      {
        name: "E-commerce Recommendation Engine",
        description: "Led product development for personalized recommendation system for Indian e-commerce platform",
        technologies: ["Product Management", "A/B Testing", "Data Analysis"],
      },
    ],
    achievements: [
      "Product Manager Intern at Paytm",
      "Winner of Business Case Competition 2023",
      "Certified Scrum Product Owner",
      "Featured speaker at Product Management Conference",
    ],
  },
  {
    id: "7",
    name: "Vikram Singh",
    email: "vikram.singh@iitd.ac.in",
    title: "DevOps Engineer",
    location: "Gurgaon, Haryana",
    experience: "1 year",
    education: "Indian Institute of Technology Delhi",
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Python", "Linux"],
    bio: "DevOps engineer passionate about cloud infrastructure and automation. Experienced in building scalable systems for Indian startups.",
    college: "Indian Institute of Technology Delhi",
    studentId: "2021DO10009",
    department: "Computer Science & Engineering",
    gpa: "8.4",
    projects: [
      {
        name: "Microservices Deployment Platform",
        description: "Built a complete CI/CD pipeline for microservices deployment using Kubernetes and Jenkins",
        technologies: ["Kubernetes", "Docker", "Jenkins", "AWS"],
        link: "https://github.com/vikramsingh/k8s-platform",
      },
      {
        name: "Infrastructure Monitoring System",
        description: "Developed monitoring and alerting system for cloud infrastructure using Prometheus and Grafana",
        technologies: ["Prometheus", "Grafana", "Docker", "Python"],
      },
    ],
    achievements: [
      "AWS Certified Solutions Architect",
      "DevOps Intern at Zomato",
      "Kubernetes Certified Application Developer",
      "Open source contributor to CNCF projects",
    ],
  },
]

const additionalMockJobs: Job[] = [
  // Additional jobs can be added here
]

const additionalMockCandidates: Candidate[] = [
  // Additional candidates can be added here
]

// Utility functions
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const generateId = () => Math.random().toString(36).substr(2, 9)

const hashPassword = (password: string) => `hashed_${password}`

const verifyPassword = (password: string, hash: string) => hash === `hashed_${password}`

export class MockApiClient {
  private token: string | null = null

  constructor() {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      this.token = storedToken; // Initialize instance token

      // Check if current token leads to a valid user.
      // If not, or no token exists, set a default student token.
      const currentUser = this.getCurrentUser();

      if (!currentUser) {
        const defaultUser = mockUsers[1]; // Rahul Sharma
        const newToken = this.generateToken(defaultUser);
        this.token = newToken; // Update instance token
        localStorage.setItem("token", newToken); // newToken is guaranteed string
      }
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token)
    }
  }

  removeToken() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
    }
  }

  private getCurrentUser(): User | null {
    const currentToken = typeof window !== "undefined" ? localStorage.getItem("token") : this.token;
    if (!currentToken) return null;
    try {
      // For mock tokens, extract user ID from the token
      const userId = currentToken.split("-")[2];
      return mockUsers.find((user) => user.id === userId) || null;
    } catch {
      return null;
    }
  }

  private generateToken(user: User): string {
    // Generate a mock token that includes the user ID
    return `mock-token-${user.id}-${Date.now()}`;
  }

  // Auth methods
  async register(userData: {
    email: string
    password: string
    name: string
    role: string
    college: string
    studentId?: string
    department?: string
  }) {
    await delay(1000) // Simulate network delay

    // Check if user already exists
    const existingUser = mockUsers.find((user) => user.email === userData.email)
    if (existingUser) {
      return { error: "User already exists" }
    }

    // Create new user
    const newUser: User = {
      id: generateId(),
      email: userData.email,
      name: userData.name,
      role: userData.role as "student" | "admin",
      college: userData.college,
      studentId: userData.studentId,
      department: userData.department,
    }

    mockUsers.push(newUser)

    const token = this.generateToken(newUser)
    this.setToken(token)

    return {
      data: {
        user: newUser,
        token,
      },
    }
  }

  async login(email: string, password: string) {
    await delay(500); // Simulate network delay

    const user = mockUsers.find((u) => u.email === email);
    if (!user || !verifyPassword(password, hashPassword(password))) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    const token = this.generateToken(user);
    this.setToken(token);

    return {
      success: true,
      data: {
        user,
        token,
      },
    };
  }

  async getMe() {
    await delay(500); // Simulate network delay

    const user = this.getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    return {
      success: true,
      data: {
        user,
      },
    };
  }

  // Dashboard stats methods
  async getDashboardStats() {
    await delay(800)

    const user = this.getCurrentUser()
    if (!user) {
      return { error: "Not authenticated" }
    }

    if (user.role === "admin") {
      const collegeJobs = mockJobs.filter((job) => job.college === user.college)
      const totalApplicants = collegeJobs.reduce((sum, job) => sum + job.applicantCount, 0)

      const stats: DashboardStats["admin"] = {
        totalJobs: collegeJobs.length,
        activeJobs: collegeJobs.filter((job) => job.status === "active").length,
        totalApplicants,
        newApplicationsThisWeek: Math.floor(totalApplicants * 0.3), // 30% are new this week
        candidatesInPipeline: mockCandidates.filter((candidate) => candidate.college === user.college).length,
        interviewsScheduled: Math.floor(totalApplicants * 0.15), // 15% have interviews scheduled
      }

      return {
        data: {
          stats,
        },
      }
    } else {
      const userApplications = mockApplications.filter((app) => app.studentId === user.id)

      const stats: DashboardStats["student"] = {
        jobsApplied: userApplications.length,
        applicationsRejected: userApplications.filter((app) => app.status === "rejected").length,
        interviewsCompleted: userApplications.filter((app) => app.status === "interview_scheduled").length,
        offersReceived: userApplications.filter((app) => app.status === "offer_received").length,
        applicationsPending: userApplications.filter((app) => app.status === "pending").length,
        profileViews: Math.floor(Math.random() * 50) + 20, // Random profile views between 20-70
      }

      return {
        data: {
          stats,
        },
      }
    }
  }

  // Job methods
  async getJobs(
    filters: {
      search?: string
      location?: string
      jobType?: string
      deadline?: string
      page?: number
      limit?: number
    } = {},
  ) {
    await delay(800)

    const user = this.getCurrentUser()
    // For mock API, we will always return jobs. If not authenticated, user-specific data like hasApplied will not be accurate.
    // if (!user) {
    //   return { error: "Not authenticated" }
    // }

    let filteredJobs = [...mockJobs]

    // Apply search filters only if they are provided
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredJobs = filteredJobs.filter(
        (job) => job.title.toLowerCase().includes(searchLower) || job.description.toLowerCase().includes(searchLower),
      )
    }

    if (filters.location) {
      filteredJobs = filteredJobs.filter((job) => job.location.toLowerCase().includes(filters.location!.toLowerCase()))
    }

    if (filters.jobType && filters.jobType !== "all") {
      filteredJobs = filteredJobs.filter((job) => job.jobType === filters.jobType)
    }

    if (filters.deadline) {
      filteredJobs = filteredJobs.filter((job) => new Date(job.deadline) >= new Date(filters.deadline!))
    }

    // Update hasApplied status for student, only if user is authenticated
    if (user?.role === "student") {
      filteredJobs = filteredJobs.map((job) => ({
        ...job,
        hasApplied: mockApplications.some((app) => app.jobId === job.id && app.studentId === user.id),
      }))
    }

    // Pagination
    const page = filters.page || 1
    const limit = filters.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex)

    return {
      data: {
        jobs: paginatedJobs,
        pagination: {
          page,
          limit,
          total: filteredJobs.length,
          totalPages: Math.ceil(filteredJobs.length / limit),
        },
      },
    }
  }

  async createJob(jobData: {
    title: string
    description: string
    location: string
    jobType: string
    salary: string
    salaryPeriod: string
    deadline: string
    requirements: string[]
  }) {
    await delay(1000)

    const user = this.getCurrentUser()
    if (!user || user.role !== "admin") {
      return { error: "Unauthorized" }
    }

    const newJob: Job = {
      id: generateId(),
      ...jobData,
      college: user.college,
      postedBy: user.id,
      status: "active",
      applicantCount: 0,
      hasApplied: false,
      createdAt: new Date().toISOString(),
    }

    mockJobs.unshift(newJob)

    return {
      data: {
        job: newJob,
      },
    }
  }

  async updateJob(id: string, jobData: any) {
    await delay(1000)

    const user = this.getCurrentUser()
    if (!user || user.role !== "admin") {
      return { error: "Unauthorized" }
    }

    const jobIndex = mockJobs.findIndex((job) => job.id === id && job.postedBy === user.id)
    if (jobIndex === -1) {
      return { error: "Job not found" }
    }

    mockJobs[jobIndex] = { ...mockJobs[jobIndex], ...jobData }

    return {
      data: {
        job: mockJobs[jobIndex],
      },
    }
  }

  async deleteJob(id: string) {
    await delay(1000)

    const user = this.getCurrentUser()
    if (!user || user.role !== "admin") {
      return { error: "Unauthorized" }
    }

    const jobIndex = mockJobs.findIndex((job) => job.id === id && job.postedBy === user.id)
    if (jobIndex === -1) {
      return { error: "Job not found" }
    }

    mockJobs.splice(jobIndex, 1)

    return {
      data: {
        message: "Job deleted successfully",
      },
    }
  }

  // Application methods
  async applyToJob(jobId: string) {
    await delay(1000)

    const user = this.getCurrentUser()
    if (!user || user.role !== "student") {
      return { error: "Unauthorized" }
    }

    // Check if job exists and is from student's college
    const job = mockJobs.find((job) => job.id === jobId && job.college === user.college && job.status === "active")
    if (!job) {
      return { error: "Job not found or not available" }
    }

    // Check if already applied
    const existingApplication = mockApplications.find((app) => app.jobId === jobId && app.studentId === user.id)
    if (existingApplication) {
      return { error: "Already applied to this job" }
    }

    // Create application
    const newApplication: Application = {
      id: generateId(),
      jobId,
      studentId: user.id,
      status: "pending",
      appliedAt: new Date().toISOString(),
    }

    mockApplications.push(newApplication)

    // Update job applicant count
    const jobIndex = mockJobs.findIndex((j) => j.id === jobId)
    if (jobIndex !== -1) {
      mockJobs[jobIndex].applicantCount += 1
    }

    return {
      data: {
        application: newApplication,
      },
    }
  }

  async getApplications() {
    await delay(800)

    const user = this.getCurrentUser()
    if (!user || user.role !== "student") {
      return { error: "Unauthorized" }
    }

    const userApplications = mockApplications.filter((app) => app.studentId === user.id)

    const applicationsWithJobs = userApplications.map((app) => {
      const job = mockJobs.find((job) => job.id === app.jobId)
      return {
        ...app,
        job,
      }
    })

    return {
      data: {
        applications: applicationsWithJobs,
      },
    }
  }

  // Article methods
  async getArticles() {
    await delay(800)
    return {
      data: {
        articles: mockArticles,
      },
    }
  }

  async getArticle(id: string) {
    await delay(500)
    const article = mockArticles.find((article) => article.id === id)
    if (!article) {
      return { error: "Article not found" }
    }
    return {
      data: {
        article,
      },
    }
  }

  async createArticle(articleData: {
    title: string
    excerpt: string
    content: string
    category: string
    readTime: string
  }) {
    await delay(1000)

    const user = this.getCurrentUser()
    if (!user || user.role !== "admin") {
      return { error: "Unauthorized" }
    }

    const newArticle: Article = {
      id: generateId(),
      ...articleData,
      author: user.name,
      authorId: user.id,
      likes: 0,
      date: new Date().toISOString().split("T")[0],
    }

    mockArticles.unshift(newArticle)

    return {
      data: {
        article: newArticle,
      },
    }
  }

  // Candidate methods
  async getCandidates(
    filters: {
      search?: string
      location?: string
      role?: string
    } = {},
  ) {
    await delay(800)

    const user = this.getCurrentUser()
    // For mock API, we will always return candidates. If not authenticated, user-specific data will not be accurate.
    // if (!user || user.role !== "admin") {
    //   return { error: "Unauthorized" }
    // }

    // Changed to always start with all mock candidates
    let filteredCandidates = [...mockCandidates];

    // Apply search filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredCandidates = filteredCandidates.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(searchLower) ||
          candidate.title.toLowerCase().includes(searchLower) ||
          candidate.skills.some((skill) => skill.toLowerCase().includes(searchLower)),
      )
    }

    if (filters.location) {
      filteredCandidates = filteredCandidates.filter((candidate) =>
        candidate.location.toLowerCase().includes(filters.location!.toLowerCase()),
      )
    }

    if (filters.role) {
      filteredCandidates = filteredCandidates.filter((candidate) =>
        candidate.title.toLowerCase().includes(filters.role!.toLowerCase()),
      )
    }

    return {
      data: {
        candidates: filteredCandidates,
      },
    }
  }

  async getCandidate(id: string) {
    await delay(500)

    const user = this.getCurrentUser()
    // Remove the admin role check temporarily for testing
    // if (!user || user.role !== "admin") {
    //   return { error: "Unauthorized" }
    // }

    const candidate = mockCandidates.find((candidate) => candidate.id === id)
    if (!candidate) {
      return { error: "Candidate not found" }
    }

    // Add mock recent applications
    const candidateWithApplications = {
      ...candidate,
      recentApplications: [
        {
          company: "Tech Corp",
          position: "Software Engineer",
          status: "Interview Scheduled"
        },
        {
          company: "StartupX",
          position: "Full Stack Developer",
          status: "Under Review"
        }
      ]
    }

    return {
      data: {
        candidate: candidateWithApplications
      }
    }
  }

  async getJobApplications(jobId: string) {
    await delay(800)

    const user = this.getCurrentUser()
    if (!user || user.role !== "admin") {
      return { error: "Unauthorized" }
    }

    const jobApplications = mockApplications.filter((app) => app.jobId === jobId)

    const applicationsWithCandidates = jobApplications.map((app) => {
      const candidate = mockCandidates.find((c) => c.id === app.studentId)
      return {
        ...app,
        candidate,
      }
    })

    return {
      data: {
        applications: applicationsWithCandidates,
      },
    }
  }
}

// Merge additional data with existing data
mockJobs.push(...additionalMockJobs)
mockCandidates.push(...additionalMockCandidates)

// Add more applications
const additionalApplications: Application[] = [
  {
    id: "7",
    jobId: "7",
    studentId: "5",
    status: "pending",
    appliedAt: "2025-01-25T10:00:00Z",
  },
  {
    id: "8",
    jobId: "8",
    studentId: "6",
    status: "interview_scheduled",
    appliedAt: "2025-01-24T10:00:00Z",
  },
  {
    id: "9",
    jobId: "9",
    studentId: "7",
    status: "pending",
    appliedAt: "2025-01-23T10:00:00Z",
  },
  {
    id: "10",
    jobId: "10",
    studentId: "5",
    status: "offer_received",
    appliedAt: "2025-01-22T10:00:00Z",
  },
]

mockApplications.push(...additionalApplications)

export const mockApiClient = new MockApiClient()
