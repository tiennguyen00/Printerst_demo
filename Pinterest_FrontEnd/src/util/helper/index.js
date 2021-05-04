
// Get file format from file name
export const getFileFormat = (fileName = '', isVideo = false) => {
    const arr = fileName.split('.');
    const format = arr.length > 1 ? arr[arr.length-1] : '';
    return format;
}