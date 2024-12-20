import React from "react";
import { Badge } from "@/components/ui/badge";
import { TSelectedItem } from "@/types/commonTypes";

interface ISingleSelect {
  name: string;
  handleSelect: (name: string, value: string) => void;
  selectableItems: TSelectedItem[];
}

const SingleSelect: React.FC<ISingleSelect> = ({
  name,
  handleSelect,
  selectableItems,
}) => {
  const [selectedItem, setSelectedItem] = React.useState<TSelectedItem | null>(
    null,
  );

  const handleSelectItem = (newSelectedItem: TSelectedItem) => {
    if (selectedItem && selectedItem.key === newSelectedItem.key) {
      setSelectedItem(null);
      handleSelect(name, "");
    } else {
      setSelectedItem(newSelectedItem);
      handleSelect(name, newSelectedItem.key);
    }
  };

  const isSelected = (itemKey: string) =>
    selectedItem && itemKey === selectedItem.key;

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

export default SingleSelect;
