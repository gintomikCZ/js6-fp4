import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PersonsFormPage from '../views/PersonsFormPage.vue'
import ProjectsFormPage from '../views/ProjectsFormPage.vue'
import PersonsListPage from '../views/PersonsListPage.vue'
import TasksFormPage from '../views/TasksFormPage.vue'

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
      component: PersonsFormPage
    },
    {
      path: '/persons-form/:id',
      name: 'personsFormEdit',
      component: PersonsFormPage
    },
    {
      path: '/projects-form/',
      name: 'projectsForm',
      component: ProjectsFormPage
    },
    {
      path: '/projects-form/:id',
      name: 'projectsFormEdit',
      component: ProjectsFormPage
    },
    {
      path: '/personslist',
      name: 'personsList',
      component: PersonsListPage
    },
    {
      path: '/tasks-form/:id',
      name: 'tasksForm',
      component: TasksFormPage
    },
    {
      path: '/tasks-form/:id/:projectid',
      name: 'tasksFormEdit',
      component: TasksFormPage
    }
  ]
})

export default router
