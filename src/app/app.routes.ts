import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./components/core/landing-page/landing-page.component').then(m => m.LandingPageComponent), pathMatch: 'full' },
    { path: 'stats', loadComponent: () => import('./components/user/stats/stats.component').then(m => m.StatsComponent) },
];
