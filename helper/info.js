var userinfo;
// Make sure your argument name doesn't conflict with variables set above
exports.setUserInfo = function(uinfo) {
    userinfo = uinfo;
}; 

// You're returning an object with property values set above
exports.getUserInfo = function () {
    return {
        userinfo: userinfo         
    };
};

 