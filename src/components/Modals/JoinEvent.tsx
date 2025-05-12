import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { useProfile } from '@/Api/Profile';
import { toast } from 'sonner';
import { useCallProfileInfo } from '@/hooks/Profile';

interface JoinEventProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    eventName: string;
    eventId: string;
}

export const JoinEvent = ({ open, setOpen, eventName, eventId }: JoinEventProps) => {
    const { joinEvent, isLoading } = useProfile();
    const { getAllEventsByToken } = useCallProfileInfo();
    console.log("isLoading", isLoading);

    const handleJoinEvent = async () => {
        try {
            const res = await joinEvent(eventId);
            if (res?.success) {
                toast.success("You have successfully joined the event.", {
                    duration: 500,
                })
                setOpen(false);
                getAllEventsByToken();
            }
        } catch (err) {
            console.log("Error during joinEvent:", err);
        }
    }
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm animate-fade-in z-50" />
                <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg">
                    <Dialog.Title className="text-xl font-semibold text-gray-900">
                        Join {eventName || "Event"}
                    </Dialog.Title>
                    <Dialog.Description className="text-sm text-gray-500">
                        <p>Are you sure you want to join this event? You will be notified about the event updates and
                            reminders.</p>
                    </Dialog.Description>

                    <div className='flex items-center justify-end gap-3 mt-4 border-t pt-4'>
                        <Button variant="destructive" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button
                            onClick={handleJoinEvent}
                            isLoading={isLoading.joinevent}
                            className={`bg-gradient-to-r from-purple-600 to-purple-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-500 ease-in-out hover:scale-[1.03]`}
                        >
                            Join
                        </Button>
                    </div>

                    <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};