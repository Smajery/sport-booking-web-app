"use client";

import React from "react";
import { TFacility } from "@/types/public/facilityTypes";
import DefaultImageAvatar from "@/components/atoms/common/Avatars/DefaultImageAvatar/DefaultImageAvatar";
import { Hash, Heart, Home, Map, Text, View } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface IFacilitiesItem {
  facility: TFacility;
}

const FacilitiesItem: React.FC<IFacilitiesItem> = ({ facility }) => {
  const {
    name,
    images,
    description,
    address,
    avgRating,
    facilityType,
    sportType,
    coveringType,
  } = facility;

  const [isFavoriteHovered, setIsFavoriteHovered] =
    React.useState<boolean>(false);

  return (
    <li className="relative flex justify-between gap-x-unit-4 p-unit-4 overflow-hidden h-[260px] w-[500px] primary-gradient-225 rounded-xl ">
      <div className="relative">
        <DefaultImageAvatar
          image={images.length > 0 ? images[0].image : null}
          imageName={name}
          className="w-[260px] h-full rounded-xl shrink-0"
        />
        <div className="w-full absolute top-0 left-0 p-unit-2 flex justify-between gap-x-unit-1">
          <div className="flex gap-x-unit-1">
            <Button variant="none" size="none">
              <Map className="w-unit-6 h-unit-6" color="#ffffff" />
            </Button>
            <Button variant="none" size="none">
              <View className="w-unit-6 h-unit-6" color="#ffffff" />
            </Button>
          </div>
          <Button
            variant="none"
            size="none"
            asChild
            className="cursor-pointer"
            onMouseEnter={() => setIsFavoriteHovered(true)}
            onMouseLeave={() => setIsFavoriteHovered(false)}
          >
            {isFavoriteHovered ? (
              <Image
                width="24"
                height="24"
                src="/icons/favorite.svg"
                alt="Favotire"
              />
            ) : (
              <Image
                width="24"
                height="24"
                src="/icons/not_favorite.svg"
                alt="Not favotire"
              />
            )}
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-y-unit-1 w-full">
        <p className="truncate">{name}</p>
        <div className="relative flex gap-x-unit-2 px-unit-2 py-unit-1 rounded-lg bg-primary text-background">
          <Home
            className="mt-[2px] w-unit-4 h-unit-4 shrink-0"
            color="#FFFFFF"
          />
          <p className="text-ellipsis line-clamp-2">{address}</p>
        </div>
        <div className="relative flex gap-x-unit-2 px-unit-2 py-unit-1 rounded-lg bg-accent text-background">
          <Text
            className="mt-[2px] w-unit-4 h-unit-4 shrink-0"
            color="#FFFFFF"
          />
          <p className="text-ellipsis line-clamp-2">{description}</p>
        </div>
        <div className="flex gap-unit-1 flex-wrap">
          <div className="max-w-max relative gap-x-unit-2 px-unit-2 py-unit-1 rounded-lg bg-secondary text-background">
            <Hash
              className="mt-[2px] w-unit-4 h-unit-4 shrink-0"
              color="#FFFFFF"
            />
            <p className="truncate">{sportType}</p>
          </div>
          {/*<div className="max-w-max relative flex gap-x-unit-2 px-unit-2 py-unit-1 rounded-lg bg-secondary-100 text-background">*/}
          {/*  <Hash*/}
          {/*    className="mt-[2px] w-unit-4 h-unit-4 shrink-0"*/}
          {/*    color="#FFFFFF"*/}
          {/*  />*/}
          {/*  <p className="text-ellipsis line-clamp-2">{facilityType}</p>*/}
          {/*</div>*/}
          {/*<div className="max-w-max relative flex gap-x-unit-2 px-unit-2 py-unit-1 rounded-lg bg-secondary-100 text-background">*/}
          {/*  <Hash*/}
          {/*    className="mt-[2px] w-unit-4 h-unit-4 shrink-0"*/}
          {/*    color="#FFFFFF"*/}
          {/*  />*/}
          {/*  <p className="text-ellipsis line-clamp-2">{coveringType}</p>*/}
          {/*</div>*/}
        </div>
        <p>Рейтинг тут</p>
        <p>Цена тут</p>
      </div>
    </li>
  );
};

export default FacilitiesItem;
