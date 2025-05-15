import { adminList } from "@/data/Admin"

export const AdminHome = () => {
    return (
        <section className="flex flex-col gap-10 p-4">
            {adminList?.map((item) => (
                <div key={item.id} className="text-lg cursor-pointer">
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                </div>
            ))}
        </section>
    )
}