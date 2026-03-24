export const formatDateForInput = (dateString?: string) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
};