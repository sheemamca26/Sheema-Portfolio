import { Project, SkillProgress, BeyondWorkItem } from '../types';

export const personalInfo = {
  name: 'SHEEMA',
  role: 'MCA Postgraduate | Aspiring Java & Python Full-Stack Developer',
  tagline: 'MCA Postgraduate | Aspiring Java & Python Full-Stack Developer',
  shortBio: 'Motivated MCA postgraduate with strong foundational knowledge in Java, Python, SQL, web development, and machine learning. Focused on practical project-based learning and continuous skill development.',
  fullBio: 'Motivated MCA postgraduate seeking entry-level opportunities as a Java Developer, Java Full-Stack Developer, Python Developer, Python Full-Stack Developer, Software Developer, or Full-Stack Developer. Committed to disciplined engineering through hands-on project building and core computer science fundamentals.',
  location: 'Hyderabad, Telangana, India',
  city: 'Hyderabad',
  email: 'sheema.mca26@gmail.com',
  phone: '+91 9391621778',
  primaryPhone: '+91 9391621778',
  secondaryPhone: '+91 7013431104',
  avatar: 'https://img.magnific.com/premium-vector/caucasian-female-software-developer-her-40s-debugging-program_1238364-89122.jpg?semt=ais_hybrid&w=740&q=80',
  github: 'https://github.com/sheemamca26',
  linkedin: 'https://www.linkedin.com/in/sheema-2601mca/',
  availableForWork: true,
  yearsExperience: 'Fresher (MCA Postgraduate)',
  completedProjects: '3 Projects',
  performanceScore: 'Ready to Work',
  satisfactionRate: '100%',
};

export const circularSkills: SkillProgress[] = [
  { name: 'Java', percentage: 50, category: 'Backend & OOP' },
  { name: 'SpringBoot & Microservices', percentage: 50, category: 'Enterprise Backend' },
  { name: 'Python', percentage: 50, category: 'Backend & Scripting' },
  { name: 'ReactJs', percentage: 50, category: 'Frontend Library' },
  { name: 'HTML/CSS', percentage: 50, category: 'Web Fundamentals' },
  { name: 'Oracle', percentage: 50, category: 'Database & SQL' },
];

export const projectsData: Project[] = [
  {
    id: 'employee-leave-management-system',
    title: 'Employee & Leave Management System',
    category: 'java-fullstack',
    categoryLabel: 'Java Full-Stack Project',
    tag: 'Java Full-Stack',
    purpose: 'A full-stack web application designed to manage employee information and leave-related activities within an organization.',
    description: 'A Java full-stack project built to understand and implement end-to-end web workflows connecting frontend interfaces, backend services, and relational databases.',
    longDescription: 'A Java full-stack project built to understand and implement end-to-end web workflows connecting frontend interfaces, backend services, and relational databases. Manages employee records, handles leave requests and status tracking, and performs database CRUD operations.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=900&auto=format&fit=crop',
    tags: ['Java', 'Spring Boot', 'HTML', 'CSS', 'JavaScript', 'MySQL / SQL'],
    plannedTechStack: ['Java', 'Spring Boot', 'HTML', 'CSS', 'JavaScript', 'MySQL / SQL'],
    learningFocus: [
      'Java programming',
      'Object-Oriented Programming',
      'Backend development',
      'Spring Boot',
      'Database interaction',
      'SQL',
      'CRUD operations',
      'Frontend and backend integration',
      'Full-stack application development',
    ],
    features: [
      'Managing employee information within an organization',
      'Handling leave-related activities and basic tracking',
      'Database interaction and basic SQL CRUD operations',
      'Understanding frontend-to-backend communication flow',
    ],
    skillsDemonstrated: 'Java, Object-Oriented Programming, Spring Boot, MySQL/SQL, CRUD operations, and full-stack integration concepts.',
    githubUrl: 'https://github.com/sheemamca26/Employee-Leave-Management-System',
  },
  {
    id: 'ecommerce-web-application',
    title: 'E-Commerce Web Application',
    category: 'python-fullstack',
    categoryLabel: 'Python Full-Stack Project',
    tag: 'Python Full-Stack',
    purpose: 'An e-commerce web application designed to understand online shopping architecture, product catalogs, and backend data flows.',
    description: 'An online shopping application focused on building responsive web interfaces, Python backend business logic, and MySQL database interactions.',
    longDescription: 'An online shopping application focused on building responsive web interfaces, Python backend business logic, and MySQL database interactions. Demonstrates product browsing, database CRUD operations, and frontend-to-backend API communication.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=900&auto=format&fit=crop',
    tags: ['Python', 'HTML', 'CSS', 'JavaScript', 'MySQL / SQL'],
    plannedTechStack: ['Python', 'HTML', 'CSS', 'JavaScript', 'MySQL / SQL'],
    learningFocus: [
      'Python programming',
      'Full-stack web development',
      'Backend development',
      'Frontend development',
      'Database interaction',
      'CRUD operations',
      'API concepts',
      'Frontend-backend integration',
    ],
    features: [
      'Basic web-based online shopping structure',
      'Frontend interface built with HTML, CSS, and JavaScript',
      'Backend application logic written in Python',
      'Database interaction and basic CRUD operations with MySQL / SQL',
      'Foundational API concepts and frontend-backend integration practice',
    ],
    skillsDemonstrated: 'Python programming, full-stack web development, frontend/backend development, CRUD operations, and database interaction.',
    githubUrl: 'https://github.com/sheemamca26/E-Commerce-Web-Application',
  },
  {
    id: 'diabetes-prediction-machine-learning',
    title: 'Diabetes Prediction Using Machine Learning',
    category: 'machine-learning',
    categoryLabel: 'Python Machine Learning Project',
    tag: 'Machine Learning',
    purpose: 'A machine-learning prediction/classification project that classifies patient data as Diabetic or Not Diabetic based on health input features from the diabetes.csv dataset.',
    description: 'A machine learning classification project that classifies patient data as Diabetic or Not Diabetic based on 8 health features from the diabetes.csv dataset using a Decision Tree Classifier.',
    longDescription: 'A machine learning classification project that classifies patient data as Diabetic or Not Diabetic based on 8 health features from the diabetes.csv dataset using a Decision Tree Classifier. Features model evaluation using accuracy score, visualization using Matplotlib, and an interactive console-based input section where patient details can be entered manually for classification.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=900&auto=format&fit=crop',
    tags: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Decision Tree Classifier'],
    learningFocus: [
      'Machine learning classification workflow',
      'Dataset loading and feature separation with Pandas',
      '70/30 train-test data split (random_state = 42)',
      'Decision Tree Classifier training (max_depth = 5, random_state = 42)',
      'Model evaluation using accuracy score',
      'Decision Tree visualization using Matplotlib',
      'Interactive console-based patient prediction',
    ],
    features: [
      'Loaded the diabetes dataset using Pandas',
      'Separated input features from the Outcome target',
      'Split the dataset into training (70%) and testing (30%) data (random_state = 42)',
      'Created and trained a Decision Tree Classifier (max_depth = 5, random_state = 42)',
      'Generated predictions for training and testing data',
      'Evaluated the model using accuracy score',
      'Visualized the trained Decision Tree using Matplotlib',
      'Interactive console-based input section where patient details can be entered manually to predict Diabetic or Not Diabetic',
    ],
    skillsDemonstrated: 'Python, Pandas, Scikit-learn, Matplotlib, Decision Tree Classifier, and classification model evaluation.',
    datasetInfo: {
      dataset: 'diabetes.csv',
      target: 'Outcome',
      inputFeatures: [
        'Pregnancies',
        'Glucose',
        'Blood Pressure',
        'Skin Thickness',
        'Insulin',
        'BMI',
        'Diabetes Pedigree Function',
        'Age',
      ],
      model: 'Decision Tree Classifier',
      config: 'max_depth = 5, random_state = 42',
      dataSplit: '70% Training / 30% Testing (random_state = 42)',
    },
    githubUrl: 'https://github.com/sheemamca26/Diabetes-Prediction-using-Decision-Tree',
  },
];

