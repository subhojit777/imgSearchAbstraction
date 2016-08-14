# Image Search Abstraction Layer

## Usage

### Image search endpoint `https://subhojit777-imgsearch.herokuapp.com/api/imagesearch/?offset=x`
This will return an array of search results paginated to x. Each result will contain the URL of the image along with some metadata of the image.

### Latest image search endpoint `https://subhojit777-imgsearch.herokuapp.com/api/latest/imagesearch`
This will return an array of searches made so far. If no search has been made and you are calling this endpoint, then you will get this output `{status: 'No search made'}`

## Demo
https://subhojit777-imgsearch.herokuapp.com

## FreeCodeCamp
https://www.freecodecamp.com/challenges/image-search-abstraction-layer
