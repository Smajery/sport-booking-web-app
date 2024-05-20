"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

type TSelectedItem = {
  key: string;
  name: string;
};

const MultiSelect = () => {
  const selectableItems = [
    { key: "artificial_lawn", name: "Artificial lawn" },
    { key: "parquet", name: "Parquet" },
    { key: "natural_lawn", name: "Natural lawn" },
    { key: "rubber", name: "Rubber" },
    { key: "sand", name: "Sand" },
  ];
  const [selectedItems, setSelectedItems] = React.useState<TSelectedItem[]>([]);

  const handleSelectItem = (newSelectedItem: { key: string; name: string }) => {
    const isItemAlreadySelected = selectedItems.some(
      (item) => item.key === newSelectedItem.key,
    );
    if (!isItemAlreadySelected) {
      setSelectedItems((prevState) => [...prevState, newSelectedItem]);
    } else {
      setSelectedItems(
        selectedItems.filter(
          (selectedItem) => selectedItem.key !== newSelectedItem.key,
        ),
      );
    }
  };

  const isSelected = (itemKey: string) =>
    selectedItems.some((item) => item.key === itemKey);

  return (
    <div className="bg-background rounded-lg border border-border p-2 shadow-xs flex flex-wrap gap-x-2 gap-y-4">
      {selectableItems.map((selectableItem) => (
        <div
          key={selectableItem.key}
          className="cursor-pointer"
          onClick={() => handleSelectItem(selectableItem)}
        >
          <Badge
            variant={isSelected(selectableItem.key) ? "secondary" : "outline"}
          >
            {selectableItem.name}
          </Badge>
        </div>
      ))}
    </div>
  );
};

export default MultiSelect;
