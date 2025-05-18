import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import { useCallProfileInfo } from '@/hooks/Profile';
import { useAdminIntrests } from '@/Api/Admin/Intrests';
import { useToast } from '@/hooks/use-toast';
import { IntrestType } from '@/reducers/Intrests';

interface EditIntrestProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
    currentIntrest: IntrestType | null;
    setCurrentIntrest: (intrest: IntrestType | null) => void;
}



export const EditIntrest = ({ open, onOpenChange, onSuccess, currentIntrest, setCurrentIntrest }: EditIntrestProps) => {
    const { getAllIntrestsByToken } = useCallProfileInfo();
    const { toast } = useToast();

    const { editIntrest, isLoading } = useAdminIntrests();

    const updateIntrest = ({ type, value }: { type: string, value: string }) => {
        if (!currentIntrest) return;
        setCurrentIntrest({
            ...currentIntrest,
            [type]: value
        });
    }

    const handleEditIntrest = async () => {
        try {
            if (!currentIntrest.name || !currentIntrest.description) {
                toast({
                    title: "Please fill all the fields",
                    variant: "destructive",
                });
                return;
            }
            await editIntrest({
                name: currentIntrest.name,
                description: currentIntrest.description,
                id: currentIntrest.id,
            });
            getAllIntrestsByToken();
            onSuccess();
        } catch (error) {
            console.error("Error creating intrest:", error);
        }
    }

    const onClose = () => {
        onOpenChange(false);
        setCurrentIntrest(null);
    }

    return (
        < Dialog.Root open={open} onOpenChange={onClose} >
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm animate-fade-in z-50" />
                <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg">
                    <Dialog.Title className="text-xl font-semibold text-gray-900">
                        Edit Intrest
                    </Dialog.Title>
                    <Dialog.Description className="text-sm text-gray-500">
                    </Dialog.Description>
                    <section className='border-2 border-gray-300 rounded-lg p-4'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="name" className='text-sm font-semibold'>Intrest Name</label>
                                <input value={currentIntrest?.name || ""} required onChange={(e) => {
                                    e.preventDefault();
                                    updateIntrest({ type: "name", value: e.target.value })
                                }} type="text" id="name" placeholder='Enter Intrest Name' className='border-2 border-gray-300 rounded-lg p-2' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="description" className='text-sm font-semibold'>Intrest Description</label>
                                <textarea value={currentIntrest?.description || ""} required onChange={(e) => {
                                    e.preventDefault();
                                    updateIntrest({ type: "description", value: e.target.value })
                                }} id="description" placeholder='Enter Intrest Description' className='border-2 border-gray-300 rounded-lg p-2' />
                            </div>
                            <Button isLoading={isLoading.editIntrest} onClick={handleEditIntrest} variant="default">Edit Intrest</Button>
                        </div>
                    </section>
                    <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root >
    )
}