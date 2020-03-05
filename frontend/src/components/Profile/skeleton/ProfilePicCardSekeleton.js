import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Card from '../../Card';

const ProfilePicCardSkeleton = () => {

    return (
        <Card>
            <div className="card-body">
                <h4 style={{ 'textAlign': 'center' }}>Account Settings</h4>
                <hr />
                <Skeleton circle={true}  height={200} width={200} />
            </div>
        </Card>
    );
};

export default ProfilePicCardSkeleton;