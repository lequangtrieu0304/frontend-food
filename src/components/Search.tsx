import {Link, useParams} from "react-router-dom";
import FilterPage from "@/components/FilterPage.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Globe, MapPin, X} from "lucide-react";
import {Card, CardContent, CardFooter} from "@/components/ui/card.tsx";
import {AspectRatio} from "@/components/ui/aspect-ratio.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Restaurant} from "@/types/restaurantType.ts";
import {useRestaurantStore} from "@/stores/useRestaurantStore.ts";

const Search = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const {
    loading,
    searchedRestaurant,
    searchRestaurant,
    // setAppliedFilter,
    // appliedFilter,
  } = useRestaurantStore();

  useEffect(() => {
    searchRestaurant(params.text!);
  }, []);

  const countries: string[] = searchedRestaurant?.map(i => i.country);

  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className='flex flex-col md:flex-row justify-between gap-10'>
        <FilterPage/>
        <div className='flex-1'>
          <div className='flex items-center gap-2'>
            <Input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button>Search</Button>
          </div>
          {/*Search items display here */}
          <div>
            <div className='flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3'>
              <h1 className='font-medium text-lg'>
                ({countries.length}) Search result found
              </h1>
              <div className='flex flex-wrap gap-2 mb-4 md:mb-0'>
                {
                  countries?.map((selectedFilter: string, index: number) => (
                    <div
                      key={index}
                      className='relative inline-flex items-center max-w-full'
                    >
                      <Badge
                        className='rounded-md hover:cursor-pointer pr-6 mr-1 whitespace-nowrap'>{selectedFilter}</Badge>
                      <X size={'16'} className='absolute text-white right-1 hover:cursor-pointer'/>
                    </div>
                  ))
                }
              </div>
            </div>

            {/*Restaurant Cards*/}
            <div className='grid md:grid-cols-3 gap-4'>
              {loading
                ? (< SearchPageSkeleton/>)
                : !loading && searchedRestaurant?.length === 0
                  ? (<NoResultFound searchText={params.text!}/>)
                  : (
                    searchedRestaurant.map((item: Restaurant) => (
                      <Card className='bg-white dark:bg-gray-800 shadow-lg overflow-hidden'>
                        <div className='relative'>
                          <AspectRatio ratio={16 / 6}>
                            <img src={item.imageUrl} alt='' className='w-full h-full object-cover'/>
                          </AspectRatio>
                          <div
                            className='absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg py-1 px-3'>
                            <span>Featured</span>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {item.name}
                          </h1>
                          <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                            <MapPin size={16}/>
                            <p className="text-sm">
                              {item.city}:{" "}
                              <span className="font-medium">{item.city}</span>
                            </p>
                          </div>
                          <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                            <Globe size={16}/>
                            <p className="text-sm">
                              {item.country}:{" "}
                              <span className="font-medium">{item.country}</span>
                            </p>
                          </div>
                          <div className="flex gap-2 mt-4 flex-wrap">
                            {item.cuisines.map(
                              (cuisine: string, idx: number) => (
                                <Badge
                                  key={idx}
                                  className="font-medium px-2 py-1 rounded-full shadow-sm"
                                >
                                  {cuisine}
                                </Badge>
                              )
                            )}
                          </div>
                        </CardContent>
                        <CardFooter
                          className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
                          <Link to={`/restaurant/${item._id}`}>
                            <Button
                              className="font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">
                              View Menus
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    )))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;

const SearchPageSkeleton = () => {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <Card
          key={index}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden"
        >
          <div className="relative">
            <AspectRatio ratio={16 / 6}>
              <Skeleton className="w-full h-full"/>
            </AspectRatio>
          </div>
          <CardContent className="p-4">
            <Skeleton className="h-8 w-3/4 mb-2"/>
            <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
              <Skeleton className="h-4 w-1/2"/>
            </div>
            <div className="mt-2 flex gap-1 items-center text-gray-600 dark:text-gray-400">
              <Skeleton className="h-4 w-1/2"/>
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              <Skeleton className="h-6 w-20"/>
              <Skeleton className="h-6 w-20"/>
              <Skeleton className="h-6 w-20"/>
            </div>
          </CardContent>
          <CardFooter className="p-4  dark:bg-gray-900 flex justify-end">
            <Skeleton className="h-10 w-24 rounded-full"/>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

const NoResultFound = ({searchText}: { searchText: string }) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        No results found
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        We couldn't find any results for "{searchText}". <br/> Try searching
        with a different term.
      </p>
      <Link to="/">
        <Button className="mt-4 bg-orange hover:bg-orangeHover">
          Go Back to Home
        </Button>
      </Link>
    </div>
  );
};