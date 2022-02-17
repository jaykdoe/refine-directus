import { useState } from "react";

interface DirectusUploadParams {
    maxCount: number;
}

type UseDirectusUploadType = {
    (uploadParams: DirectusUploadParams): {
        uploadedFileIds: string[];
        beforeUpload: (_file: any, files: any[]) => boolean;
        fileList: any[];
        maxCount: number;
    };
};

export const useDirectusUpload: UseDirectusUploadType = ({ maxCount }) => {
    const [uploadedFileIds] = useState<string[]>([]);
    const [fileList, setFileList] = useState<any[]>([]);

    const beforeUpload = (_file: any, files: any[]): boolean => {
        const totalFiles = fileList.length;
        const filesCount = files.length;

        if (totalFiles + filesCount > maxCount) {
            const excessFileCount = totalFiles + filesCount - maxCount;
            // convert negative
            const deleteItemCount = excessFileCount - excessFileCount * 2;
            files.splice(deleteItemCount);
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setFileList([...fileList, ...files]);

        return true;
    };

    return {
        uploadedFileIds,
        beforeUpload,
        fileList,
        maxCount,
    };
};