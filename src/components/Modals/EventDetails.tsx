import * as Dialog from '@radix-ui/react-dialog';
import { EventType } from '@/reducers/events';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '../ui/button';
import {
    ArrowRight as ArrowRightIcon, User,
    Calendar as CalendarIconSolid,
    Clock,
    X
} from 'lucide-react';
import dayjs from 'dayjs';
import { useFunctionDirectory } from '@/hooks/FucntionDirectory';


export type EventDetailsProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    event: EventType;
    onRegister?: () => void;
}

export const EventDetails = ({ open, onOpenChange, event, onRegister }: EventDetailsProps) => {
    const { getHoursByMinutes } = useFunctionDirectory();
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm animate-fade-in z-50" />
                <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg">
                    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden p-2">
                        <div
                            className="relative z-[101] w-[95%] md:w-full max-w-[800px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl border-0 shadow-2xl p-0 animate-in fade-in-0 zoom-in-95 mx-auto my-auto"
                            style={{ transform: 'translate(-50%, -50%)', left: '50%', top: '50%', position: 'fixed' }}
                        >
                            <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl pointer-events-none">
                                <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-200/20 via-purple-200/20 to-indigo-200/20 blur-3xl opacity-70"></div>
                                <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-purple-200/20 via-indigo-200/20 to-purple-200/20 blur-3xl opacity-70"></div>
                                <div className="absolute top-1/2 right-1/3 transform -translate-y-1/2 h-64 w-64 rounded-full bg-gradient-to-r from-indigo-300/10 to-purple-300/10 blur-2xl opacity-70 animate-pulse-slow"></div>
                            </div>

                            <div className="relative h-72 w-full overflow-hidden rounded-t-2xl">
                                <img
                                    src={event.eventImage}
                                    alt={event.eventName}
                                    className="w-full h-full object-cover transition-all duration-1000 hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10"></div>
                            </div>

                            <div className="p-6 pt-8">
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                                        About This Event
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {event.eventDescription} This event is designed to provide hands-on experience and networking opportunities with industry professionals. Participants will gain valuable insights and practical skills they can immediately apply to their work.
                                    </p>
                                </div>

                                {/* Event Details with enhanced cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                                            <span className="bg-gradient-to-r from-indigo-100 to-purple-100 p-1 rounded-md">
                                                <CalendarIconSolid className="h-4 w-4 text-indigo-600" />
                                            </span>
                                            Event Details
                                        </h3>

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 rounded-lg border border-indigo-100/80 hover:border-indigo-200/70 transition-all duration-300 hover:-translate-y-0.5 group relative overflow-hidden">
                                                {/* Animated background elements */}
                                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-purple-200/30 to-indigo-200/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                                <div className="flex items-center gap-3 relative z-10">
                                                    <div className="bg-white p-2.5 rounded-full shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
                                                        <CalendarIconSolid className="h-5 w-5 text-indigo-600" />
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-800 block">Date & Time</span>
                                                        <span className="text-sm text-gray-600">{dayjs(event?.eventDate).format("MMM DD, YYYY")}, {dayjs(event?.eventTime, "HH:mm:ss").isValid()
                                                            ? dayjs(event?.eventTime, "HH:mm:ss").format("HH:mm")
                                                            : "12:00 AM"}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-50/80 to-indigo-50/30 rounded-lg border border-indigo-100/80 hover:border-indigo-200/80 transition-all duration-300 hover:-translate-y-0.5 group relative overflow-hidden">
                                                {/* Animated background elements */}
                                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-purple-200/30 to-indigo-200/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                                <div className="flex items-center gap-3 relative z-10">
                                                    <div className="bg-white p-2.5 rounded-full shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
                                                        <Clock className="h-5 w-5 text-indigo-600" />
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-800 block">Duration</span>
                                                        <span className="text-sm text-gray-600">{getHoursByMinutes(event?.duration || "0")} {event?.withbreaks ? "(with breaks)" : "(without breaks)"}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                                            <span className="bg-gradient-to-r from-indigo-100 to-purple-100 p-1 rounded-md">
                                                <User className="h-4 w-4 text-purple-600" />
                                            </span>
                                            Presenter
                                        </h3>

                                        <div className="p-5 bg-gradient-to-r from-indigo-50/70 to-purple-50/70 rounded-xl border border-indigo-100/70 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group relative overflow-hidden">
                                            {/* Animated background elements */}
                                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-purple-200/30 to-indigo-200/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                            <div className="flex items-center gap-4 mb-4 relative z-10">
                                                <Avatar className="h-16 w-16 border-2 border-white shadow-lg group-hover:scale-105 transition-all duration-300">
                                                    <AvatarImage src={event?.presenter?.profileImage} />
                                                    <AvatarFallback>{event?.presenter?.profileImage}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h4 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors duration-300">{event?.presenter?.firstName}</h4>
                                                    <p className="text-sm text-gray-600">{event?.presenter?.designation}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 relative z-10">
                                                An industry expert with over 10 years of experience in the field. Known for innovative approaches and practical teaching methods that make complex concepts accessible to all skill levels.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {!event.joined && <div className="flex justify-center mt-8">
                                    <Button
                                        onClick={onRegister}
                                        className={`w-full sm:w-auto px-10 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out hover:scale-[1.02] rounded-xl relative overflow-hidden group`}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-1000 animate-pulse-slow"></div>
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300"></div>

                                        <div className="flex items-center justify-center gap-2 relative z-10">
                                            <span className="font-medium group-hover:tracking-wide transition-all duration-300 text-base sm:text-lg">Register Now</span>
                                            <ArrowRightIcon className="h-5 w-5 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300" />
                                        </div>
                                    </Button>
                                </div>}
                            </div>
                        </div>
                    </div>
                    <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}