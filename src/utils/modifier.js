export function calcMod(number) {
    if (number >= 1 && number <= 3) {
        return "-3";
    } else if (number >= 4 && number <= 5) {
        return "-2";
    } else if (number >= 6 && number <= 8) {
        return "-1";
    } else if (number >= 13 && number <= 15) {
        return "+1";
    } else if (number >= 16 && number <= 17) {
        return "+2";
    } else if (number >= 18) {
        return "+3";
    } else {
        return "+0";
    }
}
