import { clearUser } from "@/reducers/me";
import { clearSessions } from "@/reducers/sessions";
import { Button, Modal } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export type ConfirmLogoutModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ConfirmLogoutModal = ({ open, onOpenChange }: ConfirmLogoutModalProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearUser());
        dispatch(clearSessions());
        localStorage.removeItem("token");
        navigate("/login");
    }
    return (
        <Modal centered open={open} onCancel={() => onOpenChange(false)} footer={(_, { OkBtn, CancelBtn }) => (
            <>
                <Button danger onClick={handleLogout}>Confirm</Button>
                <CancelBtn />
            </>
        )}
        >
            <div className="flex flex-col items-center justify-center gap-4 text-red-600 font-semibold">
                <h2 className="text-2xl font-bold">Are you sure you want to log out?</h2>
                <p className="text-gray-500">You will be logged out of your account.</p>
            </div>
        </Modal>
    )
}