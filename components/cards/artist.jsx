import Link from "next/link";
import { useEffect, useState } from "react";

export default function ArtistCard({ image, name, id }) {
    const [inView, setInView] = useState(false);

    // Check if the element is in the viewport
    useEffect(() => {
        const handleScroll = () => {
            const rect = document.getElementById(id).getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                setInView(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Check on mount
        return () => window.removeEventListener("scroll", handleScroll);
    }, [id]);

    return (
        <Link href={`/search/${encodeURIComponent(name.toLowerCase().split(" ").join("+"))}`}>
            <div
                id={id}
                className={`overflow-hidden h-[120px] w-[120px] rounded-md transition-all duration-300 ${inView ? 'opacity-100 animate-fade-in' : 'opacity-0'}`}
            >
                <img
                    src={image}
                    alt={name}
                    className="hover:scale-105 transition-transform duration-200 cursor-pointer rounded-full h-[120px] w-[120px] object-cover"
                />
            </div>
            <div className="mt-3 text-center">
                <h1 className="text-sm font-medium text-foreground truncate max-w-[120px] mx-auto">
                    {name.split(" ")[0] || null} {name.split(" ")[1] || null}
                </h1>
            </div>
        </Link>
    );
}
