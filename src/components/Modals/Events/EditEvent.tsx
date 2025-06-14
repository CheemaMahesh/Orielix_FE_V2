import { useAdminEvents } from '@/Api/Admin/Events';
import { useProfile } from '@/Api/Profile';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { useCallProfileInfo } from '@/hooks/Profile';
import { useToast } from '@/hooks/use-toast';
import { EventType } from '@/reducers/events';
import { RootState } from '@/store';
import { upload } from '@imagekit/react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../../ui/button';
import { message } from 'antd';
import { eventTypes } from '@/lib/constants';

interface JoinEventProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
    event?: EventType;
    onEventChange?: (event: EventType) => void;
}

export const EditEvent = ({ open, onOpenChange, onSuccess, onEventChange, event }: JoinEventProps) => {
    const { getAllEventsByToken } = useCallProfileInfo();
    const { toast } = useToast();
    const { user: users } = useSelector((state: RootState) => state.allUserSlice)

    const { EditEvent, isLoading } = useAdminEvents();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { getProfileKeys } = useProfile();

    const updateEvent = ({ type, value }: { type: string, value: string }) => {
        if (event) {
            onEventChange?.({
                ...event,
                [type]: value
            })
        }
    }

    const handleUpload = async () => {
        const file = fileInputRef.current?.files?.[0];
        if (!file) return;

        try {
            const { signature, expire, token, publicKey } = (await getProfileKeys()).data;
            const response = await upload({
                file,
                fileName: file.name,
                signature,
                expire,
                token,
                publicKey,
            });
            updateEvent({ type: "eventImage", value: response.url })
        } catch (err) {
            console.error(err);
        };
    }

    const uploadAnBanner = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.size > 5 * 1024 * 1024) {
            message.error("File size should be less than or equal to 5MB");
            fileInputRef.current!.value = "";
            return;
        }
        if (file) {
            handleUpload();
        }
    };

    const filteredUsers = users.filter((user) => user.userType === "presenter" || user.userType === "admin" || user.userType === "superAdmin" || user.userType === "ta");

    const handleUpdateEvent = async () => {
        try {
            if (!event.eventName || !event.eventDescription || !event.eventDate || !event.eventImage || !event.eventTime || !event.duration || !event.eventType) {
                toast({
                    title: "Please fill all the fields",
                    variant: "destructive",
                });
                return;
            }
            const { eventName, eventDate, eventDescription, presenterId, eventImage, eventTime, eventLocation, id, duration, eventType } = event;
            const payload = {
                eventName,
                eventDate,
                eventDescription,
                presenterId,
                eventImage,
                eventTime,
                eventLocation,
                eventId: id,
                duration,
                eventType,
            }
            await EditEvent(payload);
            getAllEventsByToken({ type: undefined });
            onSuccess?.();
        } catch (error) {
            console.error("Error creating intrest:", error);
        }
    }

    const selectedPresenter = filteredUsers.find((user) => user?.id?.toString() === event?.presenterId);

    return (
        < Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm animate-fade-in z-50" />
                <Dialog.Content className="fixed left-[50%] top-[50%] h-[90vh] translate-x-[-50%] translate-y-[-50%] z-50 grid w-6/12  gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg">
                    <Dialog.Title className="text-xl font-semibold text-gray-900">
                        Create Event
                    </Dialog.Title>
                    <Dialog.Description className="text-sm text-gray-500">
                    </Dialog.Description>
                    <section className='border-2 border-gray-300 rounded-lg p-4 overflow-y-scroll h-full'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="eventName" className='text-sm font-semibold'>Event Name</label>
                                <input value={event?.eventName} required onChange={(e) => {
                                    e.preventDefault();
                                    updateEvent({ type: "eventName", value: e.target.value })
                                }} type="text" id="eventName" placeholder='Enter Intrest Name' className='border-2 border-gray-300 rounded-lg p-2' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="eventDescription" className='text-sm font-semibold'>Event Description</label>
                                <input value={event?.eventDescription} required onChange={(e) => {
                                    e.preventDefault();
                                    updateEvent({ type: "eventDescription", value: e.target.value })
                                }} id="eventDescription" placeholder='Enter Intrest Description' className='border-2 border-gray-300 rounded-lg p-2' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="eventDate" className='text-sm font-semibold'>Event Date</label>
                                <input value={event?.eventDate} type="date"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        updateEvent({ type: "eventDate", value: e.target.value })
                                    }}
                                    className='border-2 border-gray-300 rounded-lg p-2'
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="eventImage" className='text-sm font-semibold'>Event Image</label>
                                <input required onChange={(e) => {
                                    e.preventDefault();
                                    uploadAnBanner(e);
                                }} id="eventImage" ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="mb-4"
                                    placeholder='Upload Event Image'
                                />
                                {event?.eventImage && (
                                    <img
                                        src={event?.eventImage}
                                        alt="Preview"
                                        className="mb-4 w-32 h-32 rounded object-cover aspect-square"
                                    />
                                )}
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="eventTime" className='text-sm font-semibold'>Event Time</label>
                                <input value={event?.eventTime} type="time" required onChange={(e) => {
                                    e.preventDefault();
                                    updateEvent({ type: "eventTime", value: e.target.value })
                                }} id="eventTime" placeholder='Enter Intrest Description' className='border-2 border-gray-300 rounded-lg p-2' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="duration" className='text-sm font-semibold'>Event Duration</label>
                                <input value={event?.duration} type="number" required onChange={(e) => {
                                    e.preventDefault();
                                    updateEvent({ type: "duration", value: e.target.value })
                                }} id="duration" placeholder='Enter Intrest Description' className='border-2 border-gray-300 rounded-lg p-2' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="eventLocation" className='text-sm font-semibold'>Event Location</label>
                                <input value={event?.eventLocation} required onChange={(e) => {
                                    e.preventDefault();
                                    updateEvent({ type: "eventLocation", value: e.target.value })
                                }} id="eventLocation" placeholder='Enter Intrest Description' className='border-2 border-gray-300 rounded-lg p-2' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="e" className='text-sm font-semibold'>Event Presenter</label>
                                <Select
                                    value={event?.presenterId?.toString()}
                                    onValueChange={(value) => updateEvent({ type: "presenterId", value })}
                                >
                                    <SelectTrigger>{selectedPresenter ? (selectedPresenter.username || selectedPresenter.firstName) : "Select Presenter"}</SelectTrigger>
                                    <SelectContent>
                                        {filteredUsers?.map((user) => (
                                            <SelectItem value={user.id.toString()} key={user.id}> <div className='cursor-pointer'>
                                                <div className='text-black font-semibold'>{user.username || user.firstName}</div>
                                                <div className='text-gray-700 text-xs'>{user.email}</div>
                                            </div></SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="e" className='text-sm font-semibold'>Event Type</label>
                                <Select
                                    value={event?.eventType || ""}
                                    onValueChange={(value) => updateEvent({ type: "eventType", value })}
                                >
                                    <SelectTrigger>{event?.eventType || "Select Event Type"}</SelectTrigger>
                                    <SelectContent>
                                        {eventTypes?.map((item) => (
                                            <SelectItem value={item} key={item}>
                                                <div className='text-black font-semibold cursor-pointer'>{item}</div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </section>
                    <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Dialog.Close>
                    <Button isLoading={isLoading.editEvent} onClick={handleUpdateEvent} variant="default">Update Event</Button>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root >
    )
}