import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GalleryComponent } from './pages/gallery/gallery.component'; // Fix: Corrected the file path for importing GalleryComponent

export const routes: Routes = [

  { path: 'dashboard', component: DashboardComponent },
  { path: 'gallery', component:  GalleryComponent },
  { path: '',   redirectTo: '', pathMatch: 'full' },
];
