import { jsPDF } from 'jspdf';

export function createResumePDF(): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 36; // 0.5 inch margins
  const contentWidth = pageWidth - margin * 2;
  let y = 38;

  // --- HEADER ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(0, 0, 0);
  doc.text('SHEEMA', pageWidth / 2, y, { align: 'center' });
  y += 16;

  doc.setFontSize(10.5);
  doc.setTextColor(20, 20, 20);
  doc.text('MCA Postgraduate | Aspiring Java & Python Full-Stack Developer', pageWidth / 2, y, { align: 'center' });
  y += 14;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(60, 60, 60);
  doc.text('Hyderabad, Telangana, India  |  +91 9391621778  |  Sheema.mca26@gmail.com  |  github.com/sheemamca26', pageWidth / 2, y, { align: 'center' });
  y += 9;

  // Header Divider
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(1.4);
  doc.line(margin, y, pageWidth - margin, y);
  y += 15;

  // Helper for Section Headers
  const addSectionHeader = (title: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(0, 0, 0);
    doc.text(title, margin, y);
    y += 3;
    doc.setDrawColor(50, 50, 50);
    doc.setLineWidth(0.6);
    doc.line(margin, y, pageWidth - margin, y);
    y += 11;
  };

  // --- 1. PROFESSIONAL SUMMARY ---
  addSectionHeader('PROFESSIONAL SUMMARY');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(30, 30, 30);
  const summaryText =
    'Motivated MCA postgraduate and aspiring software developer with a strong foundation in computer science fundamentals, Object-Oriented Programming (OOP), and Database Management Systems (DBMS). Successfully built and evaluated a machine learning classification project in Python using Scikit-learn and Pandas. Practical hands-on experience building foundational Java (Spring Boot) and Python web applications with MySQL databases. Passionate about continuous learning, clean programming practices, and contributing effectively to an entry-level development team.';
  const sumLines = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(sumLines, margin, y);
  y += sumLines.length * 10.5 + 7;

  // --- 2. TECHNICAL SKILLS ---
  addSectionHeader('TECHNICAL SKILLS');
  const skills: [string, string][] = [
    ['Programming Languages:', 'Java, Python, JavaScript (ES6+)'],
    ['Backend Development:', 'Java, Spring Boot & Microservices, Python, CRUD Operations'],
    ['Frontend Development:', 'HTML, CSS, JavaScript, React.js'],
    ['Database & Storage:', 'MySQL, SQL'],
    ['Core CS Fundamentals:', 'Object-Oriented Programming (OOP), Data Structures & Algorithms (DSA), DBMS'],
    ['Developer Tools & Cloud:', 'Git, GitHub, VS Code, AWS Basics'],
    ['Machine Learning / Data:', 'Pandas, Scikit-learn, Matplotlib, Decision Tree Classifier'],
  ];

  skills.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(0, 0, 0);
    doc.text(label, margin, y);
    const labelWidth = doc.getTextWidth(label);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 30, 30);
    doc.text(' ' + value, margin + labelWidth, y);
    y += 11.2;
  });
  y += 5;

  // --- 3. PROJECTS ---
  addSectionHeader('PROJECTS');
  const projects = [
    {
      title: 'Diabetes Prediction Using Machine Learning',
      category: 'Python Machine Learning Project',
      tech: 'Python, Pandas, Scikit-learn, Matplotlib, Decision Tree Classifier',
      bullets: [
        'Implemented a machine-learning classification project in Python to predict diabetic classification based on 8 diagnostic health attributes from diabetes.csv.',
        'Loaded and prepared dataset with Pandas, separating input features from the Outcome target variable and splitting into 70% training and 30% testing partitions (random_state=42).',
        'Trained and evaluated a Decision Tree Classifier (max_depth=5, random_state=42), measuring predictive performance with accuracy score metrics.',
        'Visualized the trained Decision Tree using Matplotlib and built an interactive console-based input section for manual patient feature classification.',
      ],
    },
    {
      title: 'Employee & Leave Management System',
      category: 'Java Full-Stack Project',
      tech: 'Java, Spring Boot, HTML, CSS, JavaScript, MySQL / SQL',
      bullets: [
        'Developed a Java full-stack web application to manage employee information and streamline leave-related records within an organization.',
        'Engineered the backend with Java and Spring Boot to implement fundamental CRUD operations and manage database interactions using MySQL and SQL.',
        'Designed clean frontend interfaces with HTML, CSS, and JavaScript, focusing on practical end-to-end integration between user inputs, server logic, and database storage.',
      ],
    },
    {
      title: 'E-Commerce Web Application',
      category: 'Python Full-Stack Project',
      tech: 'Python, HTML, CSS, JavaScript, MySQL / SQL',
      bullets: [
        'Developed a Python full-stack e-commerce web application to implement online shopping architecture and core workflows.',
        'Implemented product catalog browsing views and basic database interactions using Python and MySQL/SQL for structured data persistence.',
        'Created responsive frontend interfaces using HTML, CSS, and JavaScript while practicing API concepts and full-stack integration from UI to database.',
      ],
    },
  ];

  projects.forEach((proj) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.8);
    doc.setTextColor(0, 0, 0);
    doc.text(proj.title, margin, y);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(70, 70, 70);
    doc.text(proj.category, pageWidth - margin, y, { align: 'right' });
    y += 10.5;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(0, 0, 0);
    doc.text('Technologies: ', margin, y);
    const techWidth = doc.getTextWidth('Technologies: ');
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 40, 40);
    doc.text(proj.tech, margin + techWidth, y);
    y += 10;

    proj.bullets.forEach((bullet) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.8);
      doc.setTextColor(30, 30, 30);
      const bulletLines = doc.splitTextToSize('•  ' + bullet, contentWidth - 8);
      doc.text(bulletLines, margin + 6, y);
      y += bulletLines.length * 9.5;
    });
    y += 4;
  });

  // --- 4. EDUCATION ---
  addSectionHeader('EDUCATION');
  const eduList = [
    {
      degree: 'Master of Computer Applications (MCA)',
      score: 'Score: 7.72 CGPA',
      college: "Veeranari Chakali Ilamma Women's University",
      year: 'Graduated: 2024',
    },
    {
      degree: 'Bachelor of Science (B.Sc - MSCs)',
      score: 'Score: 9.07 CGPA',
      college: "New Siddhartha Women's College",
      year: 'Graduated: 2022',
    },
    {
      degree: 'Intermediate (MEC)',
      score: 'Score: 6.7 CGPA',
      college: 'New Chaitanya Junior College',
      year: 'Graduated: 2018',
    },
    {
      degree: 'Secondary School Certificate (SSC)',
      score: 'Score: 7.8 CGPA',
      college: 'St Pius X High School',
      year: 'Graduated: 2016',
    },
  ];

  eduList.forEach((edu) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(0, 0, 0);
    doc.text(edu.degree, margin, y);
    doc.text(edu.score, pageWidth - margin, y, { align: 'right' });
    y += 9.5;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.8);
    doc.setTextColor(60, 60, 60);
    doc.text(edu.college, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 40, 40);
    doc.text(edu.year, pageWidth - margin, y, { align: 'right' });
    y += 10.5;
  });
  y += 3;

  // --- 5. CERTIFICATIONS ---
  addSectionHeader('CERTIFICATIONS');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(0, 0, 0);
  doc.text('• Full Stack Java Developer Course – NareshIT', margin + 6, y);
  y += 14;

  return doc;
}

/**
 * Downloads the resume PDF using multiple resilient download techniques:
 * 1. Blob URL with synthetic click
 * 2. Fallback to doc.save()
 * 3. Returns the blob URL so caller can open in new tab if needed
 */
export function downloadResumePDF(): string {
  const doc = createResumePDF();
  const pdfBlob = doc.output('blob');
  const blobUrl = URL.createObjectURL(pdfBlob);

  try {
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'SHEEMA_Resume.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 1500);
  } catch (err) {
    console.warn('Anchor download triggered fallback:', err);
    doc.save('SHEEMA_Resume.pdf');
  }

  return blobUrl;
}
