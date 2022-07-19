import React from 'react';



function SignIn() {



    return (
        <div className="modal fade" id="myModal4" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
          
                <h3 className="modal-title">Sign-in troubleshooting</h3>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>
              <div className="modal-body">
              Unfortunately, login with Facebook is no longer possible on the iOS app. We recommend that you: 

Use Android, mobile web, or desktop to log in
Send a reset password link (see below)
Make sure to add a new password and SMS to log in going forward
If you need a password reset
If you don't remember your password, you can have a login link emailed to you here. You'll want to enter the email address linked to your OkCupid profile.
If you still need help, this article walks you through password reset troubleshooting.
              </div>
      
            </div>
          </div>
        </div>

    );
}

export default SignIn;
