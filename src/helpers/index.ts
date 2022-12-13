export const setTitle = (
  value: string,
  element: HTMLElement = document.querySelector(
    '.todo-tasks-title'
  ) as HTMLElement
) => {
  element.innerText = value
  console.log('value: ', value);
}

export const setCount = (
  value: string,
  element: HTMLElement = document.querySelector(
    '.todo-tasks-count'
  ) as HTMLElement
) => {
  element.innerText =  `${value} tasks left`
}

// SETUP IN TASK SECTION