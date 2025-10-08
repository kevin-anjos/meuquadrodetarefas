import { userProfileImg, standardUserProfileImg } from "../domElements.js";
import { getUser } from "../utils/appServices.js";

const { profilePicture } = await getUser();

console.log(profilePicture);

export const printUserProfileImage = imageURL => {
    if (!imageURL || imageURL.trim() === "") {
        userProfileImg.classList.add('hidden')
        standardUserProfileImg.classList.remove('hidden');
        return;
    } 

    userProfileImg.setAttribute('src', imageURL);
    userProfileImg.classList.remove('hidden');
    standardUserProfileImg.classList.add('hidden');
}

printUserProfileImage(profilePicture);