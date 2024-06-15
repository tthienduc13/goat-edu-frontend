import { Wrapper } from "../_components/wrapper";
import { AccountDeletion } from "./_components/account-deletion";

import { AccountInformation } from "./_components/account-information";
import { AccountPassword } from "./_components/account-password";
import { AvatarChanging } from "./_components/avatar-changing";

const ProfilePage = () => {
  return (
    <Wrapper title="Profile">
      <div className="flex pb-10 flex-col h-full overflow-y-scroll no-scrollbar w-full gap-y-10">
        <AvatarChanging />
        <AccountInformation />
        <AccountPassword />
        <AccountDeletion />
      </div>
    </Wrapper>
  );
};

export default ProfilePage;
