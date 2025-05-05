import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { toast } from "react-toastify";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadImages = ({ setFileList, fileList }: any) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handlePreview = async (file: UploadFile) => {
    try {
      if (!file.url && !file.preview) {
        if (file.originFileObj && file.originFileObj.size / 1024 / 1024 > 10) {
          toast.warning("Preview not available for very large images");
          return;
        }
        file.preview = await getBase64(file.originFileObj as FileType);
      }

      setPreviewImage(file.url || (file.preview as string));
      setPreviewOpen(true);
    } catch (err) {
      toast.error("Failed to preview image.");
    }
  };

  const beforeUpload = (file: FileType) => {
    const isLt50M = file.size / 1024 / 1024 < 50;
    if (!isLt50M) {
      toast.error("Image must be smaller than 50MB!");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    const updatedList = newFileList.map((file) => ({
      ...file,
      status: "done", // Force status to 'done'
    }));
    setFileList(updatedList);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <div className="">
      <Upload
        listType="picture-card"
        fileList={fileList}
        accept=".png , .jpeg , .jpg"
        className="flex "
        beforeUpload={beforeUpload}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 10 ? null : uploadButton}
      </Upload>

      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default UploadImages;
