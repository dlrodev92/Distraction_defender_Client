export const formatUrl = (url, prefix) => {
    if (url.startsWith(prefix)) {
        
        return url.slice(prefix.length);

      }

     return url 
}