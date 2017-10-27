
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

    var helpText = `
    <h2>Help</h2>
    <h3>Keybindings</h3>
    <dl>
        <dt><kbd>Left</kbd> / <kbd>Right</kbd></dt><dd>Go to previous / next slide</dd>
        <dt><kbd>CTRL+M</kbd></dt><dd>Switch between text and presentation modes</dd>
    </dl>
    `;

    initializeIDsStyles();
    setHash();
    initializeKeybindings();

}
