import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import { DeleteIcon } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AddEvent } from "@/components/Modals/Events/AddEvent";
import { DeleteEvent } from "@/components/Modals/Events/DeleteEvent";
import { EventType } from "@/reducers/events";
import { EditEvent } from "@/components/Modals/Events/EditEvent";


export const Events = () => {
    const { events, loading: isLoading } = useSelector((state: RootState) => state.eventSlice);
    const isValid = events && events.length > 0;
    const [openCreate, setOpenCreate] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
    const [openEdit, setOpenEdit] = useState<boolean>(false);

    const handleDeleteEvent = (event: EventType) => {
        setSelectedEvent(event);
        setOpenDelete(true);
    }
    const handleEditEvent = (event: EventType) => {
        setSelectedEvent(event);
        setOpenEdit(true);
    }

    return (
        <section className="gap-10 border-2 border-solid border-gray-500 rounded-lg shadow hover:shadow-md">
            <div className="flex flex-col gap-3">{isValid && events.map((event) => {
                const { id, eventName, eventDescription } = event;
                return (<div className="flex gap-10 border-2 border-solid border-gray-50 items-center justify-between px-2 py-1"><div className="flex flex-col gap-1"><div>{eventName}</div>
                    <div className="truncate max-w-56 text-xs text-gray-500">{eventDescription}</div></div><div className="flex gap-3 items-center"><DeleteIcon onClick={(e) => handleDeleteEvent(event)} /><Button variant="default" onClick={() => handleEditEvent(event)}>Edit</Button></div></div>)
            })}</div>
            <div className="w-full flex justify-end items-center p-1">
                <Button onClick={() => setOpenCreate(true)}>Add an Event</Button>
                <AddEvent open={openCreate} onOpenChange={setOpenCreate} onSuccess={() => setOpenCreate(false)} />
                <DeleteEvent open={openDelete} onOpenChange={setOpenDelete} onSuccess={() => setOpenDelete(false)} title={selectedEvent?.eventName} id={selectedEvent?.id} />
                <EditEvent onEventChange={setSelectedEvent} open={openEdit} event={selectedEvent} onOpenChange={setOpenEdit} onSuccess={() => setOpenEdit(false)} />
            </div>
        </section>
    )
}