export interface Client {
    "_id": string;
    "createdAt": string;
    "updatedAt": string;
    "__v": number;
    
    "userId": string;

    name: String;
    age: Number; // years
    weight: Number; // Kg
    height: Number; // meters
    gender: String;
}