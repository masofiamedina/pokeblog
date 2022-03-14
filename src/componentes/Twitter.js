import React from 'react';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';


const Twitter = () => {
    
    return(

        <div className="container">
            <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="pokemon"
                    options={{height: 400}}
                    noHeader
                    noFooter
                />
        </div>

    )   
}

export default Twitter;



 