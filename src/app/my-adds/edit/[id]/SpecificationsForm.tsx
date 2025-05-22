"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface SpecificationsFormProps {
  categoryId: number;
  adData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLaptopChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePersonalComputerChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  setAdData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  consoleChange: any;
  token: string;
}

const SpecificationsForm: React.FC<SpecificationsFormProps> = ({
  categoryId,
  adData,
  handleChange,
  handleLaptopChange,
  handlePersonalComputerChange,
  token,
  setAdData,
  consoleChange,
}) => {
  const [componentCategories, setComponentCategories] = useState([]);

  const [processorVariantData, setProcessorVariantData] = useState<any[]>([]);
  const [processor, setProcessor] = useState<any[]>([]);
  const [storage, setStorage] = useState<any[]>([]);
  const [storageType, setStorageType] = useState<any[]>([]);
  const [ramOptions, setRamOptions] = useState<any[]>([]);
  const [gpu, setGpu] = useState<any[]>([]);
  useEffect(() => {
    fetchProcessorVariants();
    fetchProcessor();
    fetchStorage();
    fetchStorageType();
    fetchRamOptions();
    fetchGpu();
    fetchComponentCategories();
  }, []);
  const laptopFields = [
    { name: "battery_life", label: "Battery Life", type: "text" },
    { name: "color", label: "Color", type: "text" },
    { name: "graphics", label: "Graphics", type: "text" },
    { name: "ports", label: "Ports", type: "text" },
    {
      name: "processor",
      label: "Processor",
      type: "select",
      options: processor,
    },
    {
      name: "processor_variant",
      label: "Processor Variant",
      type: "select",
      options: processorVariantData,
    },
    {
      name: "ram",
      label: "RAM",
      type: "select",
      options: ramOptions,
    },
    {
      name: "storage",
      label: "Storage",
      type: "select",
      options: storage,
    },
    {
      name: "storage_type",
      label: "Storage Type",
      type: "select",
      options: storageType,
    },
  ];
  const componentFields = [
    {
      name: "component_type",
      label: "Component Type",
      type: "select",
      options: componentCategories,
    },
    {
      name: "text",
      label: "Component Text",
      type: "text",
    },
  ];

  const [touchedLaptopFields, setTouchedLaptopFields] = useState<string[]>([]);
  const [touchedComponents, setTouchedComponents] = useState<
    { index: number; field: "component_type" | "text" }[]
  >([]);

  const renderLaptopFields = (laptop: any) => {
    return laptopFields.map((field) => {
      const hasValue = !!laptop?.[field.name];
      const isTouched = touchedLaptopFields.includes(field.name);

      // Only show field if it has value or has been touched
      if (!hasValue && !isTouched) return null;

      return (
        <div key={field.name} className="flex flex-col">
          <label className="edit-label">{field.label}</label>
          {field.type === "text" ? (
            <input
              type="text"
              name={field.name}
              value={laptop[field.name]}
              onFocus={() => {
                if (!touchedLaptopFields.includes(field.name)) {
                  setTouchedLaptopFields((prev) => [...prev, field.name]);
                }
              }}
              onChange={handleLaptopChange}
              placeholder={field.label}
              className="edit-input dark:text-black"
            />
          ) : (
            <select
              name={field.name}
              value={laptop[field.name]}
              onFocus={() => {
                if (!touchedLaptopFields.includes(field.name)) {
                  setTouchedLaptopFields((prev) => [...prev, field.name]);
                }
              }}
              onChange={(e) =>
                //@ts-ignore
                setAdData((prev) => ({
                  ...prev,
                  laptops: [
                    {
                      ...prev.laptops[0],
                      [field.name]: e.target.value,
                    },
                  ],
                }))
              }
              className="edit-input dark:text-black"
            >
              <option value="">{`Select ${field.label}`}</option>
              {field.options?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          )}
        </div>
      );
    });
  };
  const renderComponentFields = (component: any, index: number) => {
    const isTouched = (fieldName: "component_type" | "text") =>
      //@ts-ignore
      touchedComponents.some(
        //@ts-ignore
        (item) => item.index === index && item.field === fieldName
      );

    return componentFields.map((field) => {
      const value = component?.[field.name];
      const shouldRender = !!value || isTouched(field.name as any);

      if (!shouldRender) return null;

      return (
        <div key={field.name} className="flex flex-col mt-2">
          <label className="edit-label">{field.label}</label>

          {field.type === "text" ? (
            <input
              type="text"
              name={`component_${field.name}_${index}`}
              value={value}
              placeholder={field.label}
              onFocus={() =>
                //@ts-ignore
                setTouchedComponents((prev) => [
                  ...prev,
                  { index, field: field.name },
                ])
              }
              onChange={(e) => {
                const updatedComponents = [...adData.components];
                updatedComponents[index][field.name] = e.target.value;
                //@ts-ignore
                setAdData((prev) => ({
                  ...prev,
                  components: updatedComponents,
                }));
              }}
              className="edit-input dark:text-black"
            />
          ) : (
            <select
              className="edit-input dark:text-black"
              value={value || ""}
              onFocus={() =>
                //@ts-ignore
                setTouchedComponents((prev) => [
                  ...prev,
                  { index, field: field.name },
                ])
              }
              onChange={(e) => {
                const updatedComponents = [...adData.components];
                updatedComponents[index][field.name] = parseInt(e.target.value);

                const selectedCategory = field.options?.find(
                  (opt: any) => opt.id === parseInt(e.target.value)
                );

                if (selectedCategory) {
                  updatedComponents[
                    index
                  ].component_type_components_component_typeTocomponent_type =
                    selectedCategory;
                }
                //@ts-ignore
                setAdData((prev) => ({
                  ...prev,
                  components: updatedComponents,
                }));
              }}
            >
              <option value="">{`Select ${field.label}`}</option>
              {field.options?.map((opt: any) => (
                <option key={opt.id} value={opt.id}>
                  {opt.name}
                </option>
              ))}
            </select>
          )}
        </div>
      );
    });
  };

  const fetchGpu = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/gpu/getAll`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGpu(response?.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch GPU options.", error);
    }
  };
  const fetchProcessorVariants = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/processor/getProcessorVariant`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProcessorVariantData(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch processor variants.", error);
    }
  };

  const fetchStorage = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/getStorage`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStorage(response?.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch storage.", error);
    }
  };
  const fetchStorageType = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/getStorageType`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStorageType(response?.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch storage types.", error);
    }
  };

  const fetchProcessor = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/processor/getProcessor`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProcessor(response?.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch processor.", error);
    }
  };
  const fetchRamOptions = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ram/getAll`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRamOptions(response?.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch RAM options.", error);
    }
  };
  const fetchComponentCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/component-category/getAll`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response?.data) {
        setComponentCategories(response?.data?.data);
      } else {
        console.error("Unexpected API response structure:", response);
        throw new Error("Unexpected API response");
      }
    } catch (error) {
      console.error("Error occurred while fetching categories:", error);
    } finally {
      console.log("Fetch operation completed.");
    }
  };
  useEffect(() => {}, [adData]);
  if (categoryId === 4 && adData?.gaming_console?.length > 0) {
    const gamingConsole = adData?.gaming_console[0];

    return (
      <>
        {gamingConsole?.accessories && (
          <div className="flex flex-col">
            <label className="edit-label">Accessories</label>
            <input
              type="text"
              name="accessories"
              value={gamingConsole.accessories || ""}
              onChange={consoleChange}
              placeholder="Accessories"
              className="edit-input"
            />
          </div>
        )}

        {gamingConsole?.battery_life && (
          <div className="flex flex-col">
            <label className="edit-label">Battery Life</label>
            <input
              type="text"
              name="battery_life"
              value={gamingConsole.battery_life || ""}
              onChange={consoleChange}
              placeholder="Battery Life"
              className="edit-input"
            />
          </div>
        )}

        {gamingConsole?.color && (
          <div className="flex flex-col">
            <label className="edit-label">Color</label>
            <input
              type="text"
              name="color"
              value={gamingConsole.color || ""}
              onChange={consoleChange}
              placeholder="Color"
              className="edit-input"
            />
          </div>
        )}

        {gamingConsole?.connectivity && (
          <div className="flex flex-col">
            <label className="edit-label">Connectivity</label>
            <input
              type="text"
              name="connectivity"
              value={gamingConsole.connectivity || ""}
              onChange={consoleChange}
              placeholder="Connectivity"
              className="edit-input"
            />
          </div>
        )}

        {gamingConsole?.warranty_status && (
          <div className="flex flex-col">
            <label className="edit-label">Warranty Status</label>
            <input
              type="text"
              name="warranty_status"
              value={gamingConsole.warranty_status || ""}
              onChange={consoleChange}
              placeholder="Warranty Status"
              className="edit-input"
            />
          </div>
        )}
      </>
    );
  }

  if (categoryId === 2 && adData?.personal_computers?.length > 0) {
    const pc = adData?.personal_computers[0];

    return (
      <>
        {pc?.graphics && (
          <div className="flex flex-col">
            <label className="edit-label">Graphics</label>
            <input
              type="text"
              name="graphics"
              value={pc.graphics || ""}
              onChange={handlePersonalComputerChange}
              placeholder="Graphics"
              className="edit-input"
            />
          </div>
        )}

        {pc?.ports && (
          <div className="flex flex-col">
            <label className="edit-label">Ports</label>
            <input
              type="text"
              name="ports"
              value={pc?.ports || ""}
              onChange={handlePersonalComputerChange}
              placeholder="Ports"
              className="edit-input"
            />
          </div>
        )}

        {pc?.processor && (
          <div className="flex flex-col">
            <label className="edit-label">Processor</label>
            <select
              name="processor"
              value={pc.processor || ""}
              onChange={(e) =>
                //@ts-ignore
                setAdData((prev) => ({
                  ...prev,
                  personal_computers: [
                    {
                      ...prev.personal_computers[0],
                      processor: e.target.value,
                    },
                  ],
                }))
              }
              className="edit-input"
              required
            >
              <option value="">Select Processor</option>
              {processor.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {pc?.processor_variant && (
          <div className="flex flex-col">
            <label className="edit-label">Processor Variant</label>
            <select
              name="processor_variant"
              value={pc?.processor_variant || ""}
              onChange={(e) =>
                //@ts-ignore

                setAdData((prev) => ({
                  ...prev,
                  personal_computers: [
                    {
                      ...prev.personal_computers[0],
                      processor_variant: e.target.value,
                    },
                  ],
                }))
              }
              className="edit-input"
              required
            >
              <option value="">Select Processor Variant</option>
              {processorVariantData?.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {pc?.ram && (
          <div className="flex flex-col">
            <label className="edit-label">RAM</label>
            <select
              name="ram"
              value={pc.ram || ""}
              onChange={(e) =>
                //@ts-ignore

                setAdData((prev) => ({
                  ...prev,
                  personal_computers: [
                    { ...prev.personal_computers[0], ram: e.target.value },
                  ],
                }))
              }
              className="edit-input"
              required
            >
              <option value="">Select RAM</option>
              {ramOptions.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {pc?.storage && (
          <div className="flex flex-col">
            <label className="edit-label">Storage</label>
            <select
              name="storage"
              value={pc.storage || ""}
              onChange={(e) =>
                //@ts-ignore
                setAdData((prev) => ({
                  ...prev,
                  personal_computers: [
                    { ...prev.personal_computers[0], storage: e.target.value },
                  ],
                }))
              }
              className="edit-input"
              required
            >
              <option value="">Select Storage</option>
              {storage.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {pc?.storage_type && (
          <div className="flex flex-col">
            <label className="edit-label">Storage Type</label>
            <select
              name="storage_type"
              value={pc.storage_type || ""}
              onChange={(e) =>
                //@ts-ignore
                setAdData((prev) => ({
                  ...prev,
                  personal_computers: [
                    {
                      ...prev.personal_computers[0],
                      storage_type: e.target.value,
                    },
                  ],
                }))
              }
              className="edit-input"
              required
            >
              <option value="">Select Storage Type</option>
              {storageType.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </>
    );
  }

  {
  }
  if (categoryId === 1 && adData?.laptops?.length > 0) {
    return <>{renderLaptopFields(adData.laptops[0])}</>;
  }

  if (categoryId === 3 && adData?.components?.length > 0) {
    return (
      <>
        {adData.components.map((component: any, index: number) => (
          <div className="flex flex-col" key={component.id || index}>
            {renderComponentFields(component, index)}
          </div>
        ))}
      </>
    );
  }

  return null;
};

export default SpecificationsForm;
