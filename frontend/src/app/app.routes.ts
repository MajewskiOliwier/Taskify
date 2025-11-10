import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Settings } from './pages/settings/settings';
import { TeamPage } from './pages/team-page/team-page';
import { LoginPage } from './pages/login-page/login-page';
import { TaskPage } from './pages/task-page/task-page';
import { WelcomePage } from './pages/welcome-page/welcome-page';
import { RegisterPage } from './pages/register-page/register-page';

export const routes: Routes = [
    {
        path: "",
        redirectTo: 'welcome',
        pathMatch: 'full'
    },
    {
        path: 'welcome',
        component: WelcomePage
        //no logged default page
    },
    {
        path: 'home',
        component: Home
        //logged default page
    },
    {
        path: 'settings',
        component: Settings
    },
    {
        path: 'team/:teamId',
        component: TeamPage
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
    }
];