export const beyondWorkData: BeyondWorkItem[] = [
  {
    id: 'java-fullstack-cert',
    title: 'Full Stack Java Developer Certification',
    category: 'Certified Training',
    description: 'Course Completion Certificate in Full Stack Java Developer from Naresh i Technologies (ISO 9001:2015 Certified), covering Core Java, OOP, Spring Boot, REST APIs, and Oracle SQL.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
    impact: 'Naresh i Technologies • May 2025 – Oct 2025',
    iconName: 'Award',
    certificateDetails: {
      courseName: 'Full Stack Java Developer',
      institute: 'NARESH i technologies',
      certificationType: 'Course Completion Certificate',
      period: 'May 2025 to October-2025',
      studentName: 'Sheema',
      address: 'H.O.: D.No. 201-204, Durga Bhavani Plaza, Ameerpet, Hyd - 16',
      isoCertification: 'An ISO 9001:2015 Certified Company',
    },
  },
  {
    id: 'problem-solving',
    title: 'Data Structures & Algorithms',
    category: 'Continuous Learning',
    description: 'Practicing foundational data structures, algorithmic complexity, OOP design principles in Java & Python, and problem-solving patterns on coding platforms.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    impact: 'Java & Python Problem Solving',
    iconName: 'Sparkles',
  },
  {
    id: 'tech-notes',
    title: 'Java & Python Full-Stack Study Notes',
    category: 'Documentation & Reference',
    description: 'Maintaining comprehensive reference cheat sheets and architecture notes covering Core Java OOP, Spring Boot annotations, Python scripts, RESTful API design, Oracle SQL queries, and Git version control.',
    image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=800&auto=format&fit=crop',
    impact: 'Fresher Knowledge Base',
    iconName: 'BookOpen',
  },
];

export interface EducationEntry {
  degree: string;
  institution: string;
  score: string;
  year: string;
  description: string;
}

export const educationList: EducationEntry[] = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: "Veeranari Chakali Ilamma Women's University",
    score: '7.72 CGPA',
    year: '2024',
    description: 'Postgraduate qualification focused on Computer Science, Advanced Programming, Object-Oriented Programming (OOP), Database Systems (DBMS), and Software Engineering principles.'
  },
  {
    degree: 'Bachelor of Science (B.Sc - MSCs)',
    institution: "New Siddhartha Women's College",
    score: '9.07 CGPA',
    year: '2022',
    description: 'Mathematics, Statistics, and Computer Science fundamentals with high academic distinction.'
  },
  {
    degree: 'Intermediate (MEC)',
    institution: "New Chaitanya Junior College",
    score: '6.7 CGPA',
    year: '2018',
    description: 'Mathematics, Economics, and Commerce.'
  },
  {
    degree: 'Secondary School Certificate (SSC)',
    institution: "St Pius X High School",
    score: '7.8 CGPA',
    year: '2016',
    description: 'High School General Studies and foundational science & mathematics.'
  },
];
