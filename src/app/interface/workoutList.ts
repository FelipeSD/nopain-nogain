export interface WorkoutList {
    "_id": string,
    "createdAt": string;
    "updatedAt": string;
    "__v": number;
    
    exercise: String; // name
    weight: Number; // kg
    repetition: Number; //int - how many times until stop
    restTime: Number;// seconds - allow the muscle to recover - usually in the range of 30 seconds to two minutes
    sets: Number; // int - series of repetitions to complete the exercise
    frequency: {
        type: String,
        enum: ["Diary", "1 time/week", "2 times/week", "3 times/week", "4 times/week"],
        default: "Diary"
    }; 
    notes: String;
    owner: String;
}