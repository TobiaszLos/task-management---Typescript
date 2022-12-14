export const setTitle = (
  value: string,
  element: HTMLElement = document.querySelector(
    '.todo-tasks-title'
  ) as HTMLElement
) => {
  element.innerText = value
}

export const setCount = (
  value: string,
  element: HTMLElement = document.querySelector(
    '.todo-tasks-count'
  ) as HTMLElement
) => {
  element.innerText = `${value} tasks left`
}

export const toggleDisplay = (key: string) => {
  const todoTasksContainerEl = document.querySelector(
    '.todo-tasks'
  ) as HTMLElement

  switch (key) {
    case 'show':
      todoTasksContainerEl.removeAttribute('hidden')
      break
    case 'hidden':
      todoTasksContainerEl.setAttribute('hidden', '')
      break
    default:
      break
  }
}

// SETUP IN TASK SECTION
