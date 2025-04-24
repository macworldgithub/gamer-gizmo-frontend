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
        console.log(response?.data?.data, "here is my data");
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
  useEffect(() => {
    console.log(adData, "lol");
  }, [adData]);
  if (categoryId === 4 && adData?.gaming_console?.length > 0) {
    const gamingConsole = adData?.gaming_console[0];
    console.log(gamingConsole, "myyyyyyyyyy");

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
    const laptop = adData?.laptops[0];

    return (
      <>
        {laptop?.battery_life && (
          <div className="flex flex-col">
            <label className="edit-label">Battery Life</label>
            <input
              type="text"
              name="battery_life"
              value={laptop?.battery_life}
              onChange={handleLaptopChange}
              placeholder="Battery Life"
              className="edit-input dark:text-black"
            />
          </div>
        )}

        {laptop?.color && (
          <div className="flex flex-col">
            <label className="edit-label">Color</label>
            <input
              type="text"
              name="color"
              value={laptop?.color}
              onChange={handleLaptopChange}
              placeholder="Color"
              className="edit-input dark:text-black"
            />
          </div>
        )}

        {laptop?.graphics && (
          <div className="flex flex-col">
            <label className="edit-label">Graphics</label>
            <input
              type="text"
              name="graphics"
              value={laptop?.graphics}
              onChange={handleLaptopChange}
              placeholder="Graphics"
              className="edit-input dark:text-black"
            />
          </div>
        )}

        {laptop?.ports && (
          <div className="flex flex-col">
            <label className="edit-label">Ports</label>
            <input
              type="text"
              name="ports"
              value={laptop?.ports}
              onChange={handleLaptopChange}
              placeholder="Ports"
              className="edit-input dark:text-black"
            />
          </div>
        )}

        {laptop?.processor && (
          <div className="flex flex-col">
            <label className="edit-label">Processor</label>
            <select
              name="processor"
              value={laptop?.processor}
              onChange={(e) =>
                //@ts-ignore
                setAdData((prev) => ({
                  ...prev,
                  laptops: [
                    {
                      ...prev.laptops[0],
                      processor: e.target.value,
                    },
                  ],
                }))
              }
              className="edit-input dark:text-black"
            >
              <option value="">Select Processor</option>
              {processor.map((variant) => (
                <option key={variant.id} value={variant?.id}>
                  {variant.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {laptop?.processor_variant && (
          <div className="flex flex-col">
            <label className="edit-label">Processor Variant</label>
            <select
              name="processor_variant"
              value={laptop?.processor_variant}
              onChange={(e) =>
                //@ts-ignore
                setAdData((prev) => ({
                  ...prev,
                  laptops: [
                    {
                      ...prev.laptops[0],
                      processor_variant: e.target.value,
                    },
                  ],
                }))
              }
              className="edit-input dark:text-black"
            >
              <option value="">Select Processor Variant</option>
              {processorVariantData.map((variant) => (
                <option key={variant.id} value={variant?.id}>
                  {variant.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {laptop?.ram && (
          <div className="flex flex-col">
            <label className="edit-label">RAM</label>
            <select
              name="ram"
              value={laptop.ram || ""}
              onChange={(e) =>
                //@ts-ignore
                setAdData((prev) => ({
                  ...prev,
                  laptops: [
                    {
                      ...prev.laptops[0],
                      ram: e.target.value,
                    },
                  ],
                }))
              }
              className="edit-input dark:text-black"
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

        {laptop?.storage && (
          <div className="flex flex-col">
            <label className="edit-label">Storage</label>
            <select
              name="storage"
              value={laptop.storage || ""}
              onChange={(e) =>
                //@ts-ignore
                setAdData((prev) => ({
                  ...prev,
                  laptops: [
                    {
                      ...prev.laptops[0],
                      storage: e.target.value,
                    },
                  ],
                }))
              }
              className="edit-input dark:text-black"
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

        {laptop?.storage_type && (
          <div className="flex flex-col">
            <label className="edit-label">Storage Type</label>
            <select
              name="storage_type"
              value={laptop.storage_type || ""}
              onChange={(e) =>
                //@ts-ignore
                setAdData((prev) => ({
                  ...prev,
                  laptops: [
                    {
                      ...prev.laptops[0],
                      storage_type: e.target.value,
                    },
                  ],
                }))
              }
              className="edit-input dark:text-black"
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

  if (categoryId === 3 && adData?.components?.length > 0) {
    const components = adData.components;

    return (
      <>
        {components.map((component: any, index: number) => {
          const selectedComponentType = component?.component_type;
          const componentTypeId = component?.component_type;
          const text = component?.text;

          return (
            <div className="flex flex-col" key={component.id || index}>
              {componentTypeId !== 0 ? (
                <>
                  <label className="edit-label">Component Type</label>
                  <select
                    className="edit-input dark:text-black"
                    value={componentTypeId || ""}
                    onChange={(e) => {
                      const updatedComponents = [...components];
                      updatedComponents[index].component_type = parseInt(
                        e.target.value
                      );

                      const selectedCategory = componentCategories.find(
                        //@ts-ignore
                        (cat) => cat.id === parseInt(e.target.value)
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
                    <option value="">Select Component Type</option>
                    {componentCategories.map((category: any) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                <>
                  <label className="edit-label mt-2">Component Text</label>
                  <input
                    type="text"
                    name={`component_text_${index}`}
                    value={text}
                    onChange={(e) => {
                      const updatedComponents = [...components];
                      updatedComponents[index].text = e.target.value;

                      //@ts-ignore
                      setAdData((prev) => ({
                        ...prev,
                        components: updatedComponents,
                      }));
                    }}
                    placeholder="Enter component name"
                    className="edit-input dark:text-black mt-2"
                  />
                </>
              )}
            </div>
          );
        })}
      </>
    );
  }

  return null;
};

export default SpecificationsForm;
