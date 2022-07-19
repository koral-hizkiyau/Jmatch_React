import React from 'react';



function DeleteAccount() {



    return (
        <div className="modal fade" id="myModal1" role="dialog">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">How to delete your account</h3>

                        <button type="button" className="close" data-dismiss="modal">&times;</button>

                    </div>
                    <div className="modal-body">
                        We hope you're leaving because you met someone awesome! If not, that's a bummer.<br></br> Either way, we will miss you.<br></br>

                        Here's how to do the deed:

                        On the website: you can disable or delete your account from your settings page where it says “Need a Break?” on the bottom of the page.

                        On the app, tap on your profile page, then on Account Settings, and then on Disable your account. Follow the prompts from there.
                    </div>


                </div>
            </div>
        </div>

    );
}

export default DeleteAccount;
