import React from 'react';



function SeeLikes() {



    return (
        <div className="modal fade" id="myModal2" role="dialog">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                    
                        <h3 className="modal-title">How to see who likes you (for free)</h3>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        If you and another member Like each other, we always let you both know, for free.<br>
                        </br>
             * If they like you first: as soon as you Like their profile, you'll see a pop-up telling you that you both Like each other! <br></br>
* If you like them first: we'll send you a notification as soon as they Like you back
We also show you these people at the top of your Likes page, in a section labeled "Matches" and we show you people who have Liked you and sent you an Intro in the intros section.
Additionally, if someone Likes your profile, you're more likely to see them sooner in DoubleTake than someone who hasn't Liked you, because we want to make sure to give you the opportunity to Like them back! (And if you Like someone first, that means they're more likely to see you too).

As long as you're active and Like everyone you're interested in, you'll always know who Likes you back, for free.

              </div>

                </div>
            </div>
        </div>

    );
}

export default SeeLikes;
