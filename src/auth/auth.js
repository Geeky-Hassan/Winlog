export const isAuthenticated = () => {
    return !!localStorage.getItem('authToken') && localStorage.getItem('authToken') !== undefined;
}