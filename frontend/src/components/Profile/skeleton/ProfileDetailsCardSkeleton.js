import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Card from '../../Card';

const ProfileDetailsCardSkeleton = () => {

    return (
        <Card>
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-12">
                        <h4><Skeleton /></h4>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        {Array(5)
                            .fill()
                            .map((item, index) => {
                                return (
                                    <div key={index} className="form-group row">
                                        <label className="col-sm-3 col-form-label"><Skeleton height={24} width={174} /></label>
                                        <div className="input-group col-sm-6">
                                            <Skeleton height={38} width={375} />
                                        </div>
                                    </div>
                                );
                            })
                        }
                        <div className="form-group row">
                            <div className="offset-3 col-sm-2 pr-0">
                                <form className="form-inline">
                                    <Skeleton  height={31} width={120}/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ProfileDetailsCardSkeleton;