import { Skeleton } from "./ui/Skeleton";

export function Loading() {
  return (
    <div className="flex justify-center">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-secondary" />
        <Skeleton className="h-4 w-[200px] bg-secondary" />
        <Skeleton className="h-4 w-[150px] bg-secondary" />
      </div>
    </div>
  );
}
