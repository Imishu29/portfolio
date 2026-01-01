import { Component, AfterViewInit, OnDestroy, NgZone, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
export class ResumeComponent implements AfterViewInit, OnDestroy {
  private isBrowser: boolean;

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

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

  education: Edu[] = [
    {
      period: '2018 – 2022',
      degree: 'B.Tech • Computer Science Engineering',
      institution: 'Oriental College Of Technology',
      details: 'Core CS fundamentals, software engineering & full-stack projects'
    }
  ];

  skills: SkillCategory[] = [
    { category: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'Java'] },
    { category: 'Frontend', items: ['React', 'Angular', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap'] },
    { category: 'Backend', items: ['Node.js', 'Express.js'] },
    { category: 'Databases', items: ['MongoDB', 'Redis'] },
    { category: 'Cloud & DevOps', items: ['Docker', 'AWS'] },
    { category: 'Tools', items: ['Git', 'VS Code', 'GitHub', 'Postman', 'ThunderClient', 'CI/CD Pipelines'] },
    { category: 'Soft Skills', items: ['Leadership', 'Cross-functional Collaboration', 'Agile Methodologies', 'Clean Code', 'Problem Solving'] }
  ];

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => this.initAnimations(), 300);
      });
    }
  }

  private initAnimations(): void {
    // Page Header Animation
    gsap.fromTo('.page-header',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }
    );

    gsap.fromTo('.page-title',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
    );

    gsap.fromTo('.download-btn',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, delay: 0.4, ease: 'back.out(1.7)' }
    );

    // Section Headings
    gsap.utils.toArray('.section-heading').forEach((heading: any, i) => {
      gsap.fromTo(heading,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.3 + (i * 0.1),
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
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: i * 0.15,
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
    gsap.utils.toArray('.timeline-marker').forEach((marker: any, i) => {
      gsap.fromTo(marker,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.5,
          delay: 0.3 + (i * 0.1),
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: marker,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Education Items
    gsap.utils.toArray('.education-item').forEach((item: any, i) => {
      gsap.fromTo(item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Skill Categories
    gsap.utils.toArray('.skill-category').forEach((category: any, i) => {
      gsap.fromTo(category,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: category,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Skill Tags Stagger
    gsap.utils.toArray('.skill-tags').forEach((container: any) => {
      const tags = container.querySelectorAll('.skill-tag');
      gsap.fromTo(tags,
        { opacity: 0, scale: 0.8, y: 10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: container,
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
    // Download Button Hover
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
      downloadBtn.addEventListener('mouseenter', () => {
        gsap.to(downloadBtn, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
      });
      downloadBtn.addEventListener('mouseleave', () => {
        gsap.to(downloadBtn, { scale: 1, duration: 0.3, ease: 'power2.out' });
      });
    }

    // Timeline Content Hover
    document.querySelectorAll('.timeline-content').forEach((content) => {
      content.addEventListener('mouseenter', () => {
        gsap.to(content, { x: 10, boxShadow: '0 8px 30px rgba(0,0,0,0.12)', duration: 0.3 });
      });
      content.addEventListener('mouseleave', () => {
        gsap.to(content, { x: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', duration: 0.3 });
      });
    });

    // Skill Tags Hover
    document.querySelectorAll('.skill-tag').forEach((tag) => {
      tag.addEventListener('mouseenter', () => {
        gsap.to(tag, { scale: 1.1, y: -3, duration: 0.3, ease: 'back.out(1.7)' });
      });
      tag.addEventListener('mouseleave', () => {
        gsap.to(tag, { scale: 1, y: 0, duration: 0.3, ease: 'power2.out' });
      });
    });
  }

  downloadResume(): void {
    const link = document.createElement('a');
    link.href = 'assets/resume.pdf';
    link.download = 'Abhishek_Rout_Resume.pdf';
    link.click();
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }
}