import { type UserInterface } from '@/src/shared/helpers/interfaces';
import React from 'react';
import styles from './ProfileContainer.module.css';
import ProfileUSuario from './Usuario_edit';

const ProfileContainerEdit = ({ userData }: { userData: UserInterface }) => {
  return (
    <div className={styles.profile_container}>
      <div className={styles.user_infos}>
        <ProfileUSuario userData={userData} />
      </div>
    </div>
  );
};

export default ProfileContainerEdit;
