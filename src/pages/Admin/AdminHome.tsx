import { adminList } from "@/data/Admin"
import { Intrests } from "./Intrests/Intrests"
import { useCallback } from "react"

export const AdminHome = () => {
    const getComponents = useCallback((props: { title: string }) => {
        switch (props.title) {
            case "Add Intrests":
                return <Intrests />
            case "Add Events":
                return <div>Add Events</div>
            case "Add Sessions":
                return <div>Add Sessions</div>
            case "Add Users":
                return <div>Add Users</div>
            case "Add Speakers":
                return <div>Add Speakers</div>
            case "Add Sponsors":
                return <div>Add Sponsors</div>
            default:
                return null
        }
    }, []);
    return (
        <section className="flex flex-col gap-10 p-4">
            {adminList?.map((item) => (
                <div key={item.id} className="text-lg cursor-pointer">
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    {getComponents({ title: item.title })}
                </div>
            ))}
        </section>
    )
}