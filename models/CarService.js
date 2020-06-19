
class CarService {
    constructor(
        id,
        serviceName,
        serviceCategory,
        serviceFrequency,
        serviceTimeEstimate,
        serviceDetails,
        serviceStartPrice,
        priceItems
    ) {
        this.id = id;
        this.serviceName = serviceName;
        this.serviceCategory = serviceCategory;
        this.serviceFrequency = serviceFrequency;
        this.serviceTimeEstimate = serviceTimeEstimate;
        this.serviceDetails = serviceDetails;
        this.serviceStartPrice = serviceStartPrice;
        this.priceItems = priceItems;
    }
};

export default CarService;