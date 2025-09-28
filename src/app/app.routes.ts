import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ResumeComponent } from './pages/resume/resume.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'resume',
        component:ResumeComponent
    },
    {
        path:'projects',
        component:ProjectsComponent
    },
    {
        path:'contact',
        component:ContactComponent
    }
];
