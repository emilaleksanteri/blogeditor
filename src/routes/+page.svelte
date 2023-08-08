<script lang="ts">
  export let left = 200
  export let top = 200
  let containerW: number
  let containerH: number
  let dragging = false

  function handleDrag(event: { movementX: number; movementY: number }) {
    if (dragging && (typeof containerH === "number" && typeof containerW === "number")) {
      if (left < 330 && left > 0) {
        left += event.movementX
      } else {
        left = left <= 0 ? left + 10 : left - 10
      }
      if (top > 0 && top < 360) {
        top += event.movementY
      } else {
        top = top <= 0 ? top + 10 : top - 10
      }
    }
  }
</script>

<div
  bind:clientWidth={containerW}
  bind:clientHeight={containerH}
  class="relative ml-32 h-[500px] w-[500px] border-2 border-white"
>
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
