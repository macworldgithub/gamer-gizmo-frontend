import React from "react";
import FormField from "./FormField";

interface Option {
  id: string | number;
  name: string;
}

interface AdData {
  name: string;
  price: number;
  category_id: string;
  condition: string;
  location: string;
  brand: string;
  processorVariant: string;
  stock: number;
  description: string;
}

interface AdFormProps {
  adData: AdData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  brands: Option[];
  categories: Option[];
  locations: Option[];
  processorVariants: Option[];
}

export default function AdForm({
  adData,
  handleChange,
  handleSubmit,
  brands,
  categories,
  locations,
  processorVariants,
}: AdFormProps) {
  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Product Name"
          name="name"
          value={adData.name}
          onChange={handleChange}
        />
        <FormField
          label="Price"
          type="number"
          name="price"
          value={adData.price}
          onChange={handleChange}
        />
        <FormField
          label="Category"
          type="select"
          name="category_id"
          value={adData.category_id}
          onChange={handleChange}
          options={categories}
        />
        <FormField
          label="Condition"
          type="select"
          name="condition"
          value={adData.condition}
          onChange={handleChange}
          options={[
            { id: "New", name: "New" },
            { id: "Used", name: "Used" },
          ]}
        />
        <FormField
          label="Location"
          type="select"
          name="location"
          value={adData.location}
          onChange={handleChange}
          options={locations}
        />
        <FormField
          label="Brand"
          type="select"
          name="brand"
          value={adData.brand}
          onChange={handleChange}
          options={brands}
        />
        <FormField
          label="Processor Variant"
          type="select"
          name="processorVariant"
          value={adData.processorVariant}
          onChange={handleChange}
          options={processorVariants}
        />
        <FormField
          label="Stock"
          type="number"
          name="stock"
          value={adData.stock}
          onChange={handleChange}
        />
      </div>
      <FormField
        label="Description"
        type="textarea"
        name="description"
        value={adData.description}
        onChange={handleChange}
      />
      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
        Update Ad
      </button>
    </form>
  );
}
