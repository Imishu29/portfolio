import { Component, AfterViewInit, OnDestroy, NgZone, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Project = {
  name: string;
  role: string;
  org?: string;
  period: string;
  href?: string;
  stack: string[];
  points: string[];
};

type ProjectGroup = {
  heading: string;
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
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  private isBrowser: boolean;

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  groups: ProjectGroup[] = [
    {
      heading: 'Professional Projects',
      org: 'Stuvalley Technology Pvt. Ltd.',
      items: [
        {
          name: 'Stumount.in',
          role: 'Full-Stack Developer (Lead)',
          org: 'Stuvalley Technology Pvt. Ltd.',
          period: 'Oct 2024 – Present',
          href: 'https://stumount.in',
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
          href: 'https://www.vidyapun.com',
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
      heading: 'Open-Source Packages',
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

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => this.initAnimations(), 300);
      });
    }
  }

  private initAnimations(): void {
    // Page Header
    gsap.fromTo('.page-header',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }
    );

    // Section Headings
    gsap.utils.toArray('.section-heading').forEach((heading: any, i) => {
      gsap.fromTo(heading,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Timeline Items
    gsap.utils.toArray('.timeline-item').forEach((item: any, i) => {
      gsap.fromTo(item,
        { opacity: 0, x: -50, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Timeline Markers
    gsap.utils.toArray('.timeline-marker').forEach((marker: any) => {
      gsap.fromTo(marker,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: marker,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Tech Tags
    gsap.utils.toArray('.stack').forEach((stack: any) => {
      const tags = stack.querySelectorAll('.tag');
      gsap.fromTo(tags,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: stack,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Hover Effects
    this.initHoverEffects();
  }

  private initHoverEffects(): void {
    document.querySelectorAll('.timeline-content').forEach((content) => {
      content.addEventListener('mouseenter', () => {
        gsap.to(content, {
          y: -5,
          boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      content.addEventListener('mouseleave', () => {
        gsap.to(content, {
          y: 0,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    document.querySelectorAll('.tag').forEach((tag) => {
      tag.addEventListener('mouseenter', () => {
        gsap.to(tag, { scale: 1.1, duration: 0.2, ease: 'back.out(1.7)' });
      });
      tag.addEventListener('mouseleave', () => {
        gsap.to(tag, { scale: 1, duration: 0.2 });
      });
    });
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }
}