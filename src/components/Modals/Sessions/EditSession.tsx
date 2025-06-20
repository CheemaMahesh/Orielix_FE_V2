import { createSessionPayloadType, useAdminSessions } from '@/Api/Admin/Sessions';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { useCallProfileInfo } from '@/hooks/Profile';
import { useToast } from '@/hooks/use-toast';
import { RootState } from '@/store';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Button } from '../../ui/button';
import { sessionCategories, sessionTypes } from '@/lib/constants';

interface JoinSessionProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
    setCurrentSession?: (session: createSessionPayloadType) => void;
    currentSession?: createSessionPayloadType;
}


export const EditSession = ({ open, onOpenChange, onSuccess, currentSession, setCurrentSession }: JoinSessionProps) => {
    const { getAllSessionsByToken } = useCallProfileInfo();
    const { toast } = useToast();
    const { user: users } = useSelector((state: RootState) => state.allUserSlice);

    const { editSession, isLoading } = useAdminSessions();
    const updateSession = ({ type, value }: { type: string, value: string }) => {
        setCurrentSession({
            ...currentSession,
            [type]: value
        })
    }

    const filteredUsers = users.filter((user) => user.userType === "presenter" || user.userType === "admin" || user.userType === "superAdmin" || user.userType === "ta");

    const handleEditSession = async () => {
        try {
            const { name, description, presenterId, id, date, time, image, location, duration, category, type } = currentSession;
            if (!name || !description || !date || !image || !time || !presenterId || !location || !duration || !category || !type) {
                toast({
                    title: "Please fill all the fields",
                    variant: "destructive",
                });
                return;
            }
            const payload = {
                name, description,
                date,
                image,
                time,
                location,
                presenterId,
                duration,
                sessionId: id,
                category,
                type,
            }
            await editSession(payload);
            getAllSessionsByToken({ category: undefined, type: undefined });
            onSuccess?.();
        } catch (error) {
            console.error("Error creating intrest:", error);
        }
    }

    const selectedPresenter = filteredUsers.find((user) => user?.id?.toString() === currentSession?.presenterId);

    return (
        < Dialog.Root open={open} onOpenChange={onOpenChange} >
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm animate-fade-in z-50" />
                <Dialog.Content className="fixed left-[50%] top-[50%] h-[90vh] translate-x-[-50%] translate-y-[-50%] z-50 grid w-6/12  gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg">
                    <Dialog.Title className="text-xl font-semibold text-gray-900">
                        Edit Session
                    </Dialog.Title>
                    <Dialog.Description className="text-sm text-gray-500">
                    </Dialog.Description>
                    <section className='border-2 border-gray-300 rounded-lg p-4 overflow-y-scroll h-full'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="name" className='text-sm font-semibold'>Session Name</label>
                                <input value={currentSession?.name} required onChange={(e) => {
                                    e.preventDefault();
                                    updateSession({ type: "name", value: e.target.value })
                                }} type="text" id="name" placeholder='Enter Intrest Name' className='border-2 border-gray-300 rounded-lg p-2' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="description" className='text-sm font-semibold'>Session Description</label>
                                <input value={currentSession?.description} required onChange={(e) => {
                                    e.preventDefault();
                                    updateSession({ type: "description", value: e.target.value })
                                }} id="description" placeholder='Enter Session Description' className='border-2 border-gray-300 rounded-lg p-2' />
                            </div>
                            {/* ----------------------------------- */}
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="date" className='text-sm font-semibold'>Session Date</label>
                                <input value={currentSession?.date} type="date"
                                    onChange={(e) => {
                                        updateSession({ type: "date", value: e.target.value })
                                    }}
                                    className='border-2 border-gray-300 rounded-lg p-2'
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="image" className='text-sm font-semibold'>Session Image</label>
                                <input value={currentSession?.image} required onChange={(e) => {
                                    e.preventDefault();
                                    updateSession({ type: "image", value: e.target.value })
                                }} id="image" placeholder='Enter Intrest Description' className='border-2 border-gray-300 rounded-lg p-2' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="time" className='text-sm font-semibold'>Session Time</label>
                                <input value={currentSession?.time} type="time" required onChange={(e) => {
                                    e.preventDefault();
                                    updateSession({ type: "time", value: e.target.value })
                                }} id="time" placeholder='Enter Intrest Description' className='border-2 border-gray-300 rounded-lg p-2' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="location" className='text-sm font-semibold'>Session Location</label>
                                <input value={currentSession?.location} required onChange={(e) => {
                                    e.preventDefault();
                                    updateSession({ type: "location", value: e.target.value })
                                }} id="location" placeholder='Enter Session Location' className='border-2 border-gray-300 rounded-lg p-2' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="e" className='text-sm font-semibold'>Session Presenter</label>
                                <Select
                                    value={currentSession?.presenterId.toString()}
                                    onValueChange={(value) => updateSession({ type: "presenterId", value })}
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
                                <label htmlFor="duration" className='text-sm font-semibold'>Session Duration (In Minutes)</label>
                                <input value={currentSession?.duration} type='number' required onChange={(e) => {
                                    e.preventDefault();
                                    updateSession({ type: "duration", value: e.target.value })
                                }} id="duration" placeholder='Enter Session Duration' className='border-2 border-gray-300 rounded-lg p-2' />
                            </div>

                            <Select
                                value={currentSession.category || ""}
                                onValueChange={(value) => updateSession({ type: "category", value })}
                            >
                                <SelectTrigger>{currentSession.category || "Select Session Category"}</SelectTrigger>
                                <SelectContent>
                                    {sessionCategories?.map((category) => (
                                        <SelectItem value={category} key={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select
                                value={currentSession.type || ""}
                                onValueChange={(value) => updateSession({ type: "type", value })}
                            >
                                <SelectTrigger>{currentSession.type || "Select Session Type"}</SelectTrigger>
                                <SelectContent>
                                    {sessionTypes?.map((type) => (
                                        <SelectItem value={type} key={type}>
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {/* ----------------------------------- */}
                        </div>
                    </section>
                    <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Dialog.Close>
                    <Button isLoading={isLoading.session} onClick={handleEditSession} variant="default">Create Session</Button>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root >
    )
}