import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="select-none">
            <div>
            <h1 className="text-xl font-bold">TATA<span className="opacity-50">Saavn</span></h1>
            </div>
        </Link>
    )
}