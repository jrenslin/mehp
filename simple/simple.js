
function simple () {

    function toggleStyleDisplay (element) {
        if (element.classList.contains("toggledVisible")) element.classList.remove("toggledVisible");
        else element.classList.add("toggledVisible");
    }

    function navigateHash(next) {
        var no = window.location.hash;
		    no = parseInt(no.substr(1));

        switch (next) {
        case false:
            if (no > 0) {
                console.log("Opening slide " + no);
                if (typeof fullscreenWindow != "undefined") fullscreenWindow.location.hash = "#" + (no - 1);
                window.location.hash = "#" + (no - 1);
            } else {
                console.log("This is the first slide. No navigating back.");
            }
            break;

        case true:
            if (no == allSections.length - 1) {
                console.log("Reached last slide. No navigating further from here.");
            }
            else {
                console.log("Opening slide " + no);
                if (typeof fullscreenWindow != "undefined") fullscreenWindow.location.hash = "#" + (no + 1);
                window.location.hash = "#" + (no + 1);
            }
            break;
        }
    }

    function initializeIDsStyles() {

        // Add help to body
        var body = document.getElementsByTagName("body")[0];
        var helpDiv = document.createElement("div");
        helpDiv.id = "help";
        helpDiv.innerHTML = helpText;
        body.appendChild(helpDiv);


        var prevNext = [["prev", function (e) {
            navigateHash(false);
        }], ["next", function (e) {
            navigateHash(true);
        }]];
        for (var i = 0, max = 2; i < max; i++) {

            var element = document.createElement("div");
            element.id = prevNext[i][0];
            element.addEventListener('click', prevNext[i][1]);
            body.appendChild(element);

        }

        for (var i = 0, max = allSections.length; i < max; i++) {
            allSections[i].id = i.toString();
        }

        var allAsides   = document.getElementsByTagName("aside");

        for (var i = 0, max = allAsides.length; i < max; i++) {
            var parent = allAsides[i].parentElement;
            parent.classList.add("containsAside");
            asideParents.push(parent);
        }

    }

    /* ------------
   Bind keys for moving back and forward
   ------------ */

    function initializeKeybindings () {

        if (document.getElementsByTagName('body')[0] != null) {
            document.getElementsByTagName('body')[0].addEventListener('keydown', function (e) {

                // Get number of the current page from anchor
                var no = window.location.hash;
		            no = parseInt(no.substr(1));

                switch (e.keyCode) {
                case  37:
                case  38:
                    navigateHash(false);
                    break;

                case 39:
                case 40:
                    navigateHash(true);
                    break;
                }
            });

            // Bind switcher between text and presentation
            document.getElementsByTagName('body')[0].addEventListener('keydown', function (e) {

                if (!e.ctrlKey) {
                    return;
                }
                switch (e.keyCode) {
                case  77:
                    if (document.getElementsByTagName('body')[0].className == "presentation")
                        document.getElementsByTagName('body')[0].className = "text";
                    else
                        document.getElementsByTagName('body')[0].className = "presentation";
                }

            });


            // Bind opening help
            document.getElementsByTagName('body')[0].addEventListener('keydown', function (e) {

                switch (e.keyCode) {
                case 112:
                    e.preventDefault();
                    toggleStyleDisplay(document.getElementById('help'));
                    break;
                case 113:
                    e.preventDefault();
                    document.getElementsByTagName('body')[0].classList.add("speakerView");
                    fullscreenWindow = window.open(window.location,'windowName','resizable=1,scrollbars=0,fullscreen=1,height=200,width=300, left=300, toolbar=0, menubar=1,status=0');

                    fullscreenWindow.addEventListener('keydown', function (e) {
                        if (e.keyCode == 27) {
                            document.getElementsByTagName('body')[0].classList.remove("speakerView");
                            fullscreenWindow.close();
                            console.log("Closing speaker view.");
                        }
                    });

                    console.log("Opened speaker view.");

                    break;
                }

            });

            for (var i = 0, max = asideParents.length; i < max; i++) {
                asideParents[i].addEventListener('click', function (e) {
                    var children = e.srcElement.children;
                    for (var j = 0, max = children.length; j < max; j++) {
                        if (children[j].tagName == "ASIDE") {
                            toggleStyleDisplay(children[j]);
                            break;
                        }
                    }
                    e.stopPropagation();
                });
            }

        }
    }

    /* ------------
       Enforce setting hash
       Open first slide if none is set.
       ------------ */

    function setHash() {
        if(!window.location.hash) {
		        window.location.hash = "0";
        }
    }

    /* ------------
       Run functions and set generally accessible vars
       ------------ */

    var allSections  = document.getElementsByTagName("section");
    var asideParents = [];
    var fullscreenWindow;

    var helpText = `
    <h2>Help</h2>
    <h3>Keybindings</h3>
    <dl>
        <dt><kbd>Left</kbd> / <kbd>Right</kbd></dt><dd>Go to previous / next slide</dd>
        <dt><kbd>CTRL+M</kbd></dt><dd>Switch between text and presentation modes</dd>
        <dt><kbd>F1</kbd></dt><dd>Show this help page</dd>
        <dt><kbd>Click on section</kbd></dt><dd>Open notes or text of this section.</dd>
    </dl>
    `;

    initializeIDsStyles();
    setHash();
    initializeKeybindings();

}
