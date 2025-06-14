import { useAdminEvents } from '@/Api/Admin/Events';
import { useCallProfileInfo } from '@/hooks/Profile';
import { useToast } from '@/hooks/use-toast';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Button } from '../../ui/button';

interface JoinEventProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
    title?: string;
    id?: string;
}

export const DeleteEvent = ({ open, onOpenChange, onSuccess, title, id }: JoinEventProps) => {
    const { getAllEventsByToken } = useCallProfileInfo();
    const { toast } = useToast();

    const { deleteEvent, isLoading } = useAdminEvents();

    const handleDeleteEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault();
            const res = await deleteEvent(id as string);
            if (res && res.success) {
                getAllEventsByToken({ type: undefined });
                onSuccess?.();
                toast({
                    title: "Event Deleted",
                    description: "Event Deleted Successfully",
                    variant: "default",
                    duration: 1000,
                });
            }
        } catch (error) {
            console.error("Error creating intrest:", error);
        }
    }

    return (
        < Dialog.Root open={open} onOpenChange={onOpenChange} >
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm animate-fade-in z-50" />
                <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg">
                    <Dialog.Title className="text-xl font-semibold text-red-500">
                        Delete Event
                    </Dialog.Title>
                    <>
                        <div className='text-red-600 font-bold'>You are about to delete the Event <span className='text-blue-500 font-bold text-lg'>{title}</span>. <p>Are you sure ?</p></div>
                        <Button isLoading={isLoading.deleteEvent} onClick={handleDeleteEvent} variant="destructive">Delete Event</Button>
                        <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </Dialog.Close>
                    </>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}