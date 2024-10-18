import { addDays } from "date-fns";

function futureTodo() {
    const amount = 4 + Math.floor(Math.random() * 3);
    return addDays(new Date(), amount);
}

function randomID16() {
    
    // pretty much guarantees uniqueness
    const today = new Date();

    const part1 = (today.getTime())
    .toString(36)
    .substring(0, 8)
    .padStart(8, 0);

    // randomness
    // due to double point precision
    // use two numbers
    const FILLER_NUMBERS = '0123456789abcdefghijklmnopqrstuvwxyz';
    const CHOSEN_FILLER = FILLER_NUMBERS[Math.floor(Math.random() * FILLER_NUMBERS.length)];

    const part2 = (Math.random())
        .toString(36)
        .substring(2, 8)
        .padStart(8, CHOSEN_FILLER);

    return (part1 + part2) 
        .match(/.{4}/g)
        .join('-');

}



export { randomID16, futureTodo };