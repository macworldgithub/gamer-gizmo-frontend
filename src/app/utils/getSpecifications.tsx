export const getSpecifications = (data: any) => {
  const specifications = [
    {
      label: "Category Name",
      value: data?.categories?.name || "Not Available",
    },
  ];

  // Check if category_id is 4 (Gaming Consoles) and render the additional fields explicitly
  if (data?.categories?.id === 4 && data?.gaming_console?.length > 0) {
    const gamingConsole = data?.gaming_console[0]; // Assuming the first item in the array

    specifications.push(
      {
        label: "Accessories",
        value: gamingConsole?.accessories || "Not Available",
      },
      {
        label: "Battery Life",
        value: gamingConsole?.battery_life || "Not Available",
      },
      { label: "Color", value: gamingConsole?.color || "Not Available" },
      {
        label: "Connectivity",
        value: gamingConsole?.connectivity || "Not Available",
      },
      {
        label: "Warranty Status",
        value: gamingConsole?.warranty_status || "Not Available",
      }
    );
  }

  // Check if category_id is 2 (Desktops) and render the additional fields explicitly for personal_computers
  if (data?.categories?.id === 2 && data?.personal_computers?.length > 0) {
    const personalComputers = data?.personal_computers[0]; // Assuming the first item in the array

    specifications.push(
      { label: "GPU", value: personalComputers?.gpu || "Not Available" },
      {
        label: "GPU Brand",
        value:
          personalComputers?.gpu_personal_computers_gpuTogpu?.name ||
          "Not Available",
      },
      {
        label: "Graphics",
        value: personalComputers?.graphics || "Not Available",
      },
      { label: "Ports", value: personalComputers?.ports || "Not Available" },
      {
        label: "Processor",
        value: personalComputers?.processors?.name || "Not Available",
      },
      {
        label: "Processor Variant",
        value:
          personalComputers
            ?.processor_variant_personal_computers_processor_variantToprocessor_variant
            ?.name || "Not Available",
      },
      {
        label: "RAM",
        value:
          personalComputers?.ram_personal_computers_ramToram?.name ||
          "Not Available",
      },
      {
        label: "Storage",
        value:
          personalComputers?.storage_personal_computers_storageTostorage
            ?.name || "Not Available",
      },
      {
        label: "Storage Type",
        value:
          personalComputers
            ?.storage_type_personal_computers_storage_typeTostorage_type
            ?.name || "Not Available",
      }
    );
  }

  // Check if category_id is 1 (Laptops) and render the additional fields explicitly for laptops
  if (data?.categories?.id === 1 && data?.laptops?.length > 0) {
    const laptop = data?.laptops[0]; // Assuming the first item in the array

    specifications.push(
      { label: "Battery Life", value: laptop?.battery_life || "Not Available" },
      { label: "Color", value: laptop?.color || "Not Available" },
      { label: "GPU", value: laptop?.gpu || "Not Available" },
      {
        label: "GPU Brand",
        value: laptop?.gpu_laptops_gpuTogpu?.name || "Not Available",
      },
      { label: "Graphics", value: laptop?.graphics || "Not Available" },
      { label: "Ports", value: laptop?.ports || "Not Available" },
      {
        label: "Processor",
        value: laptop?.processors?.name || "Not Available",
      },
      {
        label: "Processor Variant",
        value:
          laptop?.processor_variant_laptops_processor_variantToprocessor_variant
            ?.name || "Not Available",
      },
      {
        label: "RAM",
        value: laptop?.ram_laptops_ramToram?.name || "Not Available",
      },
      {
        label: "Screen Resolution",
        value: laptop?.screen_resolution || "Not Available",
      },
      { label: "Screen Size", value: laptop?.screen_size || "Not Available" },
      {
        label: "Storage",
        value:
          laptop?.storage_laptops_storageTostorage?.name || "Not Available",
      },
      {
        label: "Storage Type",
        value:
          laptop?.storage_type_laptops_storage_typeTostorage_type?.name ||
          "Not Available",
      },
      { label: "Weight", value: laptop?.weight || "Not Available" }
    );
  }

  return specifications;
};
