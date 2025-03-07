# Dawpark Backend

## Requests

### To get all the parkings that exist in the Trafikverket API simply run:

```http
GET /parkings
```

This returns data in the following format:

```JSON
[
    {
        county_no: string[] // County number (länsnummer)
        deleted: boolean // Indicates that the data record has been deleted
        description: string // Description of the parking in swedish
        distance_to_nearest_city: string // General description of how close the parking is to the nearest city in swedish
        sweref: string // Parking position as a geometric point in the SWEREF99TM coordinate system
        wgs84: {type: string, coordinates: number[]} // Parking position as a geometric point. coordinates[0] = longitude, coordinates[1] = latitude.
        icon_id: string // Icon ID for the parking lot icon
        parking_id: string // The UNIQUE id for the parking lot
        location_description: string // General description of the location in swedish
        modified_time: Date // Time when the data record was changed
        name: string // The name of the parking lot
        open_status: string // If the parking lot is currently open (NOTE: The API data does not update frequently enough to make this reliable)
        operation_status: string // Indicates whether there are any operational disturbances at the resting place (limitedOperation) or if everything works (inOperation)
        operator_contact: string // Name of the operator's contact
        operator_contact_email: string // Operator contact email
        operator_contact_phone: string // Operator phone number
        operator_name: string // The name of the operator
        tariff_payment_fee: boolean // Indicates if the parking is free or not
        tariff_payment_cost: string // The hourly rate of the parking lot
        usage_scenario: string[] // Specifies scope of the parking lot

    }
]
```

### To get all the parkings within X meters from coordinate point y:

```http
GET /parking/proximity
```

with two required parameters:

```JSON
{
  "coordinate": WKT, // "coordinate": "POINT(LONG, LAT)"
  "range": number // "range": 100 => 100 meters
}
```

There also exists optional filter parameters that can be sent along with the request:
(Please note that the only possible value for each filter is true)

```JSON
  "toilet": true,
  "shower": true,
  "firstAidEquipment": true,
  "refuseBin": true,

```

An example requests that fetches all parkings that have a toilet and a shower within 200 meters of point 12.5210905 58.3041534:

```http
GET /parking/proximity?coordinate=POINT(12.5210905 58.3041534)&range=200&toilet=true&shower=true
```

Reponse body is formatted the same way as GET /parkings

## Errors

Errors returned from the server will always be returned in the following format (If an error does not, it is not yet a handled issue and will be delt with as development goes by):

```JSON
[
  {
    field: string,
    message: string
  }
]
```

## Features

### Data acquisition

- [x] Get data from the Trafikverket API

### Data processing

- [x] Fill database with data
- [x] Integrate PostGIS to enable geometrical/geolocation queries
- [x] Handle geometry using postgres queries

### API-Functionality

- [x] Return a mirror of the Trafikverket API but from our own database to minimize API-Key usage
- [x] Return parkings within a given radius
- [x] Return parkings fulfilling certain filter conditions

### API-Enchancements

### Development Simplification

- [x] Make the codebase work with Docker
- [x] Setup a remote host server with Docker/Dokku that shall host the API
- [x] Create an automated shell-script to upload new API versions to the remote host
- [ ] Automatic builds from git commits using webhooks in DockerHub
