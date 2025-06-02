import { Button, message, Modal } from "antd";
import { useRef, useState } from "react";
import { upload } from "@imagekit/react";
import { useProfile } from "@/Api/Profile";
import { useCallProfileInfo } from "@/hooks/Profile";

export type ProfilePictureModalProps = {
    open: boolean;
    onClose: () => void;
};

export const ProfilePictureModal = ({ open, onClose }: ProfilePictureModalProps) => {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { getProfileKeys, updateImage } = useProfile();
    const { callOnlyMe } = useCallProfileInfo();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.size > 5 * 1024 * 1024) {
            message.error("File size should be less than or equal to 5MB");
            setPreview(null);
            fileInputRef.current!.value = "";
            return;
        }
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        const file = fileInputRef.current?.files?.[0];
        if (!file) return;

        try {
            setIsLoading(true);
            const { signature, expire, token, publicKey } = (await getProfileKeys()).data;
            const response = await upload({
                file,
                fileName: file.name,
                signature,
                expire,
                token,
                publicKey,
            });
            const res = await updateImage({
                profileImage: response.url,
                id: response.fileId,
            });
            if (res?.success) {
                await callOnlyMe();
                onClose();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal centered open={open} onCancel={onClose} footer={null}>
            <div>
                <h2 className="text-lg font-semibold mb-4">Profile Picture</h2>
                <p className="text-sm text-gray-600 mb-6">
                    Upload a new profile picture to update your account.
                </p>
                <p className="text-red-500 italic text-xs">NOTE: Image size should be less than or equal to 5MB</p>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="mb-4"
                    onChange={handleFileChange}
                />
                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="mb-4 w-32 h-32 rounded object-cover aspect-square"
                    />
                )}
                <Button
                    type="primary"
                    onClick={handleUpload}
                    className="mr-2"
                    loading={isLoading}
                >
                    Upload
                </Button>
                <Button
                    type="default"
                    onClick={onClose}
                >
                    Close
                </Button>
            </div>
        </Modal>
    );
};