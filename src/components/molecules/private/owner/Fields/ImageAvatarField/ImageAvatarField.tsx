"use client";

import React from "react";
import { ImageIcon, ImagePlus } from "lucide-react";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ACCEPTED_IMAGE_TYPES } from "@/utils/constants/files.constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SelectedImageCard from "@/components/atoms/private/owner/Cards/SelectedImageCard/SelectedImageCard";

interface IImageAvatarField {
  form: any;
  name: string;
  imagesName: string;
  className?: string;
}

const ImageAvatarField: React.FC<IImageAvatarField> = ({
  form,
  name,
  imagesName,
  className = "",
}) => {
  const { control } = form as UseFormReturn;

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | undefined>(
    undefined,
  );

  const handleFile = (file: File) => {
    setSelectedFile(file);
    form.setValue(name, file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(undefined);
    form.setValue(name, undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const renderImagesContent = () => {
    if (!selectedFile) {
      return (
        <div
          className={`w-full flex items-center justify-center border border-primary border-dashed ${className}`}
        >
          <ImageIcon
            className="w-[60px] h-[60px]"
            color="#ff8749"
            strokeWidth={0.5}
          />
        </div>
      );
    } else {
      return (
        <SelectedImageCard
          file={selectedFile}
          imageName={imagesName}
          handleRemoveFile={handleRemoveFile}
        />
      );
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ fieldState: { invalid } }) => (
        <FormItem className="flex flex-col space-y-1">
          <FormControl>
            <Input
              type="file"
              onChange={handleFileInput}
              accept={ACCEPTED_IMAGE_TYPES.join(",")}
              className="hidden"
              ref={fileInputRef}
            />
          </FormControl>
          <div
            className={`relative flex gap-x-2 justify-between overflow-hidden ${className}`}
          >
            {renderImagesContent()}
          </div>
          <Button
            variant="outlinePrimary"
            size="md"
            type="button"
            className="gap-x-2"
            onClick={() =>
              fileInputRef.current ? fileInputRef.current.click() : null
            }
          >
            {selectedFile ? "Change Image" : "Add Image"}
            <ImagePlus />
          </Button>
        </FormItem>
      )}
    />
  );
};

export default ImageAvatarField;
