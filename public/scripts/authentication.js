const Authentication = (function() {
    // This stores the current signed-in user
    let user = null;

    // This function gets the signed-in user
    const getUser = function() {
        return user;
    }

    // This function sends a sign-in request to the server
    // * `username`  - The username for the sign-in
    // * `password`  - The password of the user
    // * `onSuccess` - This is a callback function to be called when the
    //                 request is successful in this form `onSuccess()`
    // * `onError`   - This is a callback function to be called when the
    //                 request fails in this form `onError(error)`
    const signin = function(username, password, onSuccess, onError) {

        // A. Preparing the user data
        const json = JSON.stringify({ username, password });
        console.log(json);
 
        // B. Sending the AJAX request to the server
        fetch("/signin", {   
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: json
            })
            .then((res) => res.json())
            .then((json) => {
                // J. Handling the success reponse from the server 
                if (json.status == "error") {
                    // F. Processing any error returned by the server
                    if (onError) onError(json.error);
                } else {
                    // J. Handling the success response from the server
                    if (onSuccess) {
                        user = json.user;
                        console.log(json.user);
                        onSuccess();
                    }
                }
            })
    };

    // This function sends a validate request to the server
    // * `onSuccess` - This is a callback function to be called when the
    //                 request is successful in this form `onSuccess()`
    // * `onError`   - This is a callback function to be called when the
    //                 request fails in this form `onError(error)`
    const validate = function(onSuccess, onError) {

        // A. Sending the AJAX request to the server
        fetch("/validate")
            .then((res) => res.json())
            .then((json) => { // E. Handling the success response from the server
               if(json.status == "success") {
                    user = json.user; // Set the user information 
                    if (onSuccess) onSuccess();
               }
               else if (onError) onError(json.error); // C. Processing any error returned by the server
            })
            .catch((err) => { 
                console.log(err);
                if (onError) onError(err);
            });

        // Delete when appropriate
        // if (onError) onError("This function is not vet implemented.");    
    };

    // This function sends a sign-out request to the server
    // * `onSuccess` - This is a callback function to be called when the
    //                 request is successful in this form `onSuccess()`
    // * `onError`   - This is a callback function to be called when the
    //                 request fails in this form `onError(error)`
    const signout = function(onSuccess, onError) {

        fetch("/signout")
        .then((res) => res.json())
        .then((json) => { 
            user = null;
            if (onSuccess) onSuccess();
        })
        .catch((err) => {
            console.log(err);
            if (onError) onError(err);
        });

        // Delete when appropriate
        // if (onError) onError("This function is not yet implemented.");
    };

    return { getUser, signin, validate, signout };
})();