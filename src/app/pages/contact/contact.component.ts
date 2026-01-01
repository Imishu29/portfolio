import { Component, AfterViewInit, OnDestroy, NgZone, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ContactService } from '../../service/contact.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  private isBrowser: boolean;
  email = "abhishekrout128@gmail.com";
  phone = "9109651999";
  isSubmitting = false;
  submitSuccess = false;

  constructor(
    private fb: FormBuilder,
    private contact: ContactService,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['']
  });

  get f() { return this.form.controls; }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => this.initAnimations(), 300);
      });
    }
  }

  private initAnimations(): void {
    // Page Header
    gsap.fromTo('.contact-head',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }
    );

    // Title
    gsap.fromTo('.section-title',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
    );

    // Lead text
    gsap.fromTo('.lead',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: 'power3.out' }
    );

    // Info blocks
    gsap.fromTo('.info .block',
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, delay: 0.5, ease: 'power3.out' }
    );

    // Form
    gsap.fromTo('.form',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: 'power3.out' }
    );

    // Form fields
    gsap.fromTo('.field',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.8, ease: 'power3.out' }
    );

    // Submit button
    gsap.fromTo('.submit-wrap',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, delay: 1.2, ease: 'back.out(1.7)' }
    );

    // Hover Effects
    this.initHoverEffects();
  }

  private initHoverEffects(): void {
    // Submit button
    const submitBtn = document.querySelector('button.primary');
    if (submitBtn) {
      submitBtn.addEventListener('mouseenter', () => {
        gsap.to(submitBtn, { scale: 1.02, duration: 0.3, ease: 'power2.out' });
      });
      submitBtn.addEventListener('mouseleave', () => {
        gsap.to(submitBtn, { scale: 1, duration: 0.3, ease: 'power2.out' });
      });
    }

    // Input focus animations
    document.querySelectorAll('input, textarea').forEach((input) => {
      input.addEventListener('focus', () => {
        gsap.to(input, { scale: 1.01, duration: 0.2 });
      });
      input.addEventListener('blur', () => {
        gsap.to(input, { scale: 1, duration: 0.2 });
      });
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      
      // Shake animation for invalid form
      gsap.to('.form', {
  x: -10,
  duration: 0.05,
  repeat: 5,
  yoyo: true,
  ease: 'power2.out'
});
      return;
    }

    this.isSubmitting = true;
    
    // Button loading animation
    gsap.to('button.primary', {
      scale: 0.98,
      duration: 0.2
    });

    this.contact.create(this.form.value).subscribe({
      next: (resp: any) => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        
        // Success animation
        gsap.to('button.primary', {
          scale: 1,
          duration: 0.3,
          ease: 'back.out(1.7)'
        });
        
        gsap.fromTo('.success-message',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 }
        );

        setTimeout(() => {
          this.form.reset();
          this.submitSuccess = false;
        }, 3000);
      },
      error: (err) => {
        this.isSubmitting = false;
        gsap.to('button.primary', { scale: 1, duration: 0.2 });
        alert('Something went wrong. Please try again.');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }
}