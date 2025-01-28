import { getMapKey } from "@/server-actions";
import { setKey, geocode, RequestType } from "react-geocode";
export const getLocation = async () => {
  let key = await getMapKey();
  //   @ts-expect-error
  setKey(key);

  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          geocode(RequestType.LATLNG, `${latitude},${longitude}`)
            .then(({ results }) => {
              const { city } = results[0].address_components.reduce(
                (acc: any, component: any) => {
                  if (component.types.includes("locality"))
                    acc.city = component.long_name;

                  return acc;
                },
                {}
              );
              resolve(city);
            })
            .catch(console.error);
          //   resolve({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          reject(error); // Reject the promise on error
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
      resolve({ latitude: null, longitude: null }); // Resolve with default values
    }
  });
};
