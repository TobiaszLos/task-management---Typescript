export const setTitle = (
  value: string,
  element: HTMLElement = document.querySelector(
    '.todo-tasks-title'
  ) as HTMLElement
) => {
  element.innerText = value

}

export const setCount = () => {}
