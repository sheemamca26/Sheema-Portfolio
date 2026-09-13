import React, { useState } from 'react';
import { X, Printer, Download, Check, Eye, ExternalLink, Award, FileText } from 'lucide-react';
import { downloadResumePDF, createResumePDF } from '../utils/generateResumePdf';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCertificate?: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose, onOpenCertificate }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownload = () => {
    try {
      const url = downloadResumePDF();
      setPdfUrl(url);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    } catch (err) {
      console.error('Download error:', err);
      // Fallback
      window.print();
    }
  };

  const handleOpenInNewTab = () => {
    try {
      const doc = createResumePDF();
      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (err) {
      console.error('Open PDF error:', err);
      window.print();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl h-[94vh] max-h-[960px] bg-[#1a1b1e] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 bg-[#131417] border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="text-xs sm:text-sm font-bold text-white truncate font-mono flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#ff007a]" />
              SHEEMA_Resume.pdf
            </span>
            <span className="hidden sm:inline-flex text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono shrink-0">
              MCA Postgraduate
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Primary Direct Download PDF Button */}
            <button
              onClick={handleDownload}
              id="btn-download-pdf-resume"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-lg bg-[#ff007a] hover:bg-[#e0006c] text-white text-xs font-semibold shadow-md shadow-[#ff007a]/25 transition-all cursor-pointer"
              title="Download Resume as PDF file directly"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                  <span>Downloaded PDF</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            {/* Open in New Tab Button (Guaranteed to bypass iframe sandbox restrictions) */}
            <button
              onClick={handleOpenInNewTab}
              id="btn-open-pdf-tab"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-medium transition-colors cursor-pointer"
              title="Open PDF in a new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open PDF</span>
            </button>

            {/* Print / Save PDF Button */}
            <button
              onClick={handlePrint}
              id="btn-print-resume"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-medium transition-colors cursor-pointer"
              title="Print or Save via browser printer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Print</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              id="btn-close-resume-modal"
              className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer ml-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Canvas - Pure Neutral Gray reader backdrop */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-8 bg-[#28292d] flex justify-center items-start">
          
          {/* ATS 1-Page Resume Paper: Pure White Background, 100% Black Text, No Overlap */}
          <div
            id="printable-resume"
            className="w-full max-w-[794px] bg-white text-black p-6 sm:p-10 md:p-12 shadow-2xl font-sans text-xs sm:text-[13px] leading-relaxed selection:bg-yellow-200 selection:text-black rounded-sm border border-neutral-300"
            style={{
              boxSizing: 'border-box',
              backgroundColor: '#ffffff',
              color: '#000000',
            }}
          >
            {/* Header */}
            <div className="text-center pb-2.5 border-b-2 border-black mb-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-black mb-1 uppercase font-sans">
                SHEEMA
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-black tracking-wide mb-1.5">
                MCA Postgraduate | Aspiring Java & Python Full-Stack Developer
              </p>
              <p className="text-[11px] sm:text-xs text-neutral-800 tracking-normal flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5">
                <span>Hyderabad, Telangana, India</span>
                <span className="text-neutral-500">|</span>
                <a href="tel:+919391621778" className="hover:underline text-black font-medium">
                  +91 9391621778
                </a>
                <span className="text-neutral-500">|</span>
                <a href="mailto:Sheema.mca26@gmail.com" className="hover:underline text-black font-medium">
                  Sheema.mca26@gmail.com
                </a>
                <span className="text-neutral-500">|</span>
                <a
                  href="https://github.com/sheemamca26"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-700 font-medium"
                >
                  github.com/sheemamca26
                </a>
              </p>
            </div>

            {/* Professional Summary */}
            <div className="mb-3.5">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-neutral-900 text-justify leading-relaxed text-[11px] sm:text-xs">
                Motivated MCA postgraduate and aspiring software developer with a strong foundation in computer science fundamentals, Object-Oriented Programming (OOP), and Database Management Systems (DBMS). Successfully built and evaluated a machine learning classification project in Python using Scikit-learn and Pandas. Practical hands-on experience building foundational Java (Spring Boot) and Python web applications with MySQL databases. Passionate about continuous learning, clean programming practices, and contributing effectively to an entry-level development team.
              </p>
            </div>

            {/* Technical Skills */}
            <div className="mb-3.5">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
                TECHNICAL SKILLS
              </h2>
              <div className="space-y-1 text-neutral-900 leading-snug text-[11px] sm:text-xs">
                <div>
                  <strong className="font-semibold text-black">Programming Languages:</strong> Java, Python, JavaScript (ES6+)
                </div>
                <div>
                  <strong className="font-semibold text-black">Backend Development:</strong> Java, Spring Boot & Microservices, Python, CRUD Operations
                </div>
                <div>
                  <strong className="font-semibold text-black">Frontend Development:</strong> HTML, CSS, JavaScript, React.js
                </div>
                <div>
                  <strong className="font-semibold text-black">Database & Storage:</strong> MySQL, SQL
                </div>
                <div>
                  <strong className="font-semibold text-black">Core CS Fundamentals:</strong> Object-Oriented Programming (OOP), Data Structures & Algorithms (DSA), DBMS
                </div>
                <div>
                  <strong className="font-semibold text-black">Developer Tools & Cloud:</strong> Git, GitHub, VS Code, AWS Basics
                </div>
                <div>
                  <strong className="font-semibold text-black">Machine Learning / Data:</strong> Pandas, Scikit-learn, Matplotlib, Decision Tree Classifier
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="mb-3.5">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
                PROJECTS
              </h2>

              <div className="space-y-3">
                {/* Project 1: Diabetes Prediction */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="font-bold text-black text-xs sm:text-[13px]">
                      Diabetes Prediction Using Machine Learning
                    </h3>
                    <span className="text-neutral-700 italic text-[11px] sm:text-xs">
                      Python Machine Learning Project
                    </span>
                  </div>
                  <div className="text-neutral-800 text-[11px] sm:text-xs mb-1">
                    <strong className="font-semibold text-black">Technologies:</strong> Python, Pandas, Scikit-learn, Matplotlib, Decision Tree Classifier
                  </div>
                  <ul className="list-disc ml-5 space-y-0.5 text-neutral-900 leading-relaxed text-[11px] sm:text-xs">
                    <li>Implemented a machine-learning classification project in Python to predict diabetic classification based on 8 diagnostic health attributes from diabetes.csv.</li>
                    <li>Loaded and prepared dataset with Pandas, separating input features from the Outcome target variable and splitting into 70% training and 30% testing partitions (random_state=42).</li>
                    <li>Trained and evaluated a Decision Tree Classifier (max_depth=5, random_state=42), measuring predictive performance with accuracy score metrics.</li>
                    <li>Visualized the trained Decision Tree using Matplotlib and built an interactive console-based input section for manual patient feature classification.</li>
                  </ul>
                </div>

                {/* Project 2: Employee & Leave Management System */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="font-bold text-black text-xs sm:text-[13px]">
                      Employee & Leave Management System
                    </h3>
                    <span className="text-neutral-700 italic text-[11px] sm:text-xs">
                      Java Full-Stack Project
                    </span>
                  </div>
                  <div className="text-neutral-800 text-[11px] sm:text-xs mb-1">
                    <strong className="font-semibold text-black">Technologies:</strong> Java, Spring Boot, HTML, CSS, JavaScript, MySQL / SQL
                  </div>
                  <ul className="list-disc ml-5 space-y-0.5 text-neutral-900 leading-relaxed text-[11px] sm:text-xs">
                    <li>Developed a Java full-stack web application to manage employee information and streamline leave-related records within an organization.</li>
                    <li>Engineered the backend with Java and Spring Boot to implement fundamental CRUD operations and manage database interactions using MySQL and SQL.</li>
                    <li>Designed clean frontend interfaces with HTML, CSS, and JavaScript, focusing on practical end-to-end integration between user inputs, server logic, and database storage.</li>
                  </ul>
                </div>

                {/* Project 3: E-Commerce Web Application */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="font-bold text-black text-xs sm:text-[13px]">
                      E-Commerce Web Application
                    </h3>
                    <span className="text-neutral-700 italic text-[11px] sm:text-xs">
                      Python Full-Stack Project
                    </span>
                  </div>
                  <div className="text-neutral-800 text-[11px] sm:text-xs mb-1">
                    <strong className="font-semibold text-black">Technologies:</strong> Python, HTML, CSS, JavaScript, MySQL / SQL
                  </div>
                  <ul className="list-disc ml-5 space-y-0.5 text-neutral-900 leading-relaxed text-[11px] sm:text-xs">
                    <li>Developed a Python full-stack e-commerce web application to implement online shopping architecture and core workflows.</li>
                    <li>Implemented product catalog browsing views and basic database interactions using Python and MySQL/SQL for structured data persistence.</li>
                    <li>Created responsive frontend interfaces using HTML, CSS, and JavaScript while practicing API concepts and full-stack integration from UI to database.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mb-3.5">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
                EDUCATION
              </h2>

              <div className="space-y-2 text-[11px] sm:text-xs">
                <div>
                  <div className="flex justify-between items-baseline">
                    <strong className="font-bold text-black">Master of Computer Applications (MCA)</strong>
                    <span className="font-bold text-black">Score: 7.72 CGPA</span>
                  </div>
                  <div className="flex justify-between items-baseline text-neutral-800">
                    <span className="italic">Veeranari Chakali Ilamma Women's University</span>
                    <span>Graduated: 2024</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-baseline">
                    <strong className="font-bold text-black">Bachelor of Science (B.Sc - MSCs)</strong>
                    <span className="font-bold text-black">Score: 9.07 CGPA</span>
                  </div>
                  <div className="flex justify-between items-baseline text-neutral-800">
                    <span className="italic">New Siddhartha Women's College</span>
                    <span>Graduated: 2022</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-baseline">
                    <strong className="font-bold text-black">Intermediate (MEC)</strong>
                    <span className="font-bold text-black">Score: 6.7 CGPA</span>
                  </div>
                  <div className="flex justify-between items-baseline text-neutral-800">
                    <span className="italic">New Chaitanya Junior College</span>
                    <span>Graduated: 2018</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-baseline">
                    <strong className="font-bold text-black">Secondary School Certificate (SSC)</strong>
                    <span className="font-bold text-black">Score: 7.8 CGPA</span>
                  </div>
                  <div className="flex justify-between items-baseline text-neutral-800">
                    <span className="italic">St Pius X High School</span>
                    <span>Graduated: 2016</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications with Interactive Icon beside certificate for viewing */}
            <div className="pb-4">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
                CERTIFICATIONS
              </h2>
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs">
                <div className="flex items-center gap-1.5 text-neutral-900">
                  <span className="font-bold text-black">•</span>
                  <strong className="font-bold text-black">
                    Full Stack Java Developer Course – NareshIT
                  </strong>
                </div>

                {/* Interactive icon beside certificate to view certificate */}
                {onOpenCertificate && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenCertificate();
                    }}
                    id="btn-view-certificate-from-resume"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-sans font-semibold text-[11px] shadow-xs hover:shadow transition-all cursor-pointer group"
                    title="Click icon to view Full Stack Java Developer Certificate"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-600 group-hover:scale-110 transition-transform" />
                    <span>View Certificate</span>
                    <Eye className="w-3 h-3 text-amber-600 ml-0.5" />
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Modal Bottom Status Bar */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#131417] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
          <span className="text-[11px] sm:text-xs text-gray-400 font-mono">
            Official 1-page ATS format • Downloads as <span className="text-white font-semibold">SHEEMA_Resume.pdf</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#ff007a] hover:bg-[#e0006c] text-white text-xs font-semibold cursor-pointer"
            >
              <Download className="w-3 h-3" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={handleOpenInNewTab}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-white/10 hover:bg-white/15 text-white text-xs font-semibold cursor-pointer"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Open PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/15 text-white text-xs font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
