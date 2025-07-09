import Link from "next/link";
import { Badge } from "../ui/badge";
import { Play } from "lucide-react";

export default function Next({ name, artist, image, id, next = true }) {
    return (
        <Link href={`/${id}`}>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-card hover:shadow-lg transition-transform transform hover:scale-105">
                <img src={image} alt={name} className="w-12 h-12 object-cover rounded-lg" />
                <div className="flex-1">
                    <h1 className="text-lg font-semibold text-foreground truncate max-w-[150px] sm:max-w-md">
                        {name}
                    </h1>
                    <p className="text-xs text-muted-foreground truncate">
                        by <span className="font-semibold text-secondary-foreground">{artist}</span>
                    </p>
                </div>
                {next ? (
                    <Badge variant="outline" className="!font-normal text-primary-foreground border-primary">
                        Next
                    </Badge>
                ) : (
                    <Badge variant="default" className="text-primary-foreground">
                        <Play size={16} className="w-4 h-4" />
                    </Badge>
                )}
            </div>
        </Link>
    );
}
