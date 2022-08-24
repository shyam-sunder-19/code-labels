var UserProfile = (function() {
    var github_profile = "";
  
    var getName = function() {
      return github_profile;    // Or pull this from cookie/localStorage
    };
  
    var setName = function(name) {
      github_profile = name;     
      // Also set this in cookie/localStorage
    };
  
    return {
      getName: getName,
      setName: setName
    }
  
})();
  
export default UserProfile;