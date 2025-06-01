import { Button, message, Modal } from "antd";
import { useRef, useState } from "react";
import { upload } from "@imagekit/react";
import { useProfile } from "@/Api/Profile";
import axios from "axios";
import { useCallProfileInfo } from "@/hooks/Profile";

export type ProfilePictureModalProps = {
    open: boolean;
    onClose: () => void;
};

export const ProfilePictureModal = ({ open, onClose }: ProfilePictureModalProps) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { getProfileKeys, updateImage } = useProfile();
    const { getMeByToken } = useCallProfileInfo();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.size > 5 * 1024 * 1024) {
            message.error("File size should be less than or equal to 5MB");
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
            const { signature, expire, token, publicKey } = (await getProfileKeys()).data;
            const response = await upload({
                file,
                fileName: file.name,
                signature,
                expire,
                token,
                publicKey,
                onProgress: (evt) => setProgress((evt.loaded / evt.total) * 100),
            });
            const res = await updateImage({
                profileImage: response.url,
                id: response.fileId,
            });
            if (res?.success) {
                getMeByToken();
                onClose();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Modal centered open={open} onCancel={onClose} footer={null}>
            <div>
                <h2 className="text-lg font-semibold mb-4">Profile Picture</h2>
                <p className="text-sm text-gray-600 mb-6">
                    Upload a new profile picture to update your account.
                </p>
                <p className="text-red-500 italic">NOTE: image size should be less than or equal to 5MB</p>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="mb-4"
                    onChange={handleFileChange}
                />
                {preview && (
                    <img src={preview} alt="Preview" className="mb-4 w-32 h-32 rounded" />
                )}
                {progress > 0 && progress < 100 && (
                    <div className="mb-2">
                        Uploading: <progress value={progress} max={100}></progress>
                    </div>
                )}
                {uploadedUrl && (
                    <img src={uploadedUrl} alt="Uploaded" className="mb-4 w-32 h-32 rounded" />
                )}
                <Button
                    type="primary"
                    onClick={handleUpload}
                    className="mr-2"
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