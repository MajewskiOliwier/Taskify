import { Routes } from '@angular/router';
import { ProjectPage } from './pages/project-page/project-page';
import { LoginPage } from './pages/login-page/login-page';
import { TaskPage } from './pages/task-page/task-page';
import { WelcomePage } from './pages/welcome-page/welcome-page';
import { RegisterPage } from './pages/register-page/register-page';
import { SettingsPage } from './pages/settings-page/settings-page';
import { HomePage } from './pages/home-page/home-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { StartRedirect } from './shared/components/start-redirect/start-redirect';    

export const routes: Routes = [
    {
        path: '',
        component: StartRedirect,
        pathMatch: 'full'
    },
    {
        path: 'welcome',
        component: WelcomePage
        //no logged default page
    },
    {
        path: 'home/:userID',
        component: HomePage
        //logged default page
    },
    {
        path: 'settings',
        component: SettingsPage
    },
    {
        path: 'project/:userID/:projectID',
        component: ProjectPage
    },
    {
        path: 'team/:teamID/task/:taskID',
        component: TaskPage
    },
    {
        path: 'login',
        component: LoginPage        
    },
    {
        path: 'register',
        component: RegisterPage        
    },
    {
        path: '**',
        component: NotFoundPage
    }
];