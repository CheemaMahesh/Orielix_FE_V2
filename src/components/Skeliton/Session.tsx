import { Card, CardContent } from "../ui/card";

export const Session = () => {
    return (
        <Card className="overflow-hidden border-0 bg-gradient-to-b from-white to-purple-50/30 shadow-xl rounded-xl">
            <div className="relative h-52 bg-gray-200 animate-pulse"></div>
            <CardContent className="p-4 sm:p-6">
                <div className="h-6 bg-gray-200 rounded-md mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
                <div className="flex items-center mb-4">
                    <div className="h-8 w-8 bg-gray-200 rounded-full mr-2 animate-pulse"></div>
                    <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded-md mb-1 animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded-md animate-pulse"></div>
                    </div>
                    <div className="ml-auto h-6 w-16 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
                <div className="flex gap-2 mt-4">
                    <div className="flex-1 h-10 bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="flex-1 h-10 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
            </CardContent>
        </Card>
    );
}
