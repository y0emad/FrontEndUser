export function Loading() {
  return (
    <div class="flex space-x-2 justify-center items-center bg-[#000915] h-screen ">
      <span class="sr-only">Loading...</span>
      <div class="h-8 w-8 bg-gray-200 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div class="h-8 w-8 bg-gray-200 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div class="h-8 w-8 bg-gray-200 rounded-full animate-bounce"></div>
    </div>
  );
}
