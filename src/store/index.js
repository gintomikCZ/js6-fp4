import { createStore } from 'vuex'
import formSettings from './formSettings.js'
import db from '../utils/db.js'
const store = createStore({
  state: {
    itWorks: 'itWorks',
    formSettings: formSettings,
    persons: [],
    projects: [],
    positions: [],
    tasks: [],
    taskDetail: null,
    personDetail: null,
    personsTasks: []
  },
  mutations: {
    setOptions (state, payload) { // {formName: persons, control: positionid, options: [{label: '...', value 8}]}
      state.formSettings[payload.formName][payload.control].options = payload.options
    },
    setInitialValues (state, payload) { // {formName: persons, values: {first: 'Karel', last: 'Houska'}}
      Object.keys(state.formSettings[payload.formName]).forEach(control => {
        if (payload.values[control] === 0) {
          state.formSettings[payload.formName][control].initialValue = 0
        } else {
          state.formSettings[payload.formName][control].initialValue = payload.values[control] || ''
        }
      })
    },
    setPersons (state, data) {
      state.persons = data
    },
    setProjects (state, data) {
      state.projects = data
    },
    setTasks (state, data) {
      state.tasks = data
    },
    setTask (state, record) {
      state.taskDetail = record
    },
    setPersonsTasks (state, data) {
      state.personsTasks = data
    },
    setPerson (state, record) {
      state.personDetail = record
    }
  },
  actions: {
    fetchPersons (context) {
      return db.get('js6persons').then(data => {
        context.commit('setPersons', data)
      })
    },
    fetchProjects (context) {
      return db.get('js6projects').then(data => {
        context.commit('setProjects', data)
      })
    },
    fetchTasks (context) {
      return db.get('js6tasks').then(data => {
        context.commit('setTasks', data)
      })
    },
    fetchTask (context, id) {
      return db.get('js6tasks/' + id).then(record => {
        context.commit('setTask', record)
      })
    },
    fetchPersonsTasks (context, payload) { // { filter: 'taskid', id: 89 }
      return db.get('js6personstasks?' + payload.filter + '=' + payload.id).then(data => {
        context.commit('setPersonsTasks', data)
      })
    },
    fetchPerson (context, id) {
      return db.get('js6persons/' + id).then(record => {
        context.commit('setPerson', record)
      })
    }
  }
})

export default store


/*

persons: {
  1: {
    first: 'karel',
    last: 'houska'
  }
}

// hledání person podle id ..... state.persons[hledaneid]

// <li v-for="personid in Object.keys(persons)">{{ persons[personid].first + persons[personid].last }}</li>

*/