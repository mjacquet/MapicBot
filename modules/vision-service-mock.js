"use strict";

exports.classify = imageURL => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("X-WING");
    }, 2000);
});
