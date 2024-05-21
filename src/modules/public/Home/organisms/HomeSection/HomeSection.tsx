"use client";

import React from "react";
import FacilitiesList from "@/components/molecules/public/Lists/FacilitiesList/FacilitiesList";
import FacilityFilter from "@/components/molecules/public/Filters/FacilityFilter/FacilityFilter";
import { List, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import ClustererMap from "@/components/atoms/public/Maps/ClustererMap/ClustererMap";
import { useQuery } from "@apollo/client";
import { GET_ALL_FACILITIES_QUERY } from "@/apollo/query/public/facility";
import ErrorHandler from "@/utils/handlers/ErrorHandler";
import { TFacilityFilter } from "@/types/public/facilityTypes";
import { getApolloErrorMessage } from "@/utils/helpers/error.helpers";
import { TPriceRange } from "@/types/commonTypes";

const limit = 10;

const HomeSection = () => {
  const [isShowMap, setIsShowMap] = React.useState<boolean>(false);
  const [selectedLocationId, setSelectedLocationId] = React.useState<
    number | null
  >(null);

  const [filterValues, setFilterValues] =
    React.useState<TFacilityFilter | null>(null);
  const [priceRange, setPriceRange] = React.useState<TPriceRange>({
    min: 0,
    max: 0,
  });
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleSetFilterValues = (newFilterValues: TFacilityFilter | null) => {
    setFilterValues(newFilterValues);
  };

  const { data, loading, error, fetchMore } = useQuery(
    GET_ALL_FACILITIES_QUERY,
    {
      context: {
        authRequired: true,
      },
      variables: {
        paginationArgs: {
          limit: limit,
          page: 1,
        },
        facilitiesFilterInput: filterValues,
      },
      onCompleted: (data) => setPriceRange(data.findAll.priceRange),
    },
  );

  const fetchMoreData = async () => {
    try {
      await fetchMore({
        variables: {
          paginationArgs: {
            limit: limit,
            page: currentPage + 1,
          },
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevResult;
          setCurrentPage(currentPage + 1);
          return {
            findAll: {
              __typename: prevResult.findAll.__typename,
              facilities: [
                ...prevResult.findAll.facilities,
                ...fetchMoreResult.findAll.facilities,
              ],
              totalCount: fetchMoreResult.findAll.totalCount,
            },
          };
        },
      });
    } catch (e) {
      ErrorHandler.handle(e, { componentName: "HomeSection__fetchMore" });
    }
  };

  return (
    <section className="relative w-full flex gap-x-10 justify-between pt-5">
      <div className="w-[400px]">
        <FacilityFilter
          handleSetFilterValues={handleSetFilterValues}
          isFetchLoading={loading}
          priceRange={priceRange}
        />
      </div>
      <div className="w-[1000px] flex flex-col gap-y-4">
        {!isShowMap ? (
          <>
            <Button
              variant="none"
              size="lg"
              onClick={() => setIsShowMap(true)}
              className="fixed top-108 w-[1000px] h-[56px] border-2 border-border bg-white/50 z-10 hover:bg-background"
            >
              <div className="flex items-start gap-x-1">
                Show map <Map className="w-5 h-5" />
              </div>
            </Button>
            <div className="h-[56px]"></div>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{getApolloErrorMessage(error)}</div>
            ) : data.findAll.facilities.length === 0 && filterValues ? (
              <div>No facilities for this filter</div>
            ) : data.findAll.facilities.length === 0 && !filterValues ? (
              <div className="flex justify-center p-5 ">
                We don't have any facility yet, try to come back after few
                minutes!
              </div>
            ) : (
              <FacilitiesList
                facilities={data.findAll.facilities}
                totalCount={data.findAll.totalCount}
                fetchMoreData={fetchMoreData}
              />
            )}
          </>
        ) : (
          <>
            <Button
              variant="none"
              size="lg"
              onClick={() => setIsShowMap(false)}
              className="h-[56px] bg-primary text-primary-foreground border-2 border-primary shrink-0"
            >
              <div className="flex items-start gap-x-1">
                Show list <List className="w-5 h-5" strokeWidth={2.5} />
              </div>
            </Button>
            <ClustererMap
              selectedLocationId={selectedLocationId}
              setSelectedLocationId={setSelectedLocationId}
              facilities={!loading && !error ? data.findAll.facilities : []}
              className="max-h-[900px]"
            />
          </>
        )}
      </div>
    </section>
  );
};

export default HomeSection;
