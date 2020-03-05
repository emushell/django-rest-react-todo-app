import React from 'react';
import ProfilePicCardSkeleton from './ProfilePicCardSekeleton';
import ProfileDetailsCardSkeleton from './ProfileDetailsCardSkeleton';

const ProfileSkeleton = () => {

    return (
        <div className="row">
            <div className="col-md-3">
                <ProfilePicCardSkeleton />
            </div>
            <div className="col-md-9">
                <ProfileDetailsCardSkeleton />
            </div>
        </div>
    );
};

export default ProfileSkeleton;