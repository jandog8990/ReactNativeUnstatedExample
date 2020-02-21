/**
 * API config for issuing calls to the Abantu NodeJS server
 * TODO: May need to add client secrets and IDs, will remove 
 * the OrderId and other temporary ISBN book info
 */
export const apiConfig = {
    "baseUrl": "https://ba74008d.ngrok.io",
    "genres": "/android/genres/",
    "bookPlayer": "/android/books/player/",
    "purchasedBooks": "/android/purchased-books/",
    "orderId": "5c81be173a162c491abb1cfd",
    "isbn": "967714",
    "titleId": "Outlaw"
};