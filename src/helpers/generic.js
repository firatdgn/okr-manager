export function isInRange($check, $start, $end) {
    return $start <= $check && $check <= $end;
}
export function findById(id, arr, idField = "id") {
    for (let obj of arr) {
        if (obj[idField] === id) {
            return obj;
        }
    }
    return null;
}
