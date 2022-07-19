import React, { useEffect } from 'react';



function Photorules() {



    return (
        <div className="modal fade" id="myModal3" role="dialog">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                   
                        <h3 className="modal-title">Jmatch Photo Rules at a glance:</h3>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        1. All photos in the Profile Photos Album must show your face <br></br>
2. Your Profile Essays can contain other types of photos <br></br>

3. You are not allowed to post the following anywhere on OkCupid: <br></br>

Images posted without permission/ copyright photos
Photos with contact information on them
Photos of children (alone or posted without permission)
Hateful, illegal, or violent imagery
Nudity and explicit sexual content

                    </div>

                </div>
            </div>
        </div>

    );
}

export default Photorules;
