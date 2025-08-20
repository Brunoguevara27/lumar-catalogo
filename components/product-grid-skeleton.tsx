import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden border-0 bg-muted">
          <div className="aspect-square overflow-hidden bg-white p-4">
            <Skeleton className="w-full h-full" />
          </div>
          <CardHeader className="p-4">
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-2" />
            <Skeleton className="h-6 w-20" />
          </CardContent>
          <CardFooter className="p-4">
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
