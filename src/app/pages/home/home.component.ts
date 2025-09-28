import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  skills = [
    { name: 'Content Strategy', level: 95 },
    { name: 'Copy Editing', level: 90 },
    { name: 'SEO Writing', level: 85 },
    { name: 'Creative Writing', level: 88 },
    { name: 'Technical Writing', level: 82 },
    { name: 'Research', level: 92 }
  ];

  ngOnInit() {
    // Initialize animations
  }
}