export const STATIC_CATEGORIES = [
  {
    "_id": "69eb3e7debfe92dc6194927f",
    "name": "Ro wanter plant",
    "slug": "ro-wanter-plant",
    "division": {
      "_id": "69e87238bcd3e352f23c543a",
      "name": "RO Solutions",
      "slug": "ro-solutions"
    },
    "imageUrl": "https://res.cloudinary.com/dpmyifbns/image/upload/v1777385061/delta-impex/fqat8gue9jv8wvysw0cv.jpg"
  },
  {
    "_id": "69f07175342748767500319f",
    "name": "Industrial Parts",
    "slug": "industrial-parts-1",
    "division": {
      "_id": "69e87238bcd3e352f23c5439",
      "name": "Marine & Industrial",
      "slug": "marine-industrial"
    },
    "imageUrl": "https://res.cloudinary.com/dpmyifbns/image/upload/v1777365364/delta-impex/snljkmao8t2sy47iybw7.png"
  },
  {
    "_id": "69f19e87bfa842f1dcffe39d",
    "name": "Main engine ",
    "slug": "main-engine",
    "division": {
      "_id": "69e87238bcd3e352f23c5439",
      "name": "Marine & Industrial",
      "slug": "marine-industrial"
    },
    "imageUrl": "https://res.cloudinary.com/dpmyifbns/image/upload/v1777442431/delta-impex/s5qzjdarqqe0dpnpbdxe.png"
  },
  {
    "_id": "69f1ba9a0d961949f81819c8",
    "name": "Generators",
    "slug": "generators",
    "division": {
      "_id": "69e87238bcd3e352f23c5439",
      "name": "Marine & Industrial",
      "slug": "marine-industrial"
    },
    "imageUrl": "https://res.cloudinary.com/dpmyifbns/image/upload/v1777449627/delta-impex/co6rg6kydkhxupwe7z3i.png"
  }
];

export async function getCategories() {
  return STATIC_CATEGORIES;
}

export function getCachedCategories() {
  return STATIC_CATEGORIES;
}
