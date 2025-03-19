import { useEffect, useState } from "react";
import { Upload, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";

//@ts-ignore
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    //@ts-ignore
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadImages = ({ setFileList, fileList, adData }: any) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  // Load existing images from adData when editing
  useEffect(() => {
    if (adData?.product_images) {
      const existingImages = adData.product_images.map((img: any) => ({
        uid: img.id.toString(), // Unique ID
        name: `Image-${img.id}`,
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${img.image_url}`, // Adjust API URL
      }));

      setFileList(existingImages);
    }
  }, [adData, setFileList]);

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  //@ts-ignore
  const handleChange = ({ fileList: newFileList }) => {
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
        className="flex"
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
