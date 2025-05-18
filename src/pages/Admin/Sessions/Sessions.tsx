import { AddEvent } from "@/components/Modals/Events/AddEvent";
import { Button } from "@/components/ui/button";
import { SessionType } from "@/reducers/sessions";
import { RootState } from "@/store";
import { DeleteIcon } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AddSession } from "@/components/Modals/Sessions/AddSession";
import { EditSession } from "@/components/Modals/Sessions/EditSession";
import { createSessionPayloadType } from "@/Api/Admin/Sessions";
import { DeleteSession } from "@/components/Modals/Sessions/DeleteSession";


export const Sessions = () => {
    const { sessions, loading: isLoading } = useSelector((state: RootState) => state.sessionsSlice);
    const isValid = sessions && sessions.length > 0;
    const [openCreate, setOpenCreate] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [selectedSession, setSelectedSession] = useState<createSessionPayloadType | null>(null);
    const [openEdit, setOpenEdit] = useState<boolean>(false);

    const handleOpenDelete = (session: createSessionPayloadType) => {
        setSelectedSession(session);
        setOpenDelete(true);
    }

    const handleOpenEdit = (session: createSessionPayloadType) => {
        setSelectedSession(session);
        setOpenEdit(true);
    }

    return (
        <section className="gap-10 border-2 border-solid border-gray-500 rounded-lg shadow hover:shadow-md">
            <div className="flex flex-col gap-3">{isValid && sessions.map((session) => {
                const { id, name, description } = session;
                return (<div className="flex gap-10 border-2 border-solid border-gray-50 items-center justify-between px-2 py-1"><div className="flex flex-col gap-1"><div>{name}</div>
                    <div className="truncate max-w-56 text-xs text-gray-500">{description}</div></div><div className="flex gap-3 items-center"><DeleteIcon onClick={(e) => handleOpenDelete(session)} /><Button variant="default" onClick={() => handleOpenEdit(session)}>Edit</Button></div></div>)
            })}</div>
            <div className="w-full flex justify-end items-center p-1">
                <Button onClick={() => setOpenCreate(true)}>Add a Session</Button>
                <AddEvent open={openCreate} onOpenChange={setOpenCreate} />
                <AddSession open={openCreate} onOpenChange={setOpenCreate} onSuccess={() => setOpenCreate(false)} />
                {openEdit && <EditSession open={openEdit} onOpenChange={setOpenEdit} currentSession={selectedSession} setCurrentSession={setSelectedSession} onSuccess={() => setOpenEdit(false)} />}
                {openDelete && <DeleteSession open={openDelete} onOpenChange={setOpenDelete} onSuccess={() => setOpenDelete(false)} title={selectedSession?.name} id={selectedSession?.id} />}
            </div>
        </section>
    )
}