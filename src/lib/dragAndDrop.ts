export function draggable(node: HTMLElement, data: any) {
  let state = data

  node.draggable = true
  node.style.cursor = "grab"

  function handleDragStart(event: DragEvent) {
    event?.dataTransfer?.setData("text/plain", state)
  }

  node.addEventListener("dragstart", handleDragStart)

  return {
    update(data: any) {
      state = data
    },
    destroy() {
      node.removeEventListener("dragstart", handleDragStart)
    }
  }
}

export function dropZone(node: HTMLElement, options: any) {
  let state = {
    dropEffect: "move",
    dragOverClass: "droppable",
    ...options
  }

  function handleDragEnter(event: any) {
    event.target.classList.add(state.dragOverClass)
  }

  function handleDragLeave(event: any) {
    event.target.classList.remove(state.dragOverClass)
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault()
    if (event.dataTransfer?.dropEffect) {
      event.dataTransfer.dropEffect = state.dropEffect
    }
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault()
    const data = event?.dataTransfer?.getData("text/plain")
    // @ts-ignore
    event.target.classList.remove(state.dragOverClass)
    state.onDropZone({ id: data, columnId: state.columnId }, event)
  }

  node.addEventListener("dragenter", handleDragEnter)
  node.addEventListener("dragleave", handleDragLeave)
  node.addEventListener("dragover", handleDragOver)
  node.addEventListener("drop", handleDrop)

  return {
    update(options: any) {
      state = {
        dropEffect: "move",
        dragOverClass: "droppable",
        ...options
      }
    },
    destroy() {
      node.removeEventListener("dragenter", handleDragEnter)
      node.removeEventListener("dragleave", handleDragLeave)
      node.removeEventListener("dragover", handleDragOver)
      node.removeEventListener("drop", handleDrop)
    }
  }
}
