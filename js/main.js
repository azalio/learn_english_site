function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to guess the
    // original format, but be aware the using "image/jpg" will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

ion.sound({
    sounds: [
        {name: "a"},
        {name: "b"},
        {name: "c"},
        {name: "d"},
        {name: "e"},
        {name: "f"},
        {name: "g"},
        {name: "h"},
        {name: "i"},
        {name: "j"},
        {name: "k"},
        {name: "l"},
        {name: "m"},
        {name: "n"},
        {name: "o"},
        {name: "p"},
        {name: "q"},
        {name: "r"},
        {name: "s"},
        {name: "t"},
        {name: "u"},
        {name: "v"},
        {name: "w"},
        {name: "x"},
        {name: "y"},
        {name: "z"},
        {name: "zero"},
        {name: "one"},
        {name: "two"},
        {name: "three"},
        {name: "four"},
        {name: "five"},
        {name: "six"},
        {name: "seven"},
        {name: "eight"},
        {name: "nine"},
    ],
    path: "media/sounds/",
    preload: true,
    volume: 1.0,
    multiplay: true
});

var playSound = function (message, index, interval) {
    if (index < message.length) {
        char = message[index];
        $.ionSound.play(char);
        console.log(char);
        index++;
        setTimeout(function () {
            playSound(message, index, interval);
        }, interval);
    }
};

var checkAns = function (object, message) {
    message = message.trim();
    if (typeof object == 'object') {
        var ans = object.html().trim();
        if (ans == message) {
            object.addClass('list-group-item-success');
            return true;
        }
        else {
            object.hide();
            return false;
        }
    }
    else if (typeof object == 'string') {


        var ans = object;
        console.log(typeof ans);
        if (ans == message) {
            return true;
        }
        else {
            console.log(object.length);
            console.log(message.length);
            return false;
        }
    }
};

var getArrayOfWords = function () {
    return $.get("media/text/words.txt");
};

$(document).ready(function () {
//    alert(message);

    // $('#main-image').on("load", function () {
    //     var image = $(this)[0];
    //     data = getBase64Image(image);
    //     console.log(data)
    // });
    // class="img-circle img-responsive center-block vertical-center hint" id="right-image"
    var uuid = guid();
    //  http://getimagedata.azalio.net/image/12349397-d4af-49fb-b6d2-6df7a6ccd8ee/200/200/
    var url = "http://getimagedata.azalio.net/image/" + uuid + "/140/140/";
    var $img = $("<img />", {"src": url, "class": "img-circle img-responsive center-block vertical-center sound"});
    $('#main-image').html($img);

    var arrAns = Array();
    var message = "";
    getArrayOfWords().done(function (data) {
            var arrWords = data.split('\n');
            arrAns = shuffle(arrWords).slice(0, 4);

            message = shuffle(arrAns)[0].trim();
            arrAns = shuffle(arrAns);
            $('.answer').each(function (index) {
                $(this).text(arrAns[index])
            })

        }
    );


    $(".sound").on("click", function () {

        playSound(message, 0, 500);

    });

    $('.answer').on("click", function () {
        var ans = checkAns($(this), message);
        if (ans) {
            console.log('Ok');
            setTimeout(function () {
                location.reload();
            }, 1000);

        }
    });

    $('#ans-check').on("click", function () {
        var input = $('input').val().toLowerCase();
        var ans = checkAns(input, message);
        if (ans) {
            $('#ans-check').addClass('btn-success');
            setTimeout(function () {
                location.reload();
            }, 1000);
        }
    });

    $('.hint').on("click", function () {
        location.reload();
    });

});
