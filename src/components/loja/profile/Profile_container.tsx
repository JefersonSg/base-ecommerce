import { type UserInterface } from '@/src/shared/helpers/interfaces';
import React from 'react';
import styles from './ProfileContainer.module.css';
import Image from 'next/image';
import ProfileUSuario from './Usuario';
import ProfileNAvBUttons from './NavButtons';

const ProfileContainer = ({ userData }: { userData: UserInterface }) => {
  return (
    <div className={styles.profile_container}>
      <div className={styles.user_infos}>
        <ProfileUSuario userData={userData} />
        <ProfileNAvBUttons />
      </div>
    </div>
  );
};

export default ProfileContainer;
