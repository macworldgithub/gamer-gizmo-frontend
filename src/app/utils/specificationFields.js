// Utility function to get relevant fields based on category_id
export const relevantSpecificationFields = {
    1: [ // Laptops
      "battery_life",
      "color",
      "gpu",
      "gpu_laptops_gpuTogpu",
      "graphics",
      "ports",
      "processors",
      "processor_variant_laptops_processor_variantToprocessor_variant",
      "ram_laptops_ramToram",
      "screen_resolution",
      "screen_size",
      "storage_laptops_storageTostorage",
      "storage_type_laptops_storage_typeTostorage_type",
      "weight",
    ],
    2: [ // Personal Computers
      "gpu",
      "gpu_personal_computers_gpuTogpu",
      "graphics",
      "ports",
      "processors",
      "processor_variant_personal_computers_processor_variantToprocessor_variant",
      "ram_personal_computers_ramToram",
      "storage_personal_computers_storageTostorage",
      "storage_type_personal_computers_storage_typeTostorage_type",
    ],
    3: [ // Components
      "name",
      "type",
      "compatibility",
      "details",
    ],
    4: [ // Gaming Consoles
      "accessories",
      "battery_life",
      "color",
      "connectivity",
      "warranty_status",
    ],
  };
  
  // Function to get relevant fields for a given category
  export const getRelevantFields = (categoryId) => {
    return relevantSpecificationFields[categoryId] || [];
  };
  