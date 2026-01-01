import { Component, OnInit, OnDestroy, AfterViewInit, NgZone, PLATFORM_ID, Inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { filter } from 'rxjs/operators';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  isMenuOpen = false;
  isScrolled = false;
  isLoading = true;
  email: string = "abhishekrout128@gmail.com";
  
  private isBrowser: boolean;
  private scrollListener: (() => void) | null = null;

  constructor(
    private ngZone: NgZone,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get currentYear(): number {
    return new Date().getFullYear();
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.router.events.pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.closeMenu();
        window.scrollTo({ top: 0, behavior: 'auto' });
        setTimeout(() => ScrollTrigger.refresh(), 100);
      });
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.ngZone.runOutsideAngular(() => {
        this.initLoader();
        this.initScrollListener();
        this.initHeaderAnimations();
        this.initFooterAnimations();
      });
    }
  }

  private initLoader(): void {
    const loader = document.querySelector('.loader');
    const loaderProgress = document.querySelector('.loader-progress');
    const loaderText = document.querySelector('.loader-text');

    if (!loader || !loaderProgress) {
      this.ngZone.run(() => { this.isLoading = false; });
      this.initPageReveal();
      return;
    }

    const loaderTL = gsap.timeline({
      onComplete: () => {
        this.ngZone.run(() => { this.isLoading = false; });
        this.initPageReveal();
      }
    });

    loaderTL
      .to(loaderProgress, { width: '100%', duration: 1.2, ease: 'power2.inOut' })
      .to(loaderText, { opacity: 0, y: -20, duration: 0.3 }, '-=0.3')
      .to(loader, { yPercent: -100, duration: 0.8, ease: 'power4.inOut' })
      .set(loader, { display: 'none' });
  }

  private initPageReveal(): void {
    gsap.fromTo('.header', 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }
    );

    gsap.fromTo('.brand',
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power3.out' }
    );

    gsap.fromTo('.nav a',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, delay: 0.5, ease: 'power3.out' }
    );
  }

  private initScrollListener(): void {
    this.scrollListener = () => {
      this.ngZone.run(() => {
        this.isScrolled = window.scrollY > 50;
      });
    };
    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }

  private initHeaderAnimations(): void {
    const dot = document.querySelector('.brand .dot');
    if (dot) {
      gsap.to(dot, {
        scale: 1.2,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    document.querySelectorAll('.nav a').forEach((link) => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, { y: -2, duration: 0.3 });
      });
      link.addEventListener('mouseleave', () => {
        gsap.to(link, { y: 0, duration: 0.3 });
      });
    });
  }

  private initFooterAnimations(): void {
    gsap.fromTo('.footer', 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.footer',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.footer-section',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.footer-content',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    
    const nav = document.querySelector('.nav') as HTMLElement;
    const spans = document.querySelectorAll('.menu-toggle span');
    
    if (this.isMenuOpen) {
      gsap.to(spans[0], { rotation: 45, y: 8, duration: 0.3 });
      gsap.to(spans[1], { opacity: 0, duration: 0.3 });
      gsap.to(spans[2], { rotation: -45, y: -8, duration: 0.3 });
      document.body.style.overflow = 'hidden';
    } else {
      this.closeMenu();
    }
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    const spans = document.querySelectorAll('.menu-toggle span');
    
    gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
    gsap.to(spans[1], { opacity: 1, duration: 0.3 });
    gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
    document.body.style.overflow = '';
  }

  scrollTo(target: number): void {
    window.scrollTo({ top: target, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      if (this.scrollListener) {
        window.removeEventListener('scroll', this.scrollListener);
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }
}