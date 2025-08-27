import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Resume/Knowledge base about Adzi Bilal
const ADZI_RESUME_DATA = `
ADZI BILAL MAULANA HIDAYATULLOH
Contact: adzibilal02@gmail.com, +62-851-5651-0302
GitHub: https://github.com/adzibilal
Website: https://www.adzibilal.com/
LinkedIn: https://www.linkedin.com/in/adzibilal/

WORK EXPERIENCE:

Jan 2025 - Present: Frontend Developer at Acclime Indonesia
- Developed Agility, an internal Customer Relationship Management (CRM) system to improve client management efficiency and streamline company business processes.
- Designed and implemented a responsive and user-friendly interface using Vue 3 and TypeScript, ensuring optimal user experience across devices.
- Closely collaborated with the backend team for API integration, ensuring real-time data synchronization between frontend and backend systems.
- Optimized application performance through techniques such as lazy loading, code splitting, and caching, resulting in faster load times and smoother interactions.
- Created and maintained comprehensive technical documentation and user guides for internal teams.
- Conducted automated testing (unit and integration tests) using appropriate testing frameworks in the Vue ecosystem to ensure the stability and reliability of new features.
- Participated in code reviews, providing constructive feedback to improve overall code quality within the team.
- Implemented security features such as token-based authentication and input validation to protect user data and maintain system integrity.
- Supported deployment processes and troubleshooting of the application in both staging and production environments.


Oct 2023 - Dec 2024: Frontend Developer & Code Reviewer at PT Motiolabs Digital Indonesia
- Continue development of the Live Event Feature for the MyDigiLearn project
- Review merge requests from frontend developers as part of the core team
- Research and development on new technologies and features for the Learnhub project
- Collaborate with backend developers for smooth integration
- Troubleshoot and resolve complex frontend issues
- Participate in sprint planning and agile development processes
- Maintain and update project documentation

2022 – 2023: Frontend Developer at PT Jumpa Daring Indonesia
- Continued development of the Secure Video Conference project
- Built secure internal chat application with user monitoring and task assignment
- Implemented automation testing functions
- Collaborated with backend developers for chat and video conferencing systems
- Participated in full development lifecycle from concept to deployment
- Worked with QA team for thorough testing and bug-free releases
- Created detailed technical documentation

2019 - 2022: Frontend Developer at PT Bara Prima Multi Teknovasi
- Designed and developed Crowdfunding Website
- Led development of Point of Sale (POS) system
- Created Digital Wedding Invitation product
- Collaborated with backend developers for API integration
- Ensured cross-browser compatibility and mobile responsiveness
- Participated in UI/UX design and development
- Worked with stakeholders to gather requirements and deliver solutions
- Troubleshot and debugged frontend issues

SKILLS:
Programming Languages: JavaScript, TypeScript, C++, Java, PHP, Flutter, Python
Libraries/Frameworks: React, NextJS, VueJS, FastAPI, NodeJS, TailwindCSS, ShadCN, TensorFlow, Remix JS, Nuxt JS, Pinia, Zustand, Vuex, React Query, Laravel
Tools/Software: Jira, ClickUp, Trello, Figma, Postman, Github, Gitlab, Webpack, Swagger

HIGHLIGHT PROJECTS:
1. MindSync: AI-powered document management with WhatsApp integration. Simplify access, organize efficiently, and boost productivity.
2. Learnhub: SaaS LMS for creators and institutions. Simplify course creation, monetize content, and grow your impact.
3. Bilal AI: Personal AI assistant powered by Gemini AI. Ask anything about "Adzi Bilal" and get smart, personalized responses.

EDUCATION:
- Bandung University of Technology (UTB) - S1 in Computer Science | 2022 – 2026
- Bangkit Academy - Machine Learning Path | 2024 Sep - Dec
- SMKN 2 Cimahi - Vocational High School, Software Engineering | 2017 – 2020

CERTIFICATIONS:
- Next.js, v3 - Frontend Masters
- Remix Fundamentals - Frontend Masters
- Machine Learning Specialization
- Advanced Learning Algorithms
- Crash Course on Python - Google
- Data Analysis with Python - Dicoding

SUMMARY:
Experienced Frontend Developer with a passion for user-focused design, high-performance websites, and seamless collaboration. Always evolving with the latest trends and technologies.
`;

const SYSTEM_PROMPT = `You are "Bilal AI", the personal AI assistant for Adzi Bilal Maulana Hidayatulloh. You are knowledgeable, professional, and friendly. Your role is to help people learn about Adzi's professional background, skills, experience, and projects.

Based on the following resume information about Adzi Bilal:

${ADZI_RESUME_DATA}

Please respond to questions about Adzi's:
- Work experience and professional background
- Technical skills and expertise
- Projects and achievements
- Education and certifications
- Contact information

Guidelines for responses:
1. Be conversational and helpful
2. Provide specific details from the resume when relevant
3. If asked about something not in the resume, politely explain you can only share what's available in Adzi's professional profile
4. Encourage users to contact Adzi directly for more detailed discussions about opportunities
5. Always maintain a professional yet friendly tone
6. Use "Adzi" or "Adzi Bilal" when referring to him
7. You can make reasonable inferences based on the resume data, but don't make up information not present

Remember: You are representing Adzi professionally, so maintain a positive and professional image while being helpful and informative.`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY not configured' },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: 'model',
          parts: [{ text: 'Hello! I\'m Bilal AI, Adzi Bilal\'s personal assistant. I\'m here to help you learn more about Adzi\'s professional background, skills, experience, and projects. What would you like to know?' }],
        },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
