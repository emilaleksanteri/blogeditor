<script lang="ts">
  import { draggable, dropZone } from "$lib/dragAndDrop"
  import type { PageData } from "./$types"
  export let data: PageData
</script>

<ul>
  {#each data.columns as column}
    {@const elements = data.elements.filter(
      (ele) => ele.columnId === column.id
    )}
    <li
      class="h-60 w-60 border-2 border-white p-2 text-white"
      class:area={true}
      use:dropZone={{
        onDropZone(columnData) {
          const card = data.elements.find((e) => e.id === Number(columnData.id))
          if (card) {
            if (card.columnId === 1 && columnData.columnId === 2) {
              const newCard = {
                title: card.title,
                id: Math.floor(Math.random() * 10000),
                columnId: 2,
              }
              data = {
                ...data,
                elements: data.elements.concat(newCard),
              }
            } else if (card.columnId === 2 && columnData.columnId === 1) {
              data = {
                ...data,
                elements: data.elements.filter((ele) => ele.id !== card.id),
              }
            } else if (card.columnId === 2 && columnData.columnId === 2) {
              const removeCard = data.elements.filter((ele) => ele.id !== card.id)
              data = {
                ...data,
                elements: removeCard.concat(card)
              }
            }
          }
        },
        columnId: column.id,
      }}
    >
      <ul>
        {#each elements as element}
          <li class="text-white" use:draggable={element.id}>{element.title}</li>
        {/each}
      </ul>
    </li>
  {/each}
</ul>

<style lang="postcss">
  .area:global(.droppable) {
    outline: 0.1rem solid red;
    outline-offset: 0.25rem;
  }

  .area:global(.droppable) * {
    pointer-events: none;
  }
</style>
