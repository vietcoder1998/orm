export default function randomID(number?: number) {
    return  '_' + Math.random().toString(36).substr(2, 9);
}