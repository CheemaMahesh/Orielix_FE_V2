import { useProfile } from '@/Api/Profile';
import { useCallProfileInfo } from '@/hooks/Profile';
import { EventType } from '@/reducers/events';
import * as Dialog from '@radix-ui/react-dialog';
import { DialogClose, DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import dayjs from 'dayjs';
import {
    Calendar as CalendarIconSolid,
    Users as UserGroupIcon,
    X
} from 'lucide-react';
import { Button } from '../ui/button';

export type RegisterEventProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    event: EventType;
    onSuccess?: () => void;
    isEvent?: boolean;
};

export const RegisterEvent = ({ open, onOpenChange, event, onSuccess, isEvent = true }: RegisterEventProps) => {
    const { joinEvent, isLoading } = useProfile();
    const { getAllEventsByToken } = useCallProfileInfo();

    const handleJoinEvent = async () => {
        try {
            const res = await joinEvent(event?.id);
            if (res?.success) {
                onOpenChange(false);
                getAllEventsByToken({ type: undefined });
                onSuccess();
            }
        } catch (err) {
            console.log("Error during joinEvent:", err);
        }
    }
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm animate-fade-in z-50" />
                <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg">
                    <div className="relative h-32 w-full overflow-hidden">
                        <img
                            src={event.eventImage}
                            alt={event.eventName}
                            className="w-full h-full object-cover blur-sm scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/70 to-purple-600/70 mix-blend-multiply"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg">
                                <CalendarIconSolid className="h-10 w-10 text-indigo-600" />
                            </div>
                        </div>
                    </div>

                    <div className="p-6 pt-5 relative z-10">
                        <div className="mb-4">
                            <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Register for {isEvent ? "Event" : "Session"}
                            </DialogTitle>
                            <DialogDescription className="text-center mt-2">
                                You're registering for <span className="font-semibold text-gray-800">{event.eventName}</span> on {dayjs(event.eventDate).format("MMM DD, YYYY")}.
                            </DialogDescription>
                        </div>

                        <div className="mb-6 space-y-4">
                            <div className="p-4 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 rounded-xl border border-indigo-100/80 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                                <div className="flex items-center gap-3 relative z-10">
                                    <div className="bg-white p-2 rounded-full shadow-sm">
                                        <UserGroupIcon className="h-5 w-5 text-indigo-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-600">Join <span className="font-medium text-indigo-700">{event._count?.joinedUsers || 0}</span> others who have already registered!</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-gradient-to-r from-indigo-50/80 to-indigo-50/30 rounded-xl border border-indigo-100/80 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                                <div className="flex items-center gap-3 relative z-10">
                                    <div className="bg-white p-2 rounded-full shadow-sm">
                                        <CalendarIconSolid className="h-5 w-5 text-indigo-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-600">{dayjs(event.eventDate).format("MMM DD, YYYY")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mb-6">
                            <p className="text-sm text-gray-600">A confirmation email will be sent with all event details and your registration code.</p>
                        </div>

                        <div className='flex items-center justify-end gap-3 pt-4'>
                            <Button
                                variant='ghost'
                                className='border border-gray-300 border-solid hover:border-0'
                                onClick={() => onOpenChange(false)}>Cancel</Button>

                            <Button
                                onClick={handleJoinEvent}
                                isLoading={isLoading.joinevent}
                                className={`bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-500 ease-in-out hover:scale-[1.03]`}
                            >
                                Register
                            </Button></div>
                    </div>
                    <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </DialogClose>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};