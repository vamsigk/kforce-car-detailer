import Firebase from '../../constants/Firebase';
import Location from '../../models/Location';

export const SET_LOCATIONS = 'SET_LOCATIONS';


export const fetchLocations = () => {

    return async dispatch => {

        const fetchLocationsURL = (Firebase.LocationsURL).concat(Firebase.LocationsNode).concat('.json');
        const response = await fetch(fetchLocationsURL);
        const resData = await response.json();


        const loadedLocations = [];

        for(const key in resData) {
            loadedLocations.push(
                new Location(
                    resData[key].locationId.toString(),
                    resData[key].locationName,
                    resData[key].addressLineOne,
                    resData[key].addressLineTwo,
                    resData[key].mobileNumber,
                    resData[key].phoneNumber,
                    resData[key].city,
                    resData[key].zipcode,
                    resData[key].state,
                    resData[key].country,
                    resData[key].emailId
                )
            )
        }

        dispatch({
            type : SET_LOCATIONS,
            locations: loadedLocations
        })

    };
};