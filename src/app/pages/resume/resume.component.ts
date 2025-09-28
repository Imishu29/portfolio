import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Exp = {
  period: string;
  title: string;
  company: string;
  location?: string;
  description: string;
  highlights: string[];
};

type Edu = {
  period: string;
  degree: string;
  institution: string;
  details?: string;
};

type SkillCategory = {
  category: string;
  items: string[];
};

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent {

  // ========= WORK EXPERIENCE =========
  experiences: Exp[] = [
    {
      period: 'Jun 2023 – Present',
      title: 'SDE-II (Full-Stack)',
      company: 'Stuvalley Technology Pvt. Ltd.',
      location: 'Gurugram, India',
      description:
        'Experienced Full-Stack Developer focused on backend development and scalable web architecture. Proficient in building robust, secure APIs and modern frontends.',
      highlights: [
        'Backend: Node.js, Express.js, RESTful APIs, JWT Authentication',
        'Frontend: Angular (16–18), Next.js (App Router), HTML5, CSS3, Tailwind CSS',
        'Databases: MongoDB (Aggregation), Redis (Caching)',
        'DevOps: Docker, GitHub, CI/CD Pipelines',
        'Tools: Postman, ThunderClient',
        'Practices: Modular Architecture, SEO Optimization, Clean Code',
        'Ways of Working: Agile, Cross-functional Collaboration, Continuous Learning',
        'Proven ability to deliver maintainable, production-ready software'
      ]
    }
  ];

  // ========= EDUCATION =========
  education: Edu[] = [
    {
      period: '2018 – 2022',
      degree: 'B.Tech • Computer Science Engineering',
      institution: 'Oriental College Of Technology',
      details: 'Core CS fundamentals, software engineering & full-stack projects'
    }
  ];

  // ========= AREAS OF EXPERTISE =========
  skills: SkillCategory[] = [
    { category: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'Java'] },
    { category: 'Frontend', items: ['React', 'Angular', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap'] },
    { category: 'Backend', items: ['Node.js', 'Express.js'] },
    { category: 'Databases', items: ['MongoDB', 'Redis'] },
    { category: 'Cloud & DevOps', items: ['Docker', 'AWS'] },
    { category: 'Tools', items: ['Git', 'VS Code', 'GitHub', 'Postman', 'ThunderClient', 'CI/CD Pipelines'] },
    { category: 'Soft Skills', items: ['Leadership', 'Cross-functional Collaboration', 'Agile Methodologies', 'Clean Code', 'Problem Solving'] }
  ];

  downloadResume() {
    const link = document.createElement('a');
    link.href = 'assets/resume.pdf';   // put your PDF in /assets
    link.download = 'Resume.pdf';
    link.click();
  }
}
