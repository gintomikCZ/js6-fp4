import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PersonsFormPage from '../views/PersonsFormPage.vue'
import ProjectsFormPage from '../views/ProjectsFormPage.vue'
import PersonsListPage from '../views/PersonsListPage.vue'
import TasksFormPage from '../views/TasksFormPage.vue'
import FormPage from '../views/FormPage.vue'
import ProjectsListPage from '../views/ProjectsListPage.vue'
import TasksListPage from '../views/TasksListPage.vue'
import TaskDetailPage from '../views/TaskDetailPage.vue'
import PersonDetailPage from '../views/PersonDetailPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/persons-form',
      name: 'personsForm',
      // component: PersonsFormPage
      component: FormPage
    },
    {
      path: '/persons-form/:id',
      name: 'personsFormEdit',
      // component: PersonsFormPage
      component: FormPage
    },
    {
      path: '/projects-form/',
      name: 'projectsForm',
      // component: ProjectsFormPage
      component: FormPage
    },
    {
      path: '/projects-form/:id',
      name: 'projectsFormEdit',
      // component: ProjectsFormPage
      component: FormPage
    },
    {
      path: '/personslist',
      name: 'personsList',
      component: PersonsListPage
    },
    {
      path: '/projectslist',
      name: 'projectslist',
      component: ProjectsListPage
    },
    {
      path: '/tasks-form/:id',
      name: 'tasksForm',
      // component: TasksFormPage
      component: FormPage
    },
    {
      path: '/tasks-form/:id/:projectid',
      name: 'tasksFormEdit',
      // component: TasksFormPage
      component: FormPage
    },
    {
      path: '/taskslist',
      name: 'tasksList',
      component: TasksListPage
    },
    {
      path: '/taskdetail/:id',
      name: 'taskDetail',
      component: TaskDetailPage
    },
    {
      path: '/persondetail/:id',
      name: 'personDetail',
      component: PersonDetailPage
    }
  ]
})

export default router
