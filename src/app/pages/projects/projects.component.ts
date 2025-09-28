import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Project = {
  name: string;
  role: string;
  org?: string;          // company / personal
  period: string;
  href?: string;
  stack: string[];
  points: string[];
};

type ProjectGroup = {
  heading: string;       // e.g. Company / Personal OSS
  org?: string;
  items: Project[];
};

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

  groups: ProjectGroup[] = [
    {
      heading: 'Projects',
      org: 'Stuvalley Technology Pvt. Ltd.',
      items: [
        {
          name: 'Stumount.in',
          role: 'Full-Stack Developer (Lead)',
          org: 'Stuvalley Technology Pvt. Ltd.',
          period: 'Oct 2024 – Present',
          href: '#',
          stack: ['Angular', 'RxJS', 'Bootstrap', 'ngx-universal', 'Node.js', 'Express.js', 'MongoDB', 'AWS'],
          points: [
            'Developed a multi-portal platform for PhD thesis and journal plagiarism check & page-removal services.',
            'Built separate portals for students, vendors, accounts, and admin with role-based access control.',
            'Student Portal: Real-time page-by-page plagiarism check powered by Angular Universal (SSR) for SEO.',
            'Vendor Portal: Order management with acknowledgment, returns, and communication features.',
            'Admin Portal: Order assignment, payment tracking, automated email & notification system.',
            'Accounts Portal: Vendor payments, order invoices, and financial tracking.',
            'Implemented authentication guards, interceptors, and BehaviorSubject-based state management in Angular.'
          ]
        },
        {
          name: 'Vidyapun.com',
          role: 'Full-Stack Developer (Lead)',
          org: 'Stuvalley Technology Pvt. Ltd.',
          period: 'Aug 2023 – Present',
          href: '#',
          stack: ['Node.js', 'Next.js', 'MongoDB', 'DigitalOcean'],
          points: [
            'Vidyapun – A unified educational discovery platform enabling students to explore and apply to schools, colleges, and universities across India.',
            'Designed and migrated platform to Next.js App Router for modular, optimized rendering.',
            'Built and deployed scalable API layer for institutions, courses, users, and reviews.',
            'Developed institution claim system for schools/colleges to manage their listings.',
            'Implemented MongoDB aggregation pipelines for search, filtering, and analytics.',
            'Optimized performance with Redis caching and Dockerized deployments.'
          ]
        }
      ]
    },
    {
      heading: 'Open-Source Packages (npm)',
      items: [
        {
          name: 'ckb-editor-angular',
          role: 'Author & Maintainer',
          period: 'TypeScript • Angular 17',
          href: 'https://www.npmjs.com/package/ckb-editor-angular',
          stack: ['Angular', 'TypeScript', 'Rich-Text'],
          points: [
            '🚀 Rich Text Editor for Angular (alternative to CKEditor, TinyMCE, Quill) with PDF/DOCX export, tables, emoji support, and themes.'
          ]
        },
        {
          name: 'ngx-word-viewer',
          role: 'Author',
          period: 'TypeScript • Angular',
          href: 'https://www.npmjs.com/package/ngx-word-viewer',
          stack: ['Angular', 'Viewer'],
          points: [
            'Angular component for viewing Word (.docx) documents with page navigation & zoom.'
          ]
        },
        {
          name: 'ngx-universal-file-viewer',
          role: 'Author',
          period: 'TypeScript • Angular 12+',
          href: 'https://www.npmjs.com/package/ngx-universal-file-viewer',
          stack: ['Angular', 'Universal', 'PDF/Office'],
          points: [
            'Angular component for viewing PDF, Word, Excel, and PowerPoint files with continuous scroll & page-by-page view.'
          ]
        },
        {
          name: 'Packages Milestone',
          role: 'Downloads',
          period: '',
          stack: ['npm'],
          points: [
            '📈 Achieved 500+ downloads across all packages within the first month of release.'
          ]
        }
      ]
    }
  ];
}
