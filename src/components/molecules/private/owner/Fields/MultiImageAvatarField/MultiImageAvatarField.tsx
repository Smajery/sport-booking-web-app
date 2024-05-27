"use client";

import React from "react";
import { ImageIcon, ImagePlus, X, XCircle } from "lucide-react";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_ALLOWED_AVATAR_SIZE_KB,
} from "@/utils/constants/files.constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SelectedImageCard from "@/components/atoms/private/owner/Cards/SelectedImageCard/SelectedImageCard";

interface IMultiImageAvatar {
  form: any;
  name: string;
  imagesName: string;
  className?: string;
}

const MultiImageAvatarField: React.FC<IMultiImageAvatar> = ({
  form,
  name,
  imagesName,
  className = "",
}) => {
  const { control, watch } = form as UseFormReturn;
  const filesWatch = watch(name) || [];

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>(filesWatch);

  const handleFiles = (files: File[]) => {
    const updatedFiles = [...filesWatch, ...files];
    setSelectedFiles(updatedFiles);
    form.setValue(name, files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    form.setValue(name, updatedFiles);

    const dataTransfer = new DataTransfer();
    updatedFiles.forEach((file) => {
      if (file instanceof File) {
        dataTransfer.items.add(file);
      }
    });

    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  const renderImagesContent = () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      return (
        <div
          className={`w-full flex items-center justify-center border border-primary border-dashed ${className}`}
        >
          <ImageIcon className="w-[60px] h-[60px]" strokeWidth={0.5} />
        </div>
      );
    }

    switch (selectedFiles.length) {
      case 1:
        return (
          <SelectedImageCard
            file={selectedFiles[0]}
            imageName={imagesName}
            handleRemoveFile={() => handleRemoveFile(0)}
          />
        );
      case 2:
        return (
          <>
            <SelectedImageCard
              file={selectedFiles[0]}
              imageName={imagesName}
              handleRemoveFile={() => handleRemoveFile(0)}
            />
            <SelectedImageCard
              file={selectedFiles[1]}
              imageName={`${imagesName}-2`}
              handleRemoveFile={() => handleRemoveFile(1)}
            />
          </>
        );
      case 3:
        return (
          <>
            <SelectedImageCard
              file={selectedFiles[0]}
              imageName={imagesName}
              handleRemoveFile={() => handleRemoveFile(0)}
            />
            <div className="flex flex-col justify-between gap-y-2 grow">
              <SelectedImageCard
                file={selectedFiles[1]}
                imageName={`${imagesName}-2`}
                handleRemoveFile={() => handleRemoveFile(1)}
              />
              <SelectedImageCard
                file={selectedFiles[2]}
                imageName={`${imagesName}-3`}
                handleRemoveFile={() => handleRemoveFile(2)}
              />
            </div>
          </>
        );
      default:
        return (
          <>
            <SelectedImageCard
              file={selectedFiles[0]}
              imageName={imagesName}
              handleRemoveFile={() => handleRemoveFile(0)}
            />
            <div className="flex flex-col justify-between gap-y-2 grow">
              <SelectedImageCard
                file={selectedFiles[1]}
                imageName={`${imagesName}-2`}
                handleRemoveFile={() => handleRemoveFile(1)}
              />
              <SelectedImageCard
                file={selectedFiles[2]}
                imageName={`${imagesName}-3`}
                handleRemoveFile={() => handleRemoveFile(2)}
              />
            </div>
          </>
        );
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { invalid } }) => (
        <FormItem className="flex flex-col space-y-1">
          <FormControl>
            <Input
              type="file"
              multiple
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
            {selectedFiles.length > 0 ? "Change Images" : "Add Images"}
            <ImagePlus />
          </Button>
        </FormItem>
      )}
    />
  );
};

export default MultiImageAvatarField;
