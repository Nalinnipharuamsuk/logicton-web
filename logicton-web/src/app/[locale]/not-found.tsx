import Link from 'next/link';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 px-4 text-center">
            <div className="bg-muted p-6 rounded-full">
                <FileQuestion className="h-16 w-16 text-muted-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Page Not Found</h2>
            <p className="text-lg text-muted-foreground max-w-[500px]">
                Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
            </p>
            <Link
                href="/"
                className="mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
            >
                Return Home
            </Link>
        </div>
    );
}
