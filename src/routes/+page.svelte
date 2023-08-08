<script lang="ts">
  export let left = 100
  export let top = 100
  let dragging = false

  function handleDrag(event: { movementX: number; movementY: number }) {
    if (dragging) {
      left += event.movementX
      top += event.movementY
    }
  }

  function mouseEnter() {

  }
</script>

<div class="h-[500px] w-[500px] border-2 border-white">
  <section
    class="draggable rounded-md bg-pink-400"
    on:mousedown={() => (dragging = true)}
    style="left: {left}px; top: {top}px;"
  >
    <p class="text-white">Drag me</p>
  </section>
</div>
<svelte:window
  on:mouseup={() => (dragging = false)}
  on:mousemove={handleDrag}
/>

<style lang="postcss">
  .draggable {
    user-select: none;
    cursor: move;
    border: solid 1px gray;
    position: absolute;
    padding: 50px;
  }
</style>
