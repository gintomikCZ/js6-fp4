export default {
  persons: {
    first: {
      label: 'first name',
      type: 'text'
    },
    last: {
      label: 'last name',
      type: 'text'
    },
    positionid: {
      label: 'position',
      type: 'select',
      options: []
    }
  },
  projects: {
    project: {
      label: 'project name',
      type: 'text',
    },
    description: {
      label: 'project description',
      type: 'text'
    }
  },
  tasks: {
    task: {
      label: 'task name',
      type: 'text'
    },
    projectid: {
      label: 'project',
      type: 'select',
      options: []
    },
    completed: {
      label: 'completed',
      type: 'select',
      options: [
        { label: 'Yes', value: 1 },
        { label: 'No', value: 0 }
      ]
    },
    priority: {
      label: 'priority',
      type: 'select',
      options: [
        { label: 'low', value: 1 },
        { label: 'medium', value: 2 },
        { label: 'high', value: 3 }
      ]
    },
    date: {
      label: 'due date',
      type: 'date'
    }
  }

}