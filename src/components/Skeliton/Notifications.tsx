import { Skeleton } from "antd";

export const NotificationsSkeleton = () => (
    <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header Skeleton */}
            <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-100 via-purple-50 to-indigo-100 shadow-xl border border-indigo-100/50">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute h-40 w-40 -top-10 -right-10 bg-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute h-60 w-60 bottom-20 -left-20 bg-indigo-300/30 rounded-full blur-3xl animate-pulse opacity-70"></div>
                    <div className="absolute h-20 w-20 top-1/2 right-10 bg-purple-400/20 rounded-full blur-xl animate-pulse opacity-80"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] bg-[length:20px_20px] opacity-10"></div>
                </div>
                <div className="relative p-8 flex flex-col md:flex-row items-center gap-8 z-10">
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-75 group-hover:opacity-100 blur-sm group-hover:blur transition duration-300"></div>
                        <div className="bg-white p-4 rounded-full relative shadow-xl flex items-center justify-center">
                            <Skeleton.Avatar active size={48} shape="circle" />
                        </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <Skeleton.Input active size="large" style={{ width: 200, height: 32, marginBottom: 8 }} />
                                <Skeleton.Input active size="small" style={{ width: 220, height: 20 }} />
                            </div>
                            <Skeleton.Button active size="large" style={{ width: 160, height: 40 }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications Content Skeleton */}
            <div className="mt-6">
                <div className="shadow-md border border-indigo-100 rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4">
                        <Skeleton.Input active size="small" style={{ width: 180, height: 24, marginBottom: 4 }} />
                        <Skeleton.Input active size="small" style={{ width: 120, height: 16 }} />
                    </div>
                    <div className="divide-y divide-indigo-100">
                        {[...Array(3)].map((_, idx) => (
                            <div
                                key={idx}
                                className="p-4 sm:p-6 flex items-start gap-4"
                            >
                                <Skeleton.Avatar active size={40} shape="circle" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <Skeleton.Input active size="small" style={{ width: "60%", height: 18 }} />
                                        <Skeleton.Input active size="small" style={{ width: 60, height: 16 }} />
                                    </div>
                                    <Skeleton.Input active size="small" style={{ width: "90%", height: 14, marginTop: 8 }} />
                                    <Skeleton.Input active size="small" style={{ width: "70%", height: 14, marginTop: 6 }} />
                                    <div className="mt-3">
                                        <Skeleton.Button active size="small" style={{ width: 100, height: 28 }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </main>
);