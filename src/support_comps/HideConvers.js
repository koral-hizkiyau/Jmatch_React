import React from 'react';



function HideConvers() {



    return (
        <div className="modal fade" id="myModal6" role="dialog">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                     
                        <h3 className="modal-title">How to hide a conversation</h3>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>

                    <div className="modal-body">
                        We automatically archive and hide inactive conversations by moving them to the Old Conversations section after 90 days of inactivity.

                        Once you have a conversation with someone, we don't show them to you around OkCupid any more (because you've already liked and messaged them, so it's redundant to suggest them to you again). We keep them in the conversations page so you can find them if you want to, which is why there's no delete button - deleting them would hide them from you everywhere.

                        Of course, we realize sometimes you really don't want to see someone again, so to permanently remove a message from your Conversations page, you can block or unmatch the person who sent it. That will remove the Conversation from the Conversations page for both of you, and prevent further messages between you, as well as hiding you from each other throughout OkCupid.
              </div>

                </div>
            </div>
        </div>

    );
}

export default HideConvers;
