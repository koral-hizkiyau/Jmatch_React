import React from 'react';



function EnoughMatch() {



    return (
        <div className="modal fade" id="myModal5" role="dialog">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                  
                        <h3 className="modal-title">Why am I not seeing enough matches?</h3>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>

                    <div className="modal-body">
                        We will always show you everyone on Jmacth who:<br></br>

                        Matches what you are looking for (age, location, gender, orientation)
                        Is also looking for someone like you
                        Has not blocked you
                        Has an active account

                        We do not charge to see more people.<br></br>

                        If you're not seeing as many people as you expect, try double checking your Looking For settings. You may want to consider expanding those if they’re very restrictive.<br></br>

                        You may also want to reset your passes (you can do so from your settings page under Privacy) to take another look at people you’ve passed on.<br></br>

                        If you’ve done both of these, and you’re still not seeing many people, it unfortunately sounds like we may not have many members in your area who match what you’re looking for.<br></br>
              </div>

                </div>
            </div>
        </div>

    );
}

export default EnoughMatch;
