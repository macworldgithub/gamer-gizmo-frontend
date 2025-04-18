import { useEffect, useState } from "react";
import { Upload, Image, GetProp, UploadProps, UploadFile } from "antd";
import { PlusOutlined } from "@ant-design/icons";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadImages = ({ setFileList, fileList, adData }: any) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (adData?.product_images?.length > 0) {
      const existingImages = adData.product_images
        .filter((img: any) => img.image_url)
        .map((img: any) => {
          const cleanedUrl = img.image_url.replace(/^\/+/, ""); // Remove leading slash
          const fullUrl = new URL(
            cleanedUrl,
            process.env.NEXT_PUBLIC_API_BASE_URL
          ).toString();
          return {
            uid: img.id.toString(),
            name: `Image-${img.id}`,
            url: fullUrl,
          };
        });

      console.log("Existing Images Loaded:", existingImages);
      setFileList(existingImages);
    }
  }, [JSON.stringify(adData?.product_images)]);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file?.url || (file.preview as string));
    setPreviewOpen(true);
  };
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div>
      <Upload
        listType="picture-card"
        fileList={fileList}
        accept=".png, .jpeg, .jpg"
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={() => false} // prevent auto upload
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
