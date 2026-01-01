import { Component, AfterViewInit, OnDestroy, NgZone, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private isBrowser: boolean;

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.initAnimations();
          this.initAboutAnimations();
        }, 300);
      });
    }
  }

  private initAnimations(): void {
    const mainTL = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1 } });

    mainTL
      .fromTo('.hero-badge', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 })
      .fromTo('.hello', { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1.2 }, '-=0.4')
      .fromTo('.im', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, '-=0.6')
      .fromTo('.hero-subtitle-wrapper', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
      .fromTo('.hero-description', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
      // npm Highlight
      .fromTo('.npm-highlight', 
        { opacity: 0, y: 30, scale: 0.98 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.4)' }, 
        '-=0.4'
      )
      .fromTo('.npm-package', 
        { opacity: 0, x: -15 }, 
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.4 }, 
        '-=0.4'
      )
      // Learning badge
      .fromTo('.learning-badge', 
        { opacity: 0, x: -20 }, 
        { opacity: 1, x: 0, duration: 0.6 }, 
        '-=0.3'
      )
      .fromTo('.hero-stats', 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, onComplete: () => this.animateCounters() }, 
        '-=0.4'
      )
      .fromTo('.cta-card', 
        { opacity: 0, y: 30, scale: 0.9 }, 
        { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.6 }, 
        '-=0.4'
      )
      .fromTo('.social-links .social-link', 
        { opacity: 0, scale: 0, rotation: -180 }, 
        { opacity: 1, scale: 1, rotation: 0, stagger: 0.1, duration: 0.5, ease: 'back.out(1.7)' }, 
        '-=0.3'
      )
      .fromTo('.hero-image', 
        { opacity: 0, x: 100 }, 
        { opacity: 1, x: 0, duration: 1.2 }, 
        '-=1.5'
      )
      .fromTo('.npm-badge-image', 
        { opacity: 0, scale: 0 }, 
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }, 
        '-=0.5'
      )
      .fromTo('.float-item', 
        { opacity: 0, scale: 0 }, 
        { opacity: 1, scale: 1, stagger: 0.1, duration: 0.5, ease: 'back.out(1.7)' }, 
        '-=0.8'
      );

    this.initFloatingAnimations();
    this.initHoverEffects();
  }

  private initAboutAnimations(): void {
    gsap.fromTo('.about-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.package-item',
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: {
          trigger: '.packages-list',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.topic-item',
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: {
          trigger: '.learning-topics',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  private animateCounters(): void {
    document.querySelectorAll('.stat-number').forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-count') || '0', 10);
      
      gsap.fromTo(counter, 
        { innerText: 0 },
        {
          innerText: target,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 }
        }
      );
    });
  }

  private initFloatingAnimations(): void {
    gsap.to('.shape-1', { x: 30, y: -30, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.shape-2', { x: -20, y: 20, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.shape-3', { x: 25, y: 25, duration: 12, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    document.querySelectorAll('.float-item').forEach((item, i) => {
      gsap.to(item, {
        y: -20,
        rotation: 15,
        duration: 3 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.3
      });
    });

    gsap.to('.experience-badge', { y: -15, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.npm-badge-image', { y: -10, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }

  private initHoverEffects(): void {
    document.querySelectorAll('.cta-card').forEach((card) => {
      card.addEventListener('mouseenter', () => gsap.to(card, { scale: 1.05, duration: 0.3 }));
      card.addEventListener('mouseleave', () => gsap.to(card, { scale: 1, duration: 0.3 }));
    });

    document.querySelectorAll('.social-link').forEach((link) => {
      link.addEventListener('mouseenter', () => gsap.to(link, { scale: 1.2, rotation: 10, duration: 0.3, ease: 'back.out(1.7)' }));
      link.addEventListener('mouseleave', () => gsap.to(link, { scale: 1, rotation: 0, duration: 0.3 }));
    });

    const imageWrapper = document.querySelector('.image-wrapper');
    if (imageWrapper) {
      imageWrapper.addEventListener('mouseenter', () => gsap.to('.profile-img', { filter: 'grayscale(0%)', scale: 1.05, duration: 0.5 }));
      imageWrapper.addEventListener('mouseleave', () => gsap.to('.profile-img', { filter: 'grayscale(30%)', scale: 1, duration: 0.5 }));
    }

    // About cards hover
    document.querySelectorAll('.about-card').forEach((card) => {
      card.addEventListener('mouseenter', () => gsap.to(card, { y: -8, duration: 0.3, ease: 'power2.out' }));
      card.addEventListener('mouseleave', () => gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' }));
    });
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }
}