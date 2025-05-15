import { AddIntrest } from "@/components/Modals/AddIntrest";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { DeleteIcon } from "lucide-react";

export const Intrests = () => {
    const { loading: intrestLoading, intrests } = useSelector((state: RootState) => state.intrestSlice);
    const isValid = intrests && intrests.length > 0;
    const [openCreate, setOpenCreate] = useState<boolean>(false);

    return (
        <section className="gap-10 border-2 border-solid border-gray-500 rounded-lg shadow hover:shadow-md">
            <div className="flex flex-col gap-3">{isValid && intrests.map((intrest) => {
                const { id, name, description } = intrest;
                return (<div className="flex gap-10 border-2 border-solid border-gray-50 items-center justify-between px-2 py-1"><div className="flex flex-col gap-1"><div>{name}</div>
                    <div>{description}</div></div><div className="flex gap-3 items-center"><DeleteIcon /><Button variant="default">Edit</Button></div></div>)
            })}</div>
            <div className="w-full flex justify-end items-center p-1"><Button onClick={() => setOpenCreate(true)}>Add an User Intrest</Button>
                <AddIntrest open={openCreate} onOpenChange={setOpenCreate} onSuccess={() => setOpenCreate(false)} /></div>
        </section>
    )
}