import { JobModel } from "./job.model";

const jobsList: JobModel[] = [
  {
    id: "job-1a2b3c",
    title: "Software Engineer",
    company: "Tech Corp",
    shortDescription: "Develop and maintain software applications.",
    fullDescription: "This is a full description for Software Engineer. It includes detailed information about the job responsibilities, qualifications, and other relevant details.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "Experience with JavaScript and React",
      "Strong problem-solving skills"
    ]
  },
  {
    id: "job-4d5e6f",
    title: "Data Scientist",
    company: "Data Inc",
    shortDescription: "Analyze and interpret complex data sets.",
    fullDescription: "This is a full description for Data Scientist. It includes detailed information about the job responsibilities, qualifications, and other relevant details.",
    requirements: [
      "Bachelor's degree in Data Science or related field",
      "Experience with Python and R",
      "Strong analytical skills"
    ]
  },
  {
    id: "job-7g8h9i",
    title: "Product Manager",
    company: "Innovate LLC",
    shortDescription: "Oversee product development from ideation to launch.",
    fullDescription: "This is a full description for Product Manager. It includes detailed information about the job responsibilities, qualifications, and other relevant details.",
    requirements: [
      "Bachelor's degree in Business or related field",
      "Experience with product management",
      "Strong leadership skills"
    ]
  },
  {
    id: "job-0j1k2l",
    title: "UX Designer",
    company: "Design Studio",
    shortDescription: "Create user-friendly interfaces and experiences.",
    fullDescription: "This is a full description for UX Designer. It includes detailed information about the job responsibilities, qualifications, and other relevant details.",
    requirements: [
      "Bachelor's degree in Design or related field",
      "Experience with UX design",
      "Strong creativity skills"
    ]
  },
  {
    id: "job-3m4n5o",
    title: "DevOps Engineer",
    company: "Cloud Solutions",
    shortDescription: "Manage and automate cloud infrastructure.",
    fullDescription: "This is a full description for DevOps Engineer. It includes detailed information about the job responsibilities, qualifications, and other relevant details.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "Experience with cloud platforms",
      "Strong automation skills"
    ]
  },
  {
    id: "job-6p7q8r",
    title: "Marketing Specialist",
    company: "Market Leaders",
    shortDescription: "Develop and execute marketing strategies.",
    fullDescription: "This is a full description for Marketing Specialist. It includes detailed information about the job responsibilities, qualifications, and other relevant details.",
    requirements: [
      "Bachelor's degree in Marketing or related field",
      "Experience with digital marketing",
      "Strong communication skills"
    ]
  },
  {
    id: "job-9s0t1u",
    title: "Sales Manager",
    company: "Sales Experts",
    shortDescription: "Lead and manage the sales team.",
    fullDescription: "This is a full description for Sales Manager. It includes detailed information about the job responsibilities, qualifications, and other relevant details.",
    requirements: [
      "Bachelor's degree in Business or related field",
      "Experience with sales management",
      "Strong leadership skills"
    ]
  },
  {
    id: "job-2v3w4x",
    title: "HR Coordinator",
    company: "People First",
    shortDescription: "Coordinate HR activities and processes.",
    fullDescription: "This is a full description for HR Coordinator. It includes detailed information about the job responsibilities, qualifications, and other relevant details.",
    requirements: [
      "Bachelor's degree in Human Resources or related field",
      "Experience with HR coordination",
      "Strong organizational skills"
    ]
  },
  {
    id: "job-5y6z7a",
    title: "Financial Analyst",
    company: "Finance Pros",
    shortDescription: "Analyze financial data and trends.",
    fullDescription: "This is a full description for Financial Analyst. It includes detailed information about the job responsibilities, qualifications, and other relevant details.",
    requirements: [
      "Bachelor's degree in Finance or related field",
      "Experience with financial analysis",
      "Strong analytical skills"
    ]
  },
  {
    id: "job-8b9c0d",
    title: "Customer Support",
    company: "Support Hub",
    shortDescription: "Provide customer support and assistance.",
    fullDescription: "This is a full description for Customer Support. It includes detailed information about the job responsibilities, qualifications, and other relevant details.",
    requirements: [
      "Bachelor's degree in any field",
      "Experience with customer support",
      "Strong communication skills"
    ]
  },
  {
    id: "job-1e2f3g",
    title: "Network Engineer",
    company: "Net Solutions",
    shortDescription: "Design and maintain network infrastructure.",
    fullDescription: "This is a full description for Network Engineer. It includes detailed information about the job responsibilities, qualifications, and other relevant details.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "Experience with network design",
      "Strong problem-solving skills"
    ]
  },
  {
    id: "job-4h5i6j",
    title: "Content Writer",
    company: "Content Creators",
    shortDescription: "Create engaging and informative content.",
    fullDescription: "This is a full description for Content Writer. It includes detailed information about the job responsibilities, qualifications, and other relevant details.",
    requirements: [
      "Bachelor's degree in English or related field",
      "Experience with content writing",
      "Strong writing skills"
    ]
  },
  {
    id: "job-7k8l9m",
    title: "Graphic Designer",
    company: "Creative Minds",
    shortDescription: "Design visual content and graphics.",
    fullDescription: "This is a full description for Graphic Designer. It includes detailed information about the job responsibilities, qualifications, and other relevant details.",
    requirements: [
      "Bachelor's degree in Graphic Design or related field",
      "Experience with graphic design",
      "Strong creativity skills"
    ]
  },
  {
    id: "job-0n1o2p",
    title: "IT Support",
    company: "Tech Support",
    shortDescription: "Provide technical support and troubleshooting.",
    fullDescription: "This is a full description for IT Support. It includes detailed information about the job responsibilities, qualifications, and other relevant details.",
    requirements: [
      "Bachelor's degree in any field",
      "Experience with IT support",
      "Strong problem-solving skills"
    ]
  },
  {
    id: "job-3q4r5s",
    title: "Operations Manager",
    company: "Ops Experts",
    shortDescription: "Oversee daily operations and processes.",
    fullDescription: "This is a full description for Operations Manager. It includes detailed information about the job responsibilities, qualifications, and other relevant details.",
    requirements: [
      "Bachelor's degree in Business or related field",
      "Experience with operations management",
      "Strong leadership skills"
    ]
  },
  {
    id: "job-6t7u8v",
    title: "Business Analyst",
    company: "Biz Solutions",
    shortDescription: "Analyze business processes and requirements.",
    fullDescription: "This is a full description for Business Analyst. It includes detailed information about the job responsibilities, qualifications, and other relevant details.",
    requirements: [
      "Bachelor's degree in Business or related field",
      "Experience with business analysis",
      "Strong analytical skills"
    ]
  },
  {
    id: "job-9w0x1y",
    title: "Project Manager",
    company: "Project Pros",
    shortDescription: "Manage and coordinate projects.",
    fullDescription: "This is a full description for Project Manager. It includes detailed information about the job responsibilities, qualifications, and other relevant details.",
    requirements: [
      "Bachelor's degree in Business or related field",
      "Experience with project management",
      "Strong leadership skills"
    ]
  },
  {
    id: "job-2z3a4b",
    title: "QA Engineer",
    company: "Quality Assurance",
    shortDescription: "Test and ensure software quality.",
    fullDescription: "This is a full description for QA Engineer. It includes detailed information about the job responsibilities, qualifications, and other relevant details.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "Experience with software testing",
      "Strong attention to detail"
    ]
  },
  {
    id: "job-5c6d7e",
    title: "SEO Specialist",
    company: "SEO Experts",
    shortDescription: "Optimize websites for search engines.",
    fullDescription: "This is a full description for SEO Specialist. It includes detailed information about the job responsibilities, qualifications, and other relevant details.",
    requirements: [
      "Bachelor's degree in Marketing or related field",
      "Experience with SEO",
      "Strong analytical skills"
    ]
  },
  {
    id: "job-8f9g0h",
    title: "Mobile Developer",
    company: "App Creators",
    shortDescription: "Develop mobile applications.",
    fullDescription: "This is a full description for Mobile Developer. It includes detailed information about the job responsibilities, qualifications, and other relevant details.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "Experience with mobile app development",
      "Strong programming skills"
    ]
  },
  {
    id: "job-1i2j3k",
    title: "System Administrator",
    company: "Sys Admins",
    shortDescription: "Manage and maintain IT systems.",
    fullDescription: "This is a full description for System Administrator. It includes detailed information about the job responsibilities, qualifications, and other relevant details.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "Experience with system administration",
      "Strong problem-solving skills"
    ]
  },
  {
    id: "job-4l5m6n",
    title: "Recruiter",
    company: "Talent Finders",
    shortDescription: "Recruit and hire new employees.",
    fullDescription: "This is a full description for Recruiter. It includes detailed information about the job responsibilities, qualifications, and other relevant details.",
    requirements: [
      "Bachelor's degree in Human Resources or related field",
      "Experience with recruitment",
      "Strong communication skills"
    ]
  }
];

export default jobsList;

