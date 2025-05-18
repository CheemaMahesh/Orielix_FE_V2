import { useAdminUsers } from "@/Api/Admin/Users";
import { adminList } from "@/data/Admin";
import { addAllUsers } from "@/reducers/users";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Intrests } from "./Intrests/Intrests";
import { Users } from "./Users/Users";
import { Events } from "./Events/Events";
import { Sessions } from "./Sessions/Sessions";

export const AdminHome = () => {
    const { getAllUsers, isLoading } = useAdminUsers();
    const dispatch = useDispatch();

    const getUsersByToken = async () => {
        try {
            const response = await getAllUsers();
            if (response && response.success) {
                if (response.user.length > 0) {
                    dispatch(addAllUsers(response));
                }
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    const getComponents = useCallback((props: { title: string }) => {
        switch (props.title) {
            case "Add Intrests":
                return <Intrests />
            case "Add Events":
                return <div><Events /></div>
            case "Add Sessions":
                return <div><Sessions /></div>
            case "Add Users":
                return <div><Users /></div>
            case "Add Speakers":
                return <div>Add Speakers</div>
            case "Add Sponsors":
                return <div>Add Sponsors</div>
            default:
                return null
        }
    }, []);
    useEffect(() => {
        getUsersByToken();
    }, [])
    return (
        <section className="flex flex-col gap-10 p-4">
            {adminList?.map((item) => (
                <div key={item.id} className="text-lg cursor-pointer">
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    {getComponents({ title: item.title })}
                </div>
            ))}
        </section>
    )
}