import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  currentUser: { name: string; email: string } = {
    name: 'Ricardo Rocker',
    email: 'ricardo.santos.rocker@gmail.com',
  };
  isDropdownOpen = false;

  constructor(private router: Router) {}

  getUserInitials(): string {
    if (!this.currentUser) return '';
    return 'RR';
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(event: Event): void {
    event.preventDefault();
    this.isDropdownOpen = false;
    this.router.navigate(['/login']);
  }
}
