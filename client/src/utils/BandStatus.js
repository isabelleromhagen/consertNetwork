import UserService from '../shared/services/UserService';
import FeedService from '../shared/services/FeedService';

export const checkStatus = (band, currentUser) => {

        if(!currentUser ) {
            return ["none", "Not listed"];
         
        } else {
            if(currentUser.user.want.includes(band)) {
                return ["want", "Want to see"];
            }
            else if (currentUser.user.seen.includes(band)) {
                return ["seen", "Seen"];
            } else {
                return ["none", "Not listed"];
            }
        }
        
    }

export const handleWanted = async (band, currentUser) => {
      if (!currentUser.user.want) {
        currentUser.user.want = [];
      }
      if (!currentUser.user.seen) {
        currentUser.user.seen = []; 
      }
      if (currentUser.user.want.includes(band)) {
        currentUser.user.want = currentUser.user.want.filter((item) => item !== band);
      } else {
        if (currentUser.user.seen.includes(band)) {
          currentUser.user.seen = currentUser.user.seen.filter((item) => item !== band)
        }
        currentUser.user.want.push(band);
      }

      let data = ({_id:currentUser.user._id, username: currentUser.user.username, bio: currentUser.user.bio, want: currentUser.user.want, seen: currentUser.user.seen})
      let status
      await UserService.updateCurrentUser(data).then(data => {
         status = checkStatus(band, currentUser)
        });
        const update = ({username:currentUser.user.username, userId:currentUser.user._id, bandStatus:"wants to see", bandname:band});
        FeedService.addToFeed(update);
        return status;
    };

export const handleSeen = async (band, currentUser) => {

      if (!currentUser.user.seen) {
        currentUser.user.seen = [];
      }
      if (!currentUser.user.want) {
        currentUser.user.want = [];
      }
      if (currentUser.user.seen.includes(band)) {
        currentUser.user.seen = currentUser.user.seen.filter((item) => item !== band);
      } else {
        if (currentUser.user.want.includes(band)) {
          currentUser.user.want = currentUser.user.want.filter((item) => item !== band);
        }
        currentUser.user.seen.push(band);
      }
      let data = ({_id:currentUser.user._id, username: currentUser.user.username, bio: currentUser.user.bio, fileId: currentUser.user.fileId, want: currentUser.user.want, seen: currentUser.user.seen})
      let status
      await UserService.updateCurrentUser(data).then(data => {
          status = checkStatus(band, currentUser)
        });
        const update = ({username:currentUser.user.username, userId:currentUser.user._id, bandStatus:"has seen", bandname:band});
        FeedService.addToFeed(update);
        return status;
    };