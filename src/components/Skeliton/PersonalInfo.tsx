import { Skeleton } from "antd";

// ...existing code...

export const PersonalInfoSkeleton = () => {
    return (
        <div className="rounded-2xl overflow-hidden bg-white/80 backdrop-blur-md shadow-xl border border-indigo-100/50">
            <div className="p-4 md:p-8">
                <div className="flex items-center justify-between gap-2 md:gap-3 mb-3 md:mb-4">
                    <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                        <div className="p-1.5 md:p-2 rounded-full bg-indigo-100">
                            <Skeleton.Avatar active size="default" shape="circle" />
                        </div>
                        <Skeleton.Input style={{ width: 180, height: 28 }} active size="default" />
                    </div>
                    <Skeleton.Button style={{ width: 70 }} active size="small" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 p-3 md:p-4 rounded-xl bg-white border border-indigo-200"
                        >
                            <Skeleton.Input style={{ width: "100%", height: 40 }} active size="default" />
                        </div>
                    ))}
                </div>
                <div className="w-full flex justify-end py-2 p-x1 gap-3">
                    <Skeleton.Button style={{ width: 80 }} active size="small" />
                    <Skeleton.Button style={{ width: 80 }} active size="small" />
                </div>
            </div>
        </div>
    );
}

// Usage example:
// {isLoadingProfile ? <PersonalInfoSkeleton /> : <YourPersonalInfoSection />}