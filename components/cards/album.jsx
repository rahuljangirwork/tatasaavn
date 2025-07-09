import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";

export default function AlbumCard({ title, image, artist, id, desc, lang }) {
    return (
        <div className="h-fit w-[200px]">
            <div className="overflow-hidden rounded-md">
                {image ? (
                    <Link href={`/${id}`}>
                        <img src={image} alt={title} className="h-[182px] w-full bg-secondary/60 rounded-md transition hover:scale-105 cursor-pointer" />
                    </Link>
                ) : (
                    <Skeleton className="w-full h-[182px]" />
                )}
            </div>
            <div className="p-3">
                {title ? (
                    <Link href={`/${id}`} className="flex items-center justify-between">
                        <h1 className="text-lg font-semibold text-foreground hover:text-primary-foreground truncate max-w-full">
                            {title.slice(0, 20)}{title.length > 20 && '...'}
                        </h1>
                    </Link>
                ) : (
                    <Skeleton className="w-[70%] h-4 mt-2" />
                )}
                {desc && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{desc}</p>
                )}
                {artist ? (
                    <>
                        <p className="text-sm font-medium text-muted-foreground mt-2">
                            {artist.slice(0, 20)}{artist.length > 20 && '...'}
                        </p>
                        {lang && (
                            <Badge variant="outline" className="mt-2 text-sm text-accent-foreground">
                                {lang}
                            </Badge>
                        )}
                    </>
                ) : (
                    <Skeleton className="w-10 h-2 mt-2" />
                )}
            </div>
        </div>
    )
}