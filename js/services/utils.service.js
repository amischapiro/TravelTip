export const utils = {
    getId
}

function getId() {
    return Math.random().toString(36).slice(2);
}