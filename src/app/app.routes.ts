import { Routes } from '@angular/router';
import { HelloWorldComponent } from './hello-world/components/hello-world/hello-world.component';
import { PageComponent } from './journal/components/page/page.component';

export const routes: Routes = [
  { path: 'hello-world', component: HelloWorldComponent },
  { path: 'journal', component: PageComponent },
  { path: '', redirectTo: '/journal', pathMatch: 'full' },
];
