import { getServerMe } from "@/lib/api/serverApi";
import ProfileEditPageWrapper from "./EditProfilePage";

async function ProfileEditPage() {
const user = await getServerMe();
    return (
        <>
        <ProfileEditPageWrapper user={user}/>
        </>
    )
}

export default ProfileEditPage;

