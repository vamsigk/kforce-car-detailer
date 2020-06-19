import Firebase from '../../constants/Firebase';
import CarService from '../../models/CarService';

export const FETCH_SERVICES = 'FETCH_SERVICES';

export const fetchAllServices = () => {

    return async (dispatch) => {

        const fetchServicesURL = (Firebase.ServicesURL).concat(Firebase.ServicesNode).concat('.json');
        const response = await fetch(fetchServicesURL);
        const resData = await response.json();
        const additionalServices = [];
        const generalServices = [];

        for(const key in resData) {
            if(resData[key].serviceFrequency === 'general') {
                generalServices.push(
                    new CarService(
                        resData[key].serviceId.toString(),
                        resData[key].serviceName,
                        resData[key].servcieCategory,
                        resData[key].serviceFrequency,
                        resData[key].serviceTimeEstimate,
                        resData[key].serviceDetails,
                        resData[key].serviceStartPrice,
                        resData[key].priceItems
                    )
                );
            }else if (resData[key].serviceFrequency === 'additional') {
                additionalServices.push(
                    new CarService(
                        resData[key].serviceId.toString(),
                        resData[key].serviceName,
                        resData[key].servcieCategory,
                        resData[key].serviceFrequency,
                        resData[key].serviceTimeEstimate,
                        resData[key].serviceDetails,
                        resData[key].serviceStartPrice,
                        resData[key].priceItems
                    )
                )
            }
        }
        dispatch({
            type: FETCH_SERVICES,
            additionalServices: additionalServices,
            generalServices: generalServices
        })
    };
};