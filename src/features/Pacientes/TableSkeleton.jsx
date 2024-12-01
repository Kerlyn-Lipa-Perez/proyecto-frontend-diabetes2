import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <TableRow key={i} className="animate-pulse">
          <TableCell>
            <Skeleton className="h-6 w-[120px] bg-gray-200" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-[120px] bg-gray-200" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-[80px] bg-gray-200" />
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            <Skeleton className="h-6 w-[100px] bg-gray-200" />
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <Skeleton className="h-6 w-[80px] bg-gray-200" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-[60px] bg-gray-200" />
          </TableCell>
          <TableCell>
            <div className="flex gap-2 justify-center">
              <Skeleton className="h-8 w-8 bg-gray-200 rounded-md" />
              <Skeleton className="h-8 w-8 bg-gray-200 rounded-md" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
