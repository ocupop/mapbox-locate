export default {
  hotels: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-122.4007, 37.7947]
        },
        properties: {
          address: '333 Battery St',
          city: 'San Francisco',
          country: 'United States',
          name: 'Le Meridien San Francisco',
          pierDistance: '0.6 miles from Pier 27',
          postalCode: '94111',
          state: 'CA',
          url:
            'https://www.starwoodhotels.com/lemeridien/property/overview/index.html?propertyID=1957&language=en_US'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-122.4138, 37.8066]
        },
        properties: {
          address: '2500 Mason St',
          city: 'San Francisco',
          country: 'United States',
          name: "Sheraton Fisherman's Wharf",
          pierDistance: '0.8 miles from Pier 27',
          postalCode: '94133',
          state: 'CA',
          url: 'http://www.sheratonatthewharf.com/'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-122.4138, 37.8066]
        },
        properties: {
          address: '5 Embarcadero Center',
          city: 'San Francisco',
          country: 'United States',
          name: 'Hyatt Regency San Francisco',
          pierDistance: '0.7 miles from Pier 27',
          postalCode: '94111',
          state: 'CA',
          url: 'https://sanfrancisco.regency.hyatt.com/en/hotel/home.html'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-122.3931, 37.7935]
        },
        properties: {
          address: '8 Mission St',
          city: 'San Francisco',
          country: 'United States',
          name: 'Hotel Vitale',
          pierDistance: '0.8 miles from Pier 27',
          postalCode: '94105',
          state: 'CA',
          url:
            'https://www.jdvhotels.com/hotels/california/san-francisco/hotel-vitale'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-122.392, 37.7927]
        },
        properties: {
          address: '165 Steuart St',
          city: 'San Francisco',
          country: 'United States',
          name: 'Harbor Court Hotel',
          pierDistance: '0.9 miles from Pier 27',
          postalCode: '94105',
          state: 'CA',
          url: 'https://www.harborcourthotel.com/'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-122.4131, 37.8077]
        },
        properties: {
          address: '250 Beach St',
          city: 'San Francisco',
          country: 'United States',
          name: 'Hotel Zephyr',
          pierDistance: '0.8 miles from Pier 27',
          postalCode: '94133',
          state: 'CA',
          url: 'http://www.hotelzephyrsf.com/'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-122.4176, 37.8057]
        },
        properties: {
          address: '1250 Columbus Avenue',
          city: 'San Francisco',
          country: 'United States',
          name: 'Marriott Fisherman’s Wharf',
          pierDistance: '1.0 mile from Pier 27',
          postalCode: '94133',
          state: 'CA',
          url:
            'http://www.marriott.com/hotels/travel/sfofw-san-francisco-marriott-fishermans-wharf/'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-122.4141, 37.8062]
        },
        properties: {
          address: '425 North Point St',
          city: 'San Francisco',
          country: 'United States',
          name: 'Hotel Zoe San Francisco',
          pierDistance: '0.8 miles from Pier 27',
          postalCode: '94133',
          state: 'CA',
          url: 'http://www.hotelzoesf.com/'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-122.4168, 37.8054]
        },
        properties: {
          address: '2620 Jones St',
          city: 'San Francisco',
          country: 'United States',
          name: 'Pier 2620 Hotel',
          pierDistance: '1.0 miles from Pier 27',
          postalCode: '94133',
          state: 'CA',
          url: 'http://www.pier2620hotel.com'
        }
      }
    ]
  },
  locateMarker: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          name: 'Conference Center',
          address: 'Pier 27, The Embarcadero',
          city: 'San Francisco',
          state: 'CA',
          postalCode: '94111'
        },
        geometry: {
          coordinates: [-122.40128874778746, 37.80520659803617],
          type: 'Point'
        }
      }
    ]
  }
};
