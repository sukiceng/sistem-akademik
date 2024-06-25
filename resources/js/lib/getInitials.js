export function getInitials(username) {
    if (!username) return '';

    // Split the username into words
    const words = username.split(' ');

    // Extract the first character of each word
    let initials = words.map(word => word[0]).join('');

    // Limit the initials to 2 characters
    initials = initials.substring(0, 2);

    return initials.toUpperCase();
}