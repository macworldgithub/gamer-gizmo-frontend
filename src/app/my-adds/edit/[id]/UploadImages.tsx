// import { useEffect, useState } from "react";
// import { Upload, Image, GetProp, UploadProps, UploadFile } from "antd";
// import { PlusOutlined } from "@ant-design/icons";

// type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

// const getBase64 = (file: FileType): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });

// const UploadImages = ({ setFileList, fileList, adData }: any) => {
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");

//   useEffect(() => {
//     setFileList(fileList);
//   }, [fileList]);

//   const handlePreview = async (file: UploadFile) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj as FileType);
//     }
//     setPreviewImage(file?.url || (file.preview as string));
//     setPreviewOpen(true);
//   };
//   const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//   };

//   const uploadButton = (
//     <button style={{ border: 0, background: "none" }} type="button">
//       <PlusOutlined />
//       <div style={{ marginTop: 8 }}>Upload</div>
//     </button>
//   );

//   return (
//     <div>
//       <Upload
//         listType="picture-card"
//         fileList={fileList}
//         accept=".png, .jpeg, .jpg"
//         onPreview={handlePreview}
//         onChange={handleChange}
//         beforeUpload={() => false} // prevent auto upload
//       >
//         {fileList.length >= 10 ? null : uploadButton}
//       </Upload>

//       {previewImage && (
//         <Image
//           wrapperStyle={{ display: "none" }}
//           preview={{
//             visible: previewOpen,
//             onVisibleChange: (visible) => setPreviewOpen(visible),
//             afterOpenChange: (visible) => !visible && setPreviewImage(""),
//           }}
//           src={previewImage}
//         />
//       )}
//     </div>
//   );
// };

// export default UploadImages;
import { useEffect, useState } from "react";
import { Upload, Image, UploadProps, UploadFile } from "antd";
import { PlusOutlined } from "@ant-design/icons";

// Define the type for file
//@ts-ignore
type FileType = Parameters<UploadProps, "beforeUpload">[0];

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

  // Sync fileList with external state via useEffect
  useEffect(() => {
    setFileList(fileList);
  }, [fileList, setFileList]);

  // Handle file preview logic
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file?.url || (file.preview as string));
    setPreviewOpen(true);
  };

  // Handle changes to the file list (files added, removed, or failed uploads)
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList); // Update the external state with the new file list
  };

  // Button for uploading files
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
        onPreview={handlePreview} // Use to preview images
        onChange={handleChange} // This is the key change you were referring to
        beforeUpload={() => false} // Prevent auto upload
      >
        {fileList.length >= 10 ? null : uploadButton}{" "}
        {/* Only allow up to 10 files */}
      </Upload>

      {/* Image preview modal */}
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
