function validateForm() {
    const nameValue = document.getElementById("tagging__input__name").value;

    if (nameValue.length > 10) {
        alert("Der Name darf nicht länger als 10 Zeichen sein.")
        return false;
    }

    const hashtagValue = document.getElementById("tagging__input__hashtag").value;

    if (!hashtagValue.startsWith("#")) {
        alert("Der Hashtag muss mit einer Raute (#) beginnen.");
        return false;
    }

    if (hashtagValue.length > 11) {
        alert("Der Hashtag selbst, darf nicht länger als 10 Zeichen sein.");
        return false;
    }	

    return true;
}