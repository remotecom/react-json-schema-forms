export function Loading() {
  return (
    <div className="flex justify-center">
      <div className="text-primary">Loading</div>
      <div className="flex space-x-1 mt-4">
        <span className="sr-only">Loading...</span>
        <div className="h-0.5 w-0.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-0.5 w-0.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-0.5 w-0.5 bg-primary rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}
