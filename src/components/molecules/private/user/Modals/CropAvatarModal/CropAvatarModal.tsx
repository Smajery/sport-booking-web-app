import React from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { Area } from "react-easy-crop/types";
import getCroppedImg from "@/utils/helpers/image.helpers";
import ErrorHandler from "@/utils/handlers/ErrorHandler";

interface ICropAvatarModal {
  selectedAvatar: string | null;
  handleSetCroppedAvatar: (file: File, url: string) => void;
  handleCancel: () => void;
}

const CropAvatarModal: React.FC<ICropAvatarModal> = ({
  selectedAvatar,
  handleSetCroppedAvatar,
  handleCancel,
}) => {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<Area | null>(
    null,
  );

  const onCropComplete = React.useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleSetCroppedImage = async () => {
    try {
      const croppedBlob = await getCroppedImg(
        selectedAvatar as string,
        croppedAreaPixels as Area,
      );
      const croppedImageUrl = URL.createObjectURL(croppedBlob);

      const croppedFile = new File([croppedBlob], "avatar.jpg", {
        type: "image/jpg",
      });
      handleSetCroppedAvatar(croppedFile, croppedImageUrl);
      handleCancel();
    } catch (e) {
      ErrorHandler.handle(e, {
        componentName: "CropUserProfileAvatar__showCroppedImage",
      });
    }
  };
  return (
    <div className="absolute flex items-center justify-center w-full h-full top-0 left-0 z-[2000] bg-black/50">
      <div className="flex flex-col p-5 bg-background rounded-xl gap-y-5">
        <div className="relative w-[500px] h-[500px] overflow-hidden rounded-xl">
          <Cropper
            image={selectedAvatar as string}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            cropShape="round"
            showGrid={false}
          />
        </div>
        <div className="flex justify-end gap-x-4">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="button"
            size="lg"
            onClick={handleSetCroppedImage}
          >
            Crop Image
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CropAvatarModal;
