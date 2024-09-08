
export const getHighlight = (task) => {
  if (task.completed) {
    return 'success'
  }
  const today = new Date()
  today.setDate(today.getDate() - 1)
  const dt = new Date(task.date)
  return today.getTime() > dt.getTime() ? 'danger' : ''
}


export const getPriority = (num) => {
  const priorities = ['low', 'medium', 'high']
  return priorities[num - 1]
}