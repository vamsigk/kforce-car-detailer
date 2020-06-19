class Location {
    constructor(
        id,
        locationName,
        addressLineOne,
        addressLineTwo,
        mobileNumber,
        phoneNumber,
        city,
        zipcode,
        state,
        country,
        emailId,
        coordinate
    ) {
        this.id = id;
        this.locationName = locationName;
        this.addressLineOne = addressLineOne;
        this.addressLineTwo = addressLineTwo;
        this.mobileNumber = mobileNumber;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.zipcode = zipcode;
        this.state = state;
        this.country = country;
        this.emailId = emailId;
        this.coordinate = coordinate
    }
}

export default Location;