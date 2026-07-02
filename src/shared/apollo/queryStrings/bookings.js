import gql from 'graphql-tag';

export const CREATE_BOOKING = gql`
    mutation CreateBooking(
        $serviceId: ID! $clientName: String! $clientEmail: String!
        $clientPhone: String! $date: String! $time: String!
        $notes: String $location: String
    ) {
        createBooking(
            serviceId: $serviceId clientName: $clientName clientEmail: $clientEmail
            clientPhone: $clientPhone date: $date time: $time
            notes: $notes location: $location
        ) {
            id referenceCode depositAmount totalPrice status
            service { name }
        }
    }
`;

export const PESAPAL_BOOKING_REQUEST = gql`
    mutation PesapalBookingRequest($bookingId: ID!, $callback_url: String!) {
        pesapalBookingRequest(bookingId: $bookingId, callback_url: $callback_url) {
            redirectUrl
            orderTrackingId
        }
    }
`;

export const GET_BOOKING_BY_REF = gql`
    query GetBookingByRef($referenceCode: String!) {
        bookingByRef(referenceCode: $referenceCode) {
            id referenceCode clientName date time status
            depositAmount totalPrice depositPaid
            service { name category }
        }
    }
`;
