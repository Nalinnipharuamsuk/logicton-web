'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 px-4 text-center">
            <div className="bg-destructive/10 p-4 rounded-full">
                <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold">Something went wrong!</h2>
            <p className="text-muted-foreground max-w-[500px]">
                {error.message || "An unexpected error occurred. Please try again later."}
            </p>
            <button
                onClick={reset}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
                Try again
            </button>
        </div>
    );
}
