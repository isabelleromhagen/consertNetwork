export const checkStatus = (band, currentUser) => {

        if(!currentUser ) {
        console.log('no user, set to none');
            return ["none", "Not listed"];
         
        } else {
            if(currentUser.user.want.includes(band)) {
                console.log('set to want');
                return ["want", "Want to see"];
            }
            else if (currentUser.user.seen.includes(band)) {

                console.log('set to seen');
                return ["seen", "Seen"];
            } else {
                console.log('set to none');
                return ["none", "Not listed"];
            }
        }
        
    }