import { EventType } from '@/reducers/events';
import * as Dialog from '@radix-ui/react-dialog';
import dayjs from 'dayjs';
import {
    CheckCircle,
    X
} from 'lucide-react';
import { Button } from '../ui/button';


export type ShowEventSuccessProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    event: EventType;
}

export const ShowEventSuccess = ({ open, onOpenChange, event }: ShowEventSuccessProps) => {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm animate-fade-in z-50" />
                <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] gap-4 bg-transparent p-6 shadow-lg duration-200 sm:rounded-lg">
                    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
                        <div
                            className="relative z-[101] w-[95%] md:w-full max-w-[500px] bg-white rounded-2xl border-0 shadow-2xl p-8 animate-in fade-in-0 zoom-in-95 mx-auto my-auto text-center"
                            style={{ transform: 'translate(-50%, -50%)', left: '50%', top: '50%', position: 'fixed' }}
                        >

                            {/* Success Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
                                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 rounded-full relative">
                                        <CheckCircle className="h-12 w-12 text-white" />
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                                Registration Successful!
                            </h2>

                            <p className="text-gray-600 mb-6">
                                You have successfully registered for <span className="font-semibold text-indigo-700">{event.eventName}</span> on {dayjs(event.eventDate).format("MMM DD, YYYY")}.
                            </p>

                            <p className="text-sm text-gray-500 mb-8">
                                A confirmation email has been sent with all event details and your registration code.
                            </p>

                            <Button
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
                                onClick={() => onOpenChange(false)}
                            >
                                Done
                            </Button>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}