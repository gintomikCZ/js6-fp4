import { createStore } from 'vuex'
import formSettings from './formSettings.js'
import db from '../utils/db.js'
const store = createStore({
  state: {
    itWorks: 'itWorks',
    formSettings: formSettings,
    persons: [],
      // [ {id:, first:, last: } ]
      // hledat konkrétní osobu - state.persons.findIndex(person => personid === hledane_id)
      // <li v-for="person in persons"> {{ person.first + person.last}}</li>
    projects: [],
    positions: [],
    tasks: [],

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
      // normalizační datová struktura
      // state.persons = {}
      // data.forEach(record => {
      //   state.persons['' + record.id] = record
      // })
    },
    setProjects (state, data) {
      state.projects = data
    }
  },
  actions: {
    fetchPersons (context) {
      return db.get('js6persons').then(data  => {
        context.commit('setPersons', data)
      })
    },
    fetchProjects (context) {
      return db.get('js6projects').then(data => {
        context.commit('setProjects', data)
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