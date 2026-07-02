import gql from 'graphql-tag';

export const GET_SERVICES = gql`
    query GetServices($category: String) {
        services(category: $category) {
            id name category description price currency duration depositPercentage images
        }
    }
`;

export const GET_SERVICE = gql`
    query GetService($id: ID!) {
        service(id: $id) {
            id name category description price currency duration depositPercentage images
        }
    }
`;
