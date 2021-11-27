export function updateStroage(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